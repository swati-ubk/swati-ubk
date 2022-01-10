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
  Dimensions,
} from 'react-native';
import {ConfigFile} from '../service/ConfigFile';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import WebService from '../service/WebService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeProvider} from 'react-native-paper';
export default class RewardsDetails extends React.Component {
  constructor(props) {
    console.log('RewardsDeatils...', props);
    super(props);
    this.state = {
      data: [],
      cartname: 'ADD TO CART',
      ProductID: this.props.route.params.ProductID,
      loading: false,
      WindowWIDTH: Dimensions.get('window').width,
      WindowHeight: Dimensions.get('window').height,
      imgActive: 0,
      localcartReword: [],
      CartCount: 0,
      TotalCartCoin: 0,
    };
  }

  async componentDidMount() {
    this.importData();
    this.setState({loading: true});
    this.setState({data: []});
    this.fetchCats();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.importData();
      this.setState({loading: true});
      this.setState({data: []});
      this.fetchCats();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(
      JSON.stringify(prevState) +
        '-----ooooo-------' +
        JSON.stringify(prevProps),
    );
    let a = prevState.ProductID;
    let b = this.props.route.params.ProductID;
    if (a != b) {
      console.log('aaaaaaa--------');
      this.importData();
      this.setState({loading: true});
      this.setState({data: []});
      this.setState({ProductID: this.props.route.params.ProductID});
      this.fetchCats();
    } else {
    }
  }

  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const itemsArray = await AsyncStorage.multiGet(keys);
      let object = {};
      itemsArray.map(item => {
        console.log('-------222----------', `${item[0]}`); //count
        if (`${item[0]}` == 'RewordCart') {
          console.log('llllllllllllllllllllllllllllllll', item[1]);
          object['ubk'] = JSON.parse(item[1]);

          console.log('llllllllllllllllllllllllllllllll', object);
        } else {
        }
      });

      this.setState(state => ({
        localcartReword: [object],
      }));

      var data22 = JSON.stringify(this.state.localcartReword[0]);
      console.log('sdsdsdsdsds---------', data22.size);
      if (data22 === null || data22 === undefined || data22 === '{}') {
        console.log('okkk-------------');
      } else {
        console.log('okkk222222-------------');
        console.log('=======' + JSON.stringify(JSON.parse(data22).ubk));

        let data = JSON.parse(data22);
        /// let ppp= data.filter(data => data.id == "5f7038c2742515372619506f");

        var ddddddd = data.ubk;
        let ppp = ddddddd.filter(
          ddddddd => ddddddd.productId == this.state.ProductID,
        );

        console.log('okkk33333333-------------' + this.state.ProductID);
        if (ppp.length == 0) {
          this.setState({
            cartname: 'ADD TO CART',
          });
        } else {
          this.setState({
            cartname: 'GO TO CART',
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  RewordCart = async product => {
    console.log('sdasdass----------', this.state.cartname);

    if (this.state.cartname == 'GO TO CART') {
      const keys = await AsyncStorage.getAllKeys();
      const itemsArray = await AsyncStorage.multiGet(keys);
      let object = {};
      itemsArray.map(item => {
        console.log('-------222----------', `${item[0]}`); //count
        if (`${item[0]}` == 'RewordCart') {
          // console.log("llllllllllllllllllllllllllllllll",item[1])
          object = JSON.parse(item[1]);
          //console.log("llllllllllllllllllllllllllllllll",object)
        }
      });
      console.log('RewardsLocal cart', object);
      if (object.length > 0) {
        let TotalCointIncart = 0;
        object.forEach(element => {
          // console.log('element....', element);
          TotalCointIncart += element.priceInCoins;
        });
        console.log('TotalCointIncart 111....', TotalCointIncart);
        console.log('CartCount 222....', object.length);
        this.setState({
          CartCount: object.length,
          TotalCartCoin: TotalCointIncart,
        });
      } else {
        this.setState({
          CartCount: 0,
          TotalCartCoin: 0,
        });
      }

      this.props.navigation.navigate('RewordAddToCart', {
        CartCount: this.state.CartCount,
        TotalCartCoin: this.state.TotalCartCoin,
      });
    } else {
      let data_obj;

      const rewordData = await AsyncStorage.getItem('RewordCart');

      console.log('nooooooo', JSON.parse(rewordData));

      if (rewordData === null || rewordData === undefined) {
        //    //no value set in storage
        //    console.log("okkkkk");

        data_obj = [
          {
            name: product[0].productName,
            size: product[0].availableSize[0],
            quantity: 1,
            priceInCoins: product[0].priceInCoins,
            productId: product[0].id,
          },
        ];

        await AsyncStorage.setItem('RewordCart', JSON.stringify(data_obj));
      } else {
        data_obj = {
          name: product[0].productName,
          size: product[0].availableSize[0],
          quantity: 1,
          priceInCoins: product[0].priceInCoins,
          productId: product[0].id,
        };

        let data = JSON.parse(rewordData);
        data.push(data_obj);
        //   console.log("nooooooo",JSON.parse(value));
        await AsyncStorage.setItem('RewordCart', JSON.stringify(data));
      }
    }

    this.importData();
  };

  // and don't forget to remove the listener

  fetchCats = () => {
    //this.setState({loading:true});
    WebService.GetData(`store-product/${this.props.route.params.ProductID}`)
      .then(response => response.json())
      .then(responseJson => {
        console.log('store-product....', responseJson);
        // console.log('length='+responseJson.length)
        if (responseJson.length > 0) {
          //  console.log(responseJson);
          this.setState({data: responseJson, loading: false});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  onchange = nativeEvent => {
    //console.log(nativeEvent);
    if (nativeEvent) {
      // console.log("contentOffset X===="+nativeEvent.contentOffset.x);
      //console.log("contentOffset Y===="+nativeEvent.layoutMeasurement.width)
      const ratio =
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width;
      const slide = Math.ceil(ratio);
      if (slide != this.state.imgActive) {
        this.setState({imgActive: slide});
        //SetimgActive(slide);
      }
    }
  };
  shopNow(status) {
    return status == true ? (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('ProductListScreen', {
            StoreId: this.props.route.params.StoreId,
          });
        }}>
        <View style={globalstyle.FooterTabButton}>
          <Text style={globalstyle.FooterTabText}> Shop now</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  }
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
  handleBackButtonClick() {
    console.log('Back buttton............', this.props.navigation);
    this.props.navigation.goBack();
    return true;
  }

  render() {
    // console.log(this.props.route.params.Catvalue);

    ///var jkjj="[{"RewordCart": "[{\"name\":\"BANARASHI LICHI SILK  SAREE\",\"size\":\"Free\",\"quantity\":1,\"priceInCoins\":14000,\"productId\":\"5f7035677425153726195069\"}]"}]"

    console.log('=========gagsgas=========', this.state.localcartReword[0]);

    //  console.log("=========gagsgas=========",JSON.stringify(this.state.localcart[0].RewordCart));

    var data22 = JSON.stringify(this.state.localcartReword[0]);
    console.log('sdsdsdsdsds---------', data22);
    // if (data22 === null || data22 === undefined || data22 === '{}')
    // {
    //    console.log("okkk-------------")
    // }
    // else{
    //   console.log("okkk222222-------------")
    //  // console.log("======="+JSON.stringify(JSON.parse(data22).ubk))

    //   let data=JSON.parse(data22);
    //   ///let ppp= data.filter(data => data.id == "5f7038c2742515372619506f");

    //   //console.log("okkk33333333-------------"+data.ubk.length)
    //   //var ddddddd=data.ubk
    //   //let ppp= ddddddd.filter(ddddddd => ddddddd.productId == "5f7038c2742515372619506f");

    // }

    // let data=this.state.localcartReword;
    //let ppp= data.filter(data => data.id == "5f7038c2742515372619506f");
    ///console.log("=========gagsgasppp=========",ppp);

    if (this.state.data.length > 0) {
      // this.state.data.isBoomPartner?this.shopNow('Active'):''

      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View
              style={{
                width: this.state.WindowWIDTH,
                height: this.state.WindowHeight * 0.4,
              }}>
              <ScrollView
                onScroll={({nativeEvent}) => this.onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={{
                  width: this.state.WindowWIDTH,
                  height: this.state.WindowHeight * 0.4,
                }}>
                {this.state.data[0].photos.map((value, index) => (
                  <View key={index}>
                    {/* <TouchableOpacity 
                  onPress={() => this.handleBackButtonClick()}
                  > */}
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        marginLeft: 15,
                        marginTop: 10,
                      }}>
                      <FontAwesome
                        name="arrow-left"
                        color={globalcolor.Textcolor}
                        size={20}
                        onPress={() => this.handleBackButtonClick()}
                      />
                    </View>
                    {/* </TouchableOpacity>  */}
                    <Image
                      resizeMode="stretch"
                      style={{
                        width: this.state.WindowWIDTH,
                        height: this.state.WindowHeight * 0.4,
                      }}
                      source={{uri: globalcolor.ImageBaseUrl + value.path}}
                    />
                  </View>
                ))}
              </ScrollView>
              <View style={styles.wrapdot}>
                {this.state.data[0].photos.map((value, index) => (
                  <Text
                    key={index}
                    style={
                      this.state.imgActive == index
                        ? styles.dotActive
                        : styles.dot
                    }>
                    ●
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.DocumnetContainer}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '100%'}}>
                  <Text style={styles.Shopsulg}>
                    {this.state.data[0].brandName}
                  </Text>
                  <Text style={styles.ShopTitle}>
                    {this.state.data[0].productName}
                  </Text>
                </View>

                {/* <View style={styles.ShopNowButton}>
                  <Text style={styles.ShopNowButtonText}>Shop Now</Text> 
              </View> */}
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 20, width: '100%'}}>
                <View style={{marginLeft: 15, width: '8%'}}>
                  <Image
                    source={require('../assets/img/coin.png')} //Change your icon image here
                    style={globalstyle.CoinIcon}
                  />
                </View>
                <View style={{width: '30%', marginTop: 5}}>
                  <Text style={{fontFamily: globalcolor.Font, fontSize: 20}}>
                    {this.state.data[0].priceInCoins}
                  </Text>
                </View>
                <View style={{width: '15%', marginTop: 5}}>
                  <Text style={{fontFamily: globalcolor.Font, fontSize: 20}}>
                    Size
                  </Text>
                </View>
                <View
                  style={{
                    width: '13%',
                    marginTop: 5,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: globalcolor.PrimaryColor,
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontFamily: globalcolor.Font,
                      fontSize: 14,
                      padding: 5,
                      color: globalcolor.PrimaryColor,
                    }}>
                    Free
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                  borderTopWidth: 0.5,
                  borderTopColor: globalcolor.SeconderFontColor,
                }}>
                <Text style={[styles.ShopTitle, {marginTop: 20}]}>
                  Product Description
                </Text>
                <Text style={{padding: 20, textAlign: 'justify'}}>
                  {this.state.data[0].description}
                </Text>
              </View>
              <View style={{borderTopColor: globalcolor.SeconderFontColor}}>
                <Text style={[styles.ShopTitle, {marginTop: 20}]}>
                  Product Details
                </Text>
                {this.state.data[0].attributes.map((value, index) =>
                  value.value != '' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        marginLeft: 20,
                        width: '100%',
                      }}
                      key={index}>
                      <View style={{width: '40%', marginTop: 5}}>
                        <Text
                          style={{fontFamily: globalcolor.Font, fontSize: 16}}>
                          {value.type}{' '}
                        </Text>
                      </View>
                      <View style={{width: '60%', marginTop: 5}}>
                        <Text
                          style={{
                            fontFamily: globalcolor.Font,
                            fontSize: 14,
                            color: globalcolor.SeconderFontColor,
                          }}>
                          {value.value}
                        </Text>
                      </View>
                    </View>
                  ) : null,
                )}
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() => this.RewordCart(this.state.data)}
            //onPress={() => {this.props.navigation.navigate('ProductListScreen',{StoreId:this.props.route.params.StoreId}) }}
          >
            <View style={globalstyle.FooterTabButton}>
              <Text style={globalstyle.FooterTabText}>
                {' '}
                {this.state.cartname}
              </Text>
            </View>
          </TouchableOpacity>
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
    marginTop: 28,
  },
  DocumnetContainer: {
    marginTop: 10,
    marginBottom: 50,
  },

  wrapdot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: 'white',
  },
  ShopNowButton: {
    width: '25%',
    height: 42,
    backgroundColor: globalcolor.PrimaryColor,
    padding: 10,
    borderRadius: 20,
  },
  ShopNowButtonText: {
    color: '#fff',
    fontFamily: globalcolor.Font,
    fontWeight: '700',
  },
  ReviewText: {
    color: '#fff',
    fontFamily: globalcolor.Font,
  },
  ShopTitle: {
    marginLeft: 20,
    fontFamily: globalcolor.Font,
    fontSize: 20,
    fontWeight: '400',
    color: globalcolor.SeconderFontColor,
  },
  Shopsulg: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 20,
    fontFamily: globalcolor.Font,
    fontWeight: '300',
    color: globalcolor.SeconderFontColor,
  },
  ShopAddress: {
    marginTop: 5,
    marginLeft: 20,
    fontFamily: globalcolor.Font,

    color: globalcolor.SeconderFontColor,
  },
  ReviewContainer: {
    marginLeft: 20,
    backgroundColor: globalcolor.PrimaryColor,
    padding: 7,
    borderRadius: 20,
  },
});
