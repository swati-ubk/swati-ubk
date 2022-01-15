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
} from 'react-native';
import {ConfigFile} from '../service/ConfigFile';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import WebService from '../service/WebService';
import {Badge} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class RewardsProductListScreen extends React.Component {
  constructor(props) {
    console.log('Catvalue..', props.route.params.Catvalue);
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      data: [],
      DataTest: [],
      refreshing: false,
      Catvalue: this.props.route.params.Catvalue,
      CatId: '',
      loading: false,
      offset: 0,
      loadmore: false,
      nodata: false,
      cartegorydata: [],
      noserachItem: true,
      CartCount: 0,
      Coin: this.props.route.params.Coin,
      TotalCartCoin: 0,
    };
  }

  async componentDidMount() {
    this.setState({data: []});
    this.setState({loading: true});
    setTimeout(() => {
      this.getproductlist();
    }, 1000);
    this.getRewardsCount();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getRewardsCount();
    });
  }
  componentDidUpdate(prevProps, prevState) {
    let a = prevState.Catvalue;
    let b = this.props.route.params.Catvalue;
    if (a != b) {
      this.setState({data: [], offset: 0});
      this.setState({loading: true});
      this.setState(prevState => ({
        Catvalue: b,
        data: [],
        offset: 0,
      }));

      console.log('Preve data', this.state.data);

      this.getproductlist();
    } else {
    }
  }

  async getRewardsCount() {
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
      console.log('TotalCointIncart....', TotalCointIncart);
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

    // console.log('Rewards count====', object.ubk.length);
  }

  // and don't forget to remove the listener

  getproductlist = () => {
    console.log('current offset....', this.state.offset);
    this.setState({refreshing: true});
    // this.setState({CatId:CatId});
    WebService.GetData(
      `store-product?skip=${this.state.offset}&limit=10&subCategoryCode=${this.props.route.params.Catvalue}`,
    )
      .then(res => res.json())
      .then(resJson => {
        console.log('----------888--', resJson.length);
        if (resJson.length > 0) {
          resJson.forEach(element => {
            //   console.log("element...",element);
            this.setState({data: [...this.state.data, element]});

            // this.renderItemComponent(element);
          });

          //console.log('DataTest...',JSON.stringify(this.state.DataTest));

          //this.setState({ data: resJson });
          // this.setState({
          //   data: resJson
          // })
          //  this.setState({ data: resJson});

          this.setState({
            refreshing: false,
            nodata: true,
            offset: this.state.offset + 1,
          });
        } else {
          console.log('----------99999--', resJson.length);
          // this.setState({category:this.props.route.params.Catvalue})

          this.setState({
            loadmore: false,
            loading: false,
            refreshing: false,
            data: [],
          });
        }
      })
      .catch(e => console.log(e));
  };

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
          this.setState({
            data: [],
            refreshing: false,
            noserachItem: false,
            loading: false,
          });
        }
      });
    } else {
      this.getproductlist(this.state.StoreID, this.state.CatId);
    }
  };
  /**************************End  Here Search Product*******************************/

  endreachedfun() {
    // console.log('End Call...',this.state.offset)
    //if(this.state.offset)
    // this.setState({offset:this.state.offset+1});
    // this.getproductlist();
  }

  renderItemComponent = data => {
    // console.log('product Rewards Items.....',data);
    // console.log("product_id....",data.item.id);
    //console.log('render item length......',Object.keys(data).length);
    //if(data.length>0){
    let imageUrl = '';
    if (data.item.photos.length > 0) {
      imageUrl = globalcolor.ImageBaseUrl + data.item.photos[0].path;
    } else {
      imageUrl =
        'data:image/png;base64,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';
    }
    // console.log(imageUrl);

    // console.log("---5555-----------",""+data.item.priceInCoins)
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('RewardsDetails', {
            ProductID: data.item.id,
          })
        }>
        <View style={styles.ProductListrow}>
          <View style={styles.ProductlistFirstItem}>
            <Image
              source={{uri: imageUrl}} //Change your icon image here
              style={[styles.ProductImage]}
            />
          </View>
          <View style={styles.ListBody}>
            <Text style={globalstyle.ProductText}>{data.item.productName}</Text>
            <Text style={styles.Productdesc}>
              {data.item.description.substring(0, 65)}{' '}
            </Text>
            <View style={styles.ProductListrow}>
              <View style={styles.productQuntity}></View>
              <View style={styles.productAddToCart}>
                <View style={styles.productQuntityItem}>
                  <Image
                    source={{
                      uri: 'https://diskounto.com/common/reward-coin.png',
                    }}
                    style={globalstyle.CoinIcon}
                  />
                </View>
                <View
                  style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    marginLeft: 4,
                  }}>
                  <Text style={styles.QunityText}>
                    {data.item.priceInCoins}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    //}
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
  handleRefresh = () => {
    this.setState({refreshing: false}, () => {
      this.getproductlist();
    }); // call fetchCats after setting the state
  };
  handleBackButtonClick() {
    console.log('Back buttton............', this.props.navigation);
    this.props.navigation.goBack();
    return true;
  }
  onEndReached = ({distanceFromEnd}) => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.getproductlist();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  render() {
    //  console.log("length==="+this.state.data.length);
    if (this.state.data.length > 1) {
      return (
        // this.state.noserachItem?
        <SafeAreaView style={{flex: 1, marginTop: 30, marginBottom: 10}}>
          {/*------------BACK BUTTON START------------------*/}
          <View
            style={[
              globalstyle.RewordBackButton,
              {
                borderBottomWidth: 1,
                borderBottomColor: globalcolor.SeconderFontColor,
              },
            ]}>
            <TouchableOpacity onPress={() => this.handleBackButtonClick()}>
              <View
                style={{
                  flex: 0.2,
                  marginRight: 20,
                  marginLeft: 10,
                  marginTop: 12,
                }}>
                <FontAwesome
                  name="arrow-left"
                  color={globalcolor.PrimaryColor}
                  size={20}
                />
              </View>
            </TouchableOpacity>

            <View style={{flex: 0.6, alignSelf: 'center'}}>
              <Text style={globalstyle.BackButtonText}>Rewards</Text>
            </View>
            <View
              style={{
                flex: 0.4,
                alignSelf: 'center',
                alignContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: 'https://diskounto.com/common/reward-coin.png'}}
                style={globalstyle.CoinIcon}
              />

              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 16,
                    fontFamily: globalcolor.Font,
                  }}>
                  {this.state.Coin}
                </Text>
              </View>
            </View>

            <View
              style={{flex: 0.5, alignItems: 'flex-end', alignSelf: 'center'}}>
              <Icon.Button
                name="cart"
                size={30}
                color={globalcolor.PrimaryColor}
                backgroundColor="transparent"
                onPress={() =>
                  this.props.navigation.navigate('RewordAddToCart', {
                    CartCount: this.state.CartCount,
                    TotalCartCoin: this.state.TotalCartCoin,
                  })
                }>
                <Badge
                  style={{
                    position: 'absolute',
                    marginLeft: 30,
                    alignSelf: 'flex-start',
                  }}>
                  {this.state.CartCount}
                </Badge>
              </Icon.Button>
            </View>
          </View>
          {/*------------BACK BUTTON END------------------*/}

          {/* <View style={[globalstyle.serachBar,globalstyle.BorderSearchbar]}>
            <View>
                <Image
                      source={require('../assets/img/SearchIcon.png')} //Change your icon image here
                      style={globalstyle.SearchIcon}
                  />
            </View>
              <TextInput 
                placeholder='Search Product'
                style={globalstyle.SearchBox}
                onChangeText={(val) => this.SearchProduct(val)}
              />
              
          </View>  */}

          <FlatList
            data={this.state.data}
            keyExtractor={item =>
              item.id.toString() +
              Math.floor(Math.random() * 10000000000000) +
              1
            }
            ItemSeparatorComponent={this.ItemSeparator}
            renderItem={item => this.renderItemComponent(item)}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
          />
        </SafeAreaView>
      );
    } else {
      console.log('===555999====', '' + this.state.data);
      console.log('===555999====', '' + this.state.loading);

      return (
        <View style={globalstyle.ActivityContainer}>
          {this.state.loading === true ? (
            <View>
              {this.ActivityIndicatorShow()}
              <Text style={globalstyle.ActivityIndicator}>
                Loading please wait....
              </Text>
            </View>
          ) : (
            <Text style={globalstyle.ActivityIndicator}>
              No Data Found In This Category
            </Text>
          )}
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
  item: {
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 60,
  },
  itemPhoto: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 9,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    // marginTop: 5,
  },
  ProductlistFirstItem: {
    width: '30%',
  },
  ListBody: {
    marginLeft: 10,
    width: '80%',
  },
  ListSecondIcon: {
    width: '15%',
  },
  ProductListrow: {
    //marginLeft:20,
    //marginRight:20,
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    // marginBottom:10
  },
  ProductImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
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
  productQuntity: {
    // borderWidth:1,
    flexDirection: 'row',
    width: '35%',
    height: 30,
    borderColor: globalcolor.borderColor,
    marginLeft: 7,
    marginRight: 7,
  },
  productQuntityItem: {
    marginLeft: 2,
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    // borderEndWidth:1
  },

  productAddToCart: {
    // borderWidth:1,
    flexDirection: 'row',
    width: '35%',
    height: 30,
    borderColor: globalcolor.PrimaryColor,
    marginLeft: 15,
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
  AddIcon: {
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 10,
    fontFamily: globalcolor.Font,
  },
  QunityText: {
    fontFamily: globalcolor.Font,
  },
});
