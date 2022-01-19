import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {ConfigFile} from '../service/ConfigFile';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import WebService from '../service/WebService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Counter from 'react-native-counters';

export default class ProductListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      // StoreID: '605a0d38c98f1137023019dc',
      StoreID: this.props.route.params.StoreId,
      CatId: '',
      loading: false,
      offset: 0,
      loadmore: false,
      nodata: false,
      cartegorydata: [],
      cartData: [],
      localcart: [],
      clickdata: [],
      count: 0,
      totalPrice: 0,
      acceptsCOD: this.props.route.params.acceptsCOD,
      requireSlot: this.props.route.params.requireSlot,
      AddTocartLoader: false,
    };
  }

  async componentDidMount() {
    this.importData();
    // this.localtocart()
    this.setState({data: []});
    this.setState({loading: true});

    this.fetchCats('didcall');

    this.bs = React.createRef();
    this.fall = new Animated.Value(1);

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.importData();
      this.setState({data: []});
      this.setState({loading: true});
      this.fetchCats('didcall');

      //Put your Data loading function here instead of my this.loadData()
    });
  }

  cancelPopup() {
    // console.log("dsssssssssssssssssss")
    // this.bs.current.snapTo(1)
  }

  renderInner = () => {
    ////console.log(this.state.clickdata.name)
    return (
      <View style={styles.panel}>
        <View>
          <Text style={styles.panelTitle}>
            Customise {this.state.clickdata.name}
          </Text>
        </View>
        <FlatList
          data={this.state.clickdata.variants}
          ItemSeparatorComponent={this.ItemSeparator}
          renderItem={this.product_variants}
          keyExtractor={item => item.id.toString()}
        />
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => this.bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  /**************************Start Here Search Product*******************************/
  SearchProduct = seatchText => {
    console.log('seatchText........', seatchText.length);
    this.setState({refreshing: true});
    if (seatchText.length > 0) {
      console.log('StoreID............', this.state.StoreID);
      WebService.GetDataJSon(
        `business-details/${this.state.StoreID}/products?searchText=${seatchText}&limit=10&skip=0`,
      ).then(response => {
        if (response.length > 0) {
          console.log(JSON.stringify(response));
          this.setState({data: response, refreshing: false});
        } else {
          this.setState({data: [], refreshing: false, noserachItem: false});
        }
      });
    } else {
      this.getproductlist(this.state.StoreID, this.state.CatId);
    }
  };
  /**************************End  Here Search Product*******************************/

  cutAdd = async (product, count) => {
    console.log('sas.....', product);
    try {
      let data_obj;
      var i;

      if (this.state.cartData.length == 0) {
        try {
          if (count == 0) {
            await AsyncStorage.removeItem(product.id);

            var ddddd = this.state.localcart;

            console.log(
              '0000=============55==============00000',
              JSON.stringify(ddddd),
            );
             this.importData()
          } else {
            console.log('=========100======');
            var sellingPrice = parseInt(product.variants[0].sellingPrice);

            data_obj = {
              name: product.name,
              variants: product.variants[0].id,
              id: product.id,
              count: count,
              price: sellingPrice,
            };
            await AsyncStorage.setItem(product.id, JSON.stringify(data_obj));
             this.importData()
          }

          ////console.log("=======2========");
        } catch (e) {
          console.log(e);
        }
      } else {
        for (i = 0; i < this.state.cartData.length; i++) {
          if (this.state.localcart[0].hasOwnProperty(product.id)) {
            console.log('=========102======');
            if (count == 0) {
              console.log('=========102.1======');

              await AsyncStorage.removeItem(product.id);
              //  this.importData()

              this.setState({
                totalPrice: 0,
                count: 0,
                // AddTocartLoader: false
              });

              //var ddddd = this.state.localcart;
              // console.log("0000=============55==============00000", JSON.stringify(ddddd))
              //
            } else {
              console.log('=========102.2======');
              var sellingPrice = parseInt(product.variants[0].sellingPrice);

              data_obj = {
                name: product.name,
                variants: product.variants[0].id,
                id: product.id,
                count: count,
                price: sellingPrice,
              };

              await AsyncStorage.setItem(product.id, JSON.stringify(data_obj));
              // this.importData()
            }
          } else {
            var sellingPrice = parseInt(product.variants[0].sellingPrice);

            data_obj = {
              name: product.name,
              variants: product.variants[0].id,
              id: product.id,
              count: count,
              price: sellingPrice,
            };

            await AsyncStorage.setItem(product.id, JSON.stringify(data_obj));
            // this.importData()
          }
        }
        if (this.importData()) {
          this.setState({AddTocartLoader: false});
        }
      }

      this.setState(state => ({
        cartData: [...state.cartData, data_obj],
      }));
    } catch (e) {
      console.log(e);
    }
  };

  subCutAdd = async (product, data, count) => {
    this.setState({loadmore: true});
    try {
      let data_obj;
      var i;

      if (this.state.cartData.length == 0) {
        try {
          let pid = data.id;

          if (Object.keys(this.state.localcart[0]).length == 0) {
            console.log('====91======');

            var veri_id = product.item.id;

            data_obj = {
              name: data.name,
              variants: {[veri_id]: count},
              id: data.id,
              priduce_v: [
                {
                  id: veri_id,
                  price: product.item.sellingPrice,
                  count: count,
                },
              ],
            };

            // console.log("=======11========",data_obj);

            await AsyncStorage.setItem(data.id, JSON.stringify(data_obj));
            //this.importData()
            // }
          } else {
            if (this.state.localcart[0].hasOwnProperty(data.id)) {
              var userData = JSON.parse(this.state.localcart[0][pid]);
              if (userData.variants.hasOwnProperty(product.item.id)) {
                var userData = JSON.parse(this.state.localcart[0][pid]);
                console.log('====92======');
                var veri_id = product.item.id;
                var v_obj = userData.variants;
                v_obj[[veri_id]] = count;
                let arrr = userData.priduce_v;
                var indexx = arrr.findIndex(obj => obj.id === veri_id);
                //arrr.splice(0)
                arrr[indexx].count = count;

                //console.log("====93======"+JSON.stringify(obj)+"++++++++++++",JSON.stringify(arrr))

                if (count == 0) {
                  console.log('=================92.1');

                  if (arrr.length == 1) {
                    await AsyncStorage.removeItem(pid);
                    // console.log("SAASAS","DSAS");
                    // this.importData()
                  } else {
                    console.log('=================92.5', JSON.stringify(arrr));
                    arrr.splice(indexx, 1);

                    delete v_obj[veri_id];

                    data_obj = {
                      name: data.name,
                      variants: v_obj,
                      id: data.id,
                      priduce_v: arrr,
                    };

                    // delete test.blue;
                    await AsyncStorage.setItem(
                      data.id,
                      JSON.stringify(data_obj),
                    );
                    // this.importData()
                  }
                } else {
                  data_obj = {
                    name: data.name,
                    variants: v_obj,
                    id: data.id,
                    priduce_v: arrr,
                  };

                  await AsyncStorage.setItem(data.id, JSON.stringify(data_obj));
                  // this.importData()
                }
              } else {
                var veri_id = product.item.id;

                console.log('====93======');
                // console.log("=======123========",JSON.stringify(userData.priduce_v));

                var v_obj = userData.variants;
                v_obj[[veri_id]] = count;

                let arrr = userData.priduce_v;
                var objj = {
                  id: veri_id,
                  price: product.item.sellingPrice,
                  count: count,
                };
                arrr.push(objj);

                //  console.log("====93======",JSON.stringify(arrr))

                data_obj = {
                  name: data.name,
                  variants: v_obj,
                  id: data.id,
                  priduce_v: arrr,
                };

                //  console.log("=======13========",data_obj);

                await AsyncStorage.setItem(data.id, JSON.stringify(data_obj));
                // console.log("=========02=======",data_obj)
                //  this.importData()
              }
            } else {
              //   console.log("======40====2")
              //console.log("======96====")
              var veri_id = product.item.id;

              /// var v_obj=userData.variants;
              console.log('====94======');

              data_obj = {
                name: data.name,
                variants: {[veri_id]: count},
                id: data.id,
                priduce_v: [
                  {
                    id: veri_id,
                    price: product.item.sellingPrice,
                    count: count,
                  },
                ],
              };

              await AsyncStorage.setItem(data.id, JSON.stringify(data_obj));
              // this.importData()
            }
          }

          this.importData();
        } catch (e) {
          console.log(e);
        }
      } else {
        let pid = data.id;
        for (i = 0; i < this.state.cartData.length; i++) {
          if (this.state.localcart[0].hasOwnProperty(pid)) {
            //  console.log("======71====")

            var userData = JSON.parse(this.state.localcart[0][pid]);
            //console.log("====8223===",""+userData)
            if (userData.variants.hasOwnProperty(product.item.id)) {
              console.log('====95===');

              var veri_id = product.item.id;
              var v_obj = userData.variants;
              v_obj[[veri_id]] = count;
              let arrr = userData.priduce_v;

              var indexx = arrr.findIndex(obj => obj.id === veri_id);
              arrr[indexx].count = count;
              if (count == 0) {
                console.log('============95.1=======' + arrr.length);
                if (arrr.length == 1) {
                  await AsyncStorage.removeItem(pid);
                  // console.log("SAASAS","DSAS");
                } else {
                  console.log('============95.3=======' + JSON.stringify(arrr));

                  //  delete arrr[indexx];
                  // arrr = arrr.filter(item => item.id == veri_id)
                  // array.splice(index, 1);
                  arrr.splice(indexx, 1);
                  console.log(
                    veri_id + '============95.4=======' + JSON.stringify(arrr),
                  );

                  console.log('AAAA', v_obj);

                  delete v_obj[veri_id];

                  data_obj = {
                    name: data.name,
                    variants: v_obj,
                    id: data.id,
                    priduce_v: arrr,
                  };

                  // delete test.blue;
                  await AsyncStorage.setItem(data.id, JSON.stringify(data_obj));
                  //console.log("====823199===",""+JSON.stringify(userData))
                }
              } else {
                console.log('============95.2=======');
                data_obj = {
                  name: data.name,
                  variants: v_obj,
                  id: data.id,
                  priduce_v: arrr,
                };

                // console.log("====823199===",""+JSON.stringify(userData))
                // console.log("====8231===",""+JSON.stringify(data_obj))
                await AsyncStorage.setItem(data.id, JSON.stringify(data_obj));
              }
            } else {
              //   console.log("====8111===",userData.sellingPrice)

              var veri_id = product.item.id;

              var v_obj = userData.variants;

              console.log('====96======');

              v_obj[[veri_id]] = count;

              let arrr = userData.priduce_v;
              var objj = {
                id: veri_id,
                price: product.item.sellingPrice,
                count: count,
              };
              arrr.push(objj);

              data_obj = {
                name: data.name,
                variants: v_obj,
                id: data.id,
                priduce_v: arrr,
              };
              // console.log("=======16========",data_obj);

              await AsyncStorage.setItem(data.id, JSON.stringify(data_obj));
            }
          } else {
            var veri_id = product.item.id;

            console.log('====97======');
            var veri_id = product.item.id;
            data_obj = {
              name: data.name,
              variants: {[veri_id]: count},
              id: data.id,
              priduce_v: [
                {
                  id: veri_id,
                  price: product.item.sellingPrice,
                  count: count,
                },
              ],
            };

            await AsyncStorage.setItem(data.id, JSON.stringify(data_obj));
          }
        }
        this.importData();
      }

      this.setState(state => ({
        cartData: [...state.cartData, data_obj],
      }));
    } catch (e) {
      console.log(e);
    }
  };

  fetchCats = callType => {
    // this.importData();
    // if ((!this.state.nodata) && (!this.state.refreshing)) {
    // console.log(callType);
    this.setState({loading: true});

    WebService.GetData(`business-details/${this.state.StoreID}/categories`)
      // fetch('http://api.beta.diskounto.com/search/business?category='+this.state.category+'&lat=25.5940947&lng=85.1375645&formattedAddress=Patna%2C%20Bihar%2C%20India&city=Patna&state=BR&limit=20&skip='+this.state.offset)
      .then(CatRes => CatRes.json())
      .then(CaTResJson => {
        if (CaTResJson.length > 0) {
          this.setState({loading: false});
          if (callType == 'pullRefresh') {
            this.setState({cartegorydata: CaTResJson});
            this.getproductlist(this.state.StoreID, this.state.CatId);
          } else {
            this.setState({cartegorydata: CaTResJson, CatId: CaTResJson[0].id});
            this.getproductlist(this.state.StoreID, this.state.CatId);
          }
        } else {
          this.setState({cartegorydata: []});
        }
      })
      .catch(e => console.log(e));

    //}
  };
  getproductlist = (StoreID, CatId) => {
    this.setState({refreshing: true});
    this.setState({CatId: CatId});
    WebService.GetData(
      `business-details/${StoreID}/categories/${CatId}?listProducts=true`,
    )
      .then(res => res.json())
      .then(resJson => {
        if (resJson.length > 0) {
          console.log('Numbeproduct.... ', resJson[0].products.length);

          this.setState({data: resJson[0].products});

          this.setState({refreshing: false, nodata: true});
        } else {
          this.setState({loadmore: false, refreshing: false});
        }
      })
      .catch(e => console.log(e));
  };

  removeDbync = async () => {
    //  const keys = await AsyncStorage.getAllKeys()
    let keys = [];
    try {
      const keys = await AsyncStorage.getAllKeys();

      console.log('sadsdsdsds-================', keys);

      const itemsArray = await AsyncStorage.multiGet(keys);

      itemsArray.map(item => {
        if (
          (`${item[0]}` == 'user' && `${item[0]}` == 'userToken') ||
          `${item[0]}` == 'SelectedStoreID' ||
          `${item[0]}` == 'RewordCart'
        ) {
          //console.log("llllllllllllllllllllllllllllllll")
        }
      });
    } catch (e) {
      // read key error
    }
    //// await AsyncStorage.removeItem('totalPrice')
    console.log();
  };

  importData = async () => {
    // this.setState({loadmore: true});
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('sadsdsdsds-================', keys);
      const itemsArray = await AsyncStorage.multiGet(keys);
      let object = {};
      let object2 = {};
      var p_count = 0;
      var p_price = 0;
      //var p_price =parseInt(

      console.log('itemsArray.... ', itemsArray);

      itemsArray.map(item => {
        if (
          `${item[0]}` == 'user' ||
          `${item[0]}` == 'userToken' ||
          `${item[0]}` == 'SelectedStoreID' ||
          `${item[0]}` == 'RewordCart' ||
          `${item[0]}` == 'Coordinate' ||
          `${item[0]}` == 'address'
        ) {
          // if (itemsArray.length == 3) {
          //   this.setState({ count: 0 });
          // }
        } else {
          if (`${item[0]}` == 'count') {
          } else if (`${item[0]}` == 'totalPrice') {
          } else {
            object[`${item[0]}`] = item[1];
            console.log(
              '===================1===============' + item[0],
              item[1],
            );

            var datta = JSON.parse(item[1]);

            if (datta == null) {
              console.log('===================1===============');
            } else {
              console.log('===================2===============');
              //}

              console.log('adadasdadasdas..........', datta);
              if (datta.hasOwnProperty('count')) {
                console.log('has count==== True');

                p_price =
                  parseInt(p_price) +
                  parseInt(JSON.parse(item[1]).price) *
                    parseInt(JSON.parse(item[1]).count);
                p_count =
                  parseInt(p_count) + parseInt(JSON.parse(item[1]).count);

                console.log('adadasdadasdas8888..........' + p_count, p_price);
                this.setState({
                  totalPrice: p_price,
                  count: p_count,
                });
              } else {
                console.log('has count==== false');
                datta.priduce_v.map(items => {
                  console.log('adadasdadasdas8888..........', items);
                  p_count = parseInt(p_count) + parseInt(items.count);
                  p_price =
                    parseInt(p_price) +
                    parseInt(items.price) * parseInt(items.count);

                  console.log(
                    'adadasdadasdas8888..........' + p_count,
                    p_price,
                  );
                  this.setState({
                    totalPrice: p_price,
                    count: p_count,
                  });
                });
              }
            }
          }
        }
      });

      var count = Object.keys(object).length;
      //  console.log('Object length===', count);
      if (count == 0) {
        this.setState(state => ({
          localcart: [object],
          count: 0,
          totalPrice: 0,
        }));
      } else {
        this.setState(state => ({
          localcart: [object],
        }));
      }

      return true;
    } catch (error) {
      console.error(error);
    }
  };

  variant_popup = async product => {
    // console.log("--------1---------------",product)

    this.setState({clickdata: product});

    this.bs.current.snapTo(0);
  };

  product_variant = data => {
    // console.log("======1=========",data.variants.length)

    if (data.variants.length == 1) {
      return (
        <View style={styles.productQuntity2}>
          {/* <Text style={styles.QunityText}>1L</Text> */}
        </View>
      );
    } else {
      return (
        <View style={styles.productQuntity1}>
          <Text>Customise</Text>
        </View>
      );
    }
  };

  checkCart = data => {
    try {
      let pid = data.id;

      //console.log("aaaaaaaaaaaaaaaaa",data)

      if (this.state.localcart[0].hasOwnProperty(pid)) {
        const userData = JSON.parse(this.state.localcart[0][pid]);

        if (userData.hasOwnProperty('count')) {
          return (
            <View>
              <Counter
                buttonStyle={{
                  borderColor: globalcolor.PrimaryColor,
                  borderWidth: 1,
                  fontSize: 20,
                }}
                buttonTextStyle={{
                  color: globalcolor.PrimaryColor,
                }}
                countTextStyle={{
                  color: globalcolor.PrimaryColor,
                }}
                max={data.maxOrderQuantity}
                start={userData.count}
                onChange={(len, type) => {
                  console.log(len, type);
                  this.cutAdd(data, len);
                }}
              />
            </View>
          );
        } else {
          if (data.variants.length == 1) {
            // console.log("ssdsdsds11111")
            return (
              <View style={styles.productAddToCart}>
                <View style={styles.ProductCartItem}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: globalcolor.PrimaryColor,
                    }}>
                    Add{' '}
                  </Text>
                </View>
                <View style={styles.AddIcon}>
                  <FontAwesome
                    name="plus"
                    color={globalcolor.PrimaryColor}
                    size={20}
                  />
                </View>
              </View>
            );
          } else {
            // console.log("ssdsdsds33333333")
            return (
              <TouchableOpacity onPress={() => this.variant_popup(data)}>
                <View style={styles.productAddToCart}>
                  <View style={styles.ProductCartItem}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: globalcolor.PrimaryColor,
                      }}>
                      Add{' '}
                    </Text>
                  </View>
                  <View style={styles.AddIcon}>
                    <FontAwesome
                      name="plus"
                      color={globalcolor.PrimaryColor}
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
          //   console.log("44444444444444444")
        }
      } else {
        // console.log("ssdsdsds44444444444..."+data.variants.length,data)

        if (data.variants.length == 1) {
          // console.log("ssdsdsds11111",data.variants[0].active)

          if (data.variants[0].active) {
            return (
              <TouchableOpacity onPress={() => this.cutAdd(data, 1)}>
                <View style={styles.productAddToCart}>
                  <View style={styles.ProductCartItem}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: globalcolor.PrimaryColor,
                      }}>
                      Add
                    </Text>
                  </View>
                  <View style={styles.AddIcon}>
                    <FontAwesome
                      name="plus"
                      color={globalcolor.PrimaryColor}
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          } else {
            return (
              <View style={{width: '100%'}}>
                <View style={styles.productAddToCartDesible}>
                  <View style={styles.ProductCartItemDesible}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: globalcolor.desibleColour,
                      }}>
                      Add{' '}
                    </Text>
                  </View>
                  <View style={styles.AddIcon}>
                    <FontAwesome
                      name="plus"
                      color={globalcolor.desibleColour}
                      size={20}
                    />
                  </View>
                </View>
                <Text style={{color: '#FF0000', fontSize: 10, marginLeft: 20}}>
                  Out of Stock
                </Text>
              </View>
            );
          }
        } else {
          ///console.log("ssdsdsds33333333")

          var avalibility = data;
          // console.log("ssdsdsds33333333",avalibility);
          return (
            <TouchableOpacity
              onPress={() => this.variant_popup(data)}
              style={{marginLeft: 10}}>
              <View style={styles.productAddToCart}>
                <View style={styles.ProductCartItem_variant}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: globalcolor.PrimaryColor,
                    }}>
                    Add{' '}
                  </Text>
                </View>
                <View style={styles.AddIcon}>
                  <FontAwesome
                    name="plus"
                    color={globalcolor.PrimaryColor}
                    size={20}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      }
    } catch (e) {
      //     // saving error
    }
  };

  checkCartPopup = (data, product) => {
    try {
      // console.log("kkkkkkkkkkkkkkkkkk")
      let pid = product.id;
      //  console.log("================1================",data.item.id)
      //  console.log(this.state.localcart[0][pid])

      // console.log(product)
      if (this.state.localcart[0].hasOwnProperty(pid)) {
        var userData = JSON.parse(this.state.localcart[0][pid]);
        //  console.log("==============44==================",userData)

        if (userData.variants.hasOwnProperty(data.item.id)) {
          //   console.log("================ok================",userData.variants[data.item.id])

          return (
            <View>
              <Counter
                buttonStyle={{
                  borderColor: globalcolor.PrimaryColor,
                  borderWidth: 1,
                }}
                buttonTextStyle={{
                  color: globalcolor.PrimaryColor,
                  fontSize: 20,
                }}
                countTextStyle={{
                  color: globalcolor.PrimaryColor,
                  fontSize: 20,
                }}
                max={data.maxOrderQuantity}
                start={userData.variants[data.item.id]}
                onChange={(len, type) => {
                  console.log(len, type);
                  this.subCutAdd(data, product, len);

                  // if (type=='+') {
                  //   console.log("111111111111")
                  //   this.subCutAdd(data,product)
                  // }
                  // else{
                  //   console.log("2222222")
                  //   {this.subCutSub(data,product)}
                  // }
                }}
              />
            </View>
          );
        } else {
          return (
            <TouchableOpacity
              onPress={() => {
                this.subCutAdd(data, product, 1);
              }}>
              <View style={styles.productAddToCart}>
                <View style={styles.ProductCartItem}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: globalcolor.PrimaryColor,
                    }}>
                    Add{' '}
                  </Text>
                </View>
                <View style={styles.AddIcon}>
                  <FontAwesome
                    name="plus"
                    color={globalcolor.PrimaryColor}
                    size={20}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      } else {
        console.log('sorry....................', data.item.active);

        if (data.item.active) {
          return (
            <TouchableOpacity
              onPress={() => {
                this.subCutAdd(data, product, 1);
              }}>
              <View style={styles.productAddToCartVariatActive}>
                <View style={styles.ProductCartItem}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: globalcolor.PrimaryColor,
                    }}>
                    Add{' '}
                  </Text>
                </View>
                <View style={styles.AddIcon}>
                  <FontAwesome
                    name="plus"
                    color={globalcolor.PrimaryColor}
                    size={20}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        } else {
          return (
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <View style={styles.productAddToCartDesibleVariat}>
                <View style={styles.ProductCartItemDesible}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: globalcolor.desibleColour,
                    }}>
                    Add{' '}
                  </Text>
                </View>
                <View style={styles.AddIcon}>
                  <FontAwesome
                    name="plus"
                    color={globalcolor.desibleColour}
                    size={20}
                  />
                </View>
              </View>

              <Text style={{color: '#FF0000', fontSize: 10, marginLeft: 20}}>
                Out of Stock
              </Text>
            </View>
          );
        }

        //}
      }
    } catch (e) {
      //     // saving error
    }
  };

  renderItemComponent = data => {
    // console.log("===========================")
    // console.log(this.state.cartData)
    // console.log( this.state.cartData.length)
    //if(data.item.length>0){
    let imageUrl = '';
    if (data.item.photos.length > 0) {
      imageUrl = globalcolor.ImageBaseUrl + data.item.photos[0].path;
    } else {
      imageUrl =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==';
    }

    return (
      <View style={styles.ProductListrow}>
        <View style={styles.ProductlistFirstItem}>
          <Image
            source={{uri: imageUrl}} //Change your icon image here
            style={[styles.ProductImage]}
          />
        </View>
        <View style={styles.ListBody}>
          <Text style={globalstyle.ProductText}>{data.item.name}</Text>

          {data.item.variants.map((value, index) =>
            value.isDefault == true ? (
              <Text style={globalstyle.ProductPrice} key={index}>
                ₹
                <Text style={{fontWeight: 'bold', color: '#000000'}}>
                  {' '}
                  {value.sellingPrice}
                </Text>
              </Text>
            ) : null,
          )}
          <Text style={styles.Productdesc}>
            {data.item.description.substring(0, 65)}{' '}
          </Text>
          <View style={styles.ProductListrow}>
            {this.product_variant(data.item)}

            {this.checkCart(data.item)}
          </View>
        </View>
      </View>
    );
  };

  product_variants = item => {
    return (
      <View>
        <View style={styles.ProductListrow}>
          <View style={(styles.ListBody, {width: '100%'})}>
            <Text style={globalstyle.ProductText}>{item.item.name}</Text>
            <View
              style={
                (styles.ProductListrow, {width: '100%', flexDirection: 'row'})
              }>
              <View style={(styles.productQuntity, {flex: 1})}>
                <Text style={globalstyle.ProductPrice}>
                  ₹
                  <Text style={{fontWeight: 'bold', color: '#000000'}}>
                    {' '}
                    {item.item.sellingPrice}{' '}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#000000',
                      textDecorationLine: 'line-through',
                    }}>
                    ₹ {item.item.maximumPrice}{' '}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                {this.checkCartPopup(item, this.state.clickdata)}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  ItemSeparator = () => (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
      }}
    />
  );
  renderFooter = () => {
    return (
      <View style={styles.footer}>
        {this.state.loading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{margin: 15}}
          />
        ) : null}
      </View>
    );
  };
  ActivityIndicatorShow() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{
              marginTop: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        ) : null}
      </View>
    );
  }
  backToproduct = () => {
    console.log('Call me again.. productList');
  };
  handleRefresh = () => {
    this.importData();
    this.setState({refreshing: false}, () => {
      this.fetchCats('pullRefresh');
    }); // call fetchCats after setting the state
  };

  ImageDynamic = Data => {
    // console.log('ImageDynamic', Data.length);
    let ImgUrl = '';
    if (Data.length > 0) {
      ImgUrl = ConfigFile.ImageBaseUrl + Data[0].path;
      //globalcolor.ImageBaseUrl + value.photos[0].path
    } else {
      ImgUrl =
        'data:image/png;base64,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';
    }
    return (
      <Image
        source={{uri: ImgUrl}} //Change your icon image here
        style={styles.itemPhoto}
      />
    );
  };

  footerViewCart() {
    return this.state.count > 0 ? (
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={{textAlign: 'left', color: '#ffffff', marginLeft: 10}}>
            {this.state.count} Item | ₹ {this.state.totalPrice}
          </Text>
        </View>
        <View style={styles.footerItem2}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AddToCart', {
                StoreID: this.state.StoreID,
                acceptsCOD: this.state.acceptsCOD,
                requireSlot: this.state.requireSlot,
                totalPrice: this.state.totalPrice,
                count: this.state.count,
                // CallProdutList: this.backToproduct.bind(this),
              });
            }}>
            <Text
              style={{textAlign: 'right', color: '#ffffff', marginRight: 10}}>
              View Cart
              {/* <FontAwesome name="plus" color={globalcolor.Textcolor} size={20} style={{ marginLeft: 10 }} /> */}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  }

  render() {
    //this.bs = React.createRef();
    // this.fall = new Animated.Value(1);

    console.log('aaaaaaaaaaaaaaaaa', this.state.count);
    console.log('aaaaaaaaaaaaaaaaa', this.state.totalPrice);
    // let Localdata = JSON.parse(this.state.localcart);
    // console.log("aaaaaaaaaaaaaaaaa",this.state.localcart)
    // console.log("length==="+this.state.cartegorydata);

    // if (Localdata.hasOwnProperty('count')) {
    //   console.log('Count==', this.state.count);
    // } else {
    //   console.log('Count==', '0');
    // }

    if (this.state.cartegorydata.length > 1) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            zIndex: 2,
            marginTop: 40,
            marginLeft: 5,
            marginRight: 5,
          }}>
          <View style={[globalstyle.serachBar, globalstyle.BorderSearchbar]}>
            <View>
              <Image
                source={require('../assets/img/SearchIcon.png')} //Change your icon image here
                style={globalstyle.SearchIcon}
              />
            </View>
            <TextInput
              placeholder="Search Product"
              style={globalstyle.SearchBox}
              onChangeText={val => this.SearchProduct(val)}
            />
          </View>
          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {this.state.cartegorydata.map((value, index) => (
                <TouchableOpacity
                  style={styles.ProductListrow}
                  key={index}
                  onPress={() => {
                    this.getproductlist(this.state.StoreID, value.id);
                  }}>
                  <View
                    style={[
                      styles.item,
                      value.id == this.state.CatId
                        ? {borderColor: globalcolor.PrimaryColor}
                        : {borderColor: globalcolor.Separator},
                    ]}>
                    {this.ImageDynamic(value.photos)}
                    {/* <Image
                      source={{ uri: globalcolor.ImageBaseUrl + value.photos[0].path }}
                      style={styles.itemPhoto}
                    /> */}
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: globalstyle.Font,
                        fontSize: 11,
                      }}>
                      {value.name.substring(0, 10)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.ItemSeparator}
            renderItem={item => this.renderItemComponent(item)}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            //  onEndReached={this.fetchCats('endcall')}
            onEndReachedThreshold={0.5}
            style={[
              styles.FlatListStyle,
              this.state.count > 0 ? {marginBottom: 60} : {marginBottom: 0},
            ]}
          />
          {this.footerViewCart()}

          <BottomSheet
            ref={this.bs}
            snapPoints={[330, 0]}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
            initialSnap={1}
            callbackNode={this.fall}
            enabledGestureInteraction={true}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View style={globalstyle.ActivityContainer}>
          {this.ActivityIndicatorShow()}
          <Text style={globalstyle.ActivityIndicator}>
            Loading please wait....
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    //  backgroundColor: "#FFF5EA",
    // padding: 20,
    //  margin: 10,
  },
  footer: {
    width: '100%',
    height: 50,
    zIndex: 1,
    position: 'absolute',

    flex: 1,
    flexDirection: 'row',
    backgroundColor: globalcolor.PrimaryColor,
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  footerItem: {
    flex: 0.5,
    textAlign: 'left',
    color: '#ffffff',
  },
  footerItem2: {
    flex: 0.5,
    textAlign: 'right',
    color: '#ffffff',
  },
  item: {
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 10,
    // marginBottom:60
  },
  productAddToCartDesible: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '35%',
    height: 30,
    borderColor: globalcolor.desibleColour,
    marginLeft: 15,
  },
  productAddToCartDesibleVariat: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '55%',
    height: 30,
    borderColor: globalcolor.desibleColour,
    marginLeft: 15,
  },
  itemPhoto: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 1,
  },

  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    // marginTop: 5,
  },
  ProductlistFirstItem: {
    padding: 5,
    width: '25%',
  },
  ListBody: {
    padding: 5,
    marginLeft: 10,
    width: '80%',
  },
  ListSecondIcon: {
    width: '15%',
  },
  ProductListrow: {
    //marginLeft:20,
    flex: 1,
    //marginRight:20,

    flexDirection: 'row',
    //marginTop:10,
    // marginBottom:
  },
  ProductImage: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  SlugListText: {
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
    marginTop: 2,
    fontWeight: 'bold',
  },
  Productdesc: {
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
  },

  productQuntity2: {
    flexDirection: 'row',
    width: '35%',
    height: 30,
    marginLeft: 7,
    marginRight: 7,
  },

  productQuntity1: {
    // borderWidth:1,
    flexDirection: 'row',
    width: '35%',
    height: 30,
    borderColor: globalcolor.borderColor,
    marginRight: 7,
  },
  productQuntity: {
    height: 30,
    borderColor: globalcolor.borderColor,
    flexDirection: 'row',
  },
  productQuntityItem: {
    marginLeft: 2,
    width: '70%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    borderEndWidth: 1,
  },

  productAddToCart: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '70%',
    height: 30,
    borderColor: globalcolor.PrimaryColor,
    marginLeft: 15,
  },
  productAddToCartVariatActive: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '80%',
    height: 30,
    borderColor: globalcolor.PrimaryColor,
    marginLeft: 15,
  },
  productAddToCartVariant: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '50%',
    height: 30,
    borderColor: globalcolor.PrimaryColor,
    marginLeft: 15,
  },
  ProductCartItemDesible: {
    marginLeft: 2,
    width: '60%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    borderEndWidth: 1,
    borderEndColor: globalcolor.desibleColour,
  },
  ProductCartItem: {
    marginLeft: 2,
    width: '60%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    borderEndWidth: 1,
    borderEndColor: globalcolor.PrimaryColor,
  },
  ProductCartItem_variant: {
    marginLeft: 2,
    width: '62%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    borderEndWidth: 1,
    borderEndColor: globalcolor.PrimaryColor,
  },
  ProductCartItem2: {
    marginLeft: 2,
    width: '40%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    borderEndWidth: 1,
    borderLeftWidth: 1,
    borderEndColor: globalcolor.PrimaryColor,
    borderLeftColor: globalcolor.PrimaryColor,
  },
  ProductCartItem_minus: {
    width: '30%',
    height: 30,

    justifyContent: 'center',
    alignSelf: 'center',
    borderEndWidth: 1,
    borderEndColor: globalcolor.PrimaryColor,
  },
  AddIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontFamily: globalcolor.Font,
  },
  QunityText: {
    fontFamily: globalcolor.Font,
  },

  panel: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    zIndex: 1,
    borderColor: globalcolor.PrimaryColor,
    borderRadius: 10,
    padding: 10,
  },

  header: {
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: globalcolor.PrimaryColor,
  },
  panelTitle: {
    fontSize: 14,

    height: 50,
    fontFamily: globalcolor.Font,
    fontWeight: 'bold',
  },

  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    //marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  FlatListStyle: {
    flex: 1,
    zIndex: 1,
    marginTop: 20,
  },
});
