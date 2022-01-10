import React, {Component} from 'react';
import WebService from '../service/WebService';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
//import InputSpinner from "react-native-input-spinner";
import Counter from 'react-native-counters';
export default class AddToCart extends Component {
  constructor(props) {
    super(props);
    console.log('AddToCart probs..', this.props);
    this.state = {
      value: 1,
      data: [],
      StoreID: '',
      acceptsCOD: '',
      requireSlot: '',
      localcart: [],
      isLoading: true,
      count: 0,
      totalPrice: 0,
    };
    console.log('add Cart call me....');
  }
  importData = async () => {
    try {
      this.state.localcart = [];
      const keys = await AsyncStorage.getAllKeys();

      const itemsArray = await AsyncStorage.multiGet(keys);

      let object2 = {};
      itemsArray.map(item => {
        object2[`${item[0]}`] = item[1];
      });
      console.log('=======>', object2);

      itemsArray.map(item => {
        console.log(item[1], '-------222----------', `${item[0]}`);
        if (
          `${item[0]}` == 'user' ||
          `${item[0]}` == 'userToken' ||
          `${item[0]}` == 'SelectedStoreID' ||
          `${item[0]}` == 'RewordCart' ||
          `${item[0]}` == 'Coordinate' ||
          `${item[0]}` == 'address'
        ) {
          //   console.log("llllllllllllllllllllllllllllllll")
        } else {
          if (`${item[0]}` == 'count') {
            // console.log("a.....",item[1])
            this.setState({
              count: item[1],
            });
          } else if (`${item[0]}` == 'totalPrice') {
            this.setState({
              totalPrice: item[1],
            });
          } else {
            // console.log("============")
            const jsondata = JSON.parse(item[1]);
            // console.log(jsondata)
            let object = {};

            if (jsondata.hasOwnProperty('count')) {
              // let object = {}

              (object['productId'] = jsondata.id),
                (object['variantId'] = jsondata.variants),
                (object['quantity'] = jsondata.count);

              this.setState({localcart: [...this.state.localcart, object]});
            } else {
              // console.log("========11111==========")
              // console.log(jsondata.variants)

              for (const [key, value] of Object.entries(jsondata.variants)) {
                // console.log(`${key}: ${value}`);
                //console.log("======22222======")
                object = {};
                (object['productId'] = jsondata.id),
                  (object['variantId'] = `${key}`),
                  (object['quantity'] = `${value}`);
                // console.log(object);

                this.setState({localcart: [...this.state.localcart, object]});
              }
            }
          }
        }
      });

      this.fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  fetchData = async () => {
    //   console.log('StoreId...', this.props.route.params.StoreID);
    try {
      let SelectedStoreID = await AsyncStorage.getItem('SelectedStoreID');
      this.setState({StoreId: SelectedStoreID});
      // console.log('SelectedStoreIDABC', this.props.route.params.StoreID);
      //console.log('SelectedStoreIDABCD', SelectedStoreID);
      WebService.GetData('business-details/' + SelectedStoreID)
        .then(response => response.json())
        .then(responseJson => {
          // console.log(responseJson);
          // console.log('length='+responseJson.length)
          if (responseJson.length > 0) {
            console.log('FecthStoreId..', SelectedStoreID);
            console.log(
              'acceptsCOD..',
              JSON.stringify(responseJson[0].acceptsCOD),
            );
            console.log(
              'acceptsCOD..',
              JSON.stringify(responseJson[0].acceptsCOD),
            );
            console.log(
              'requireSlot..',
              JSON.stringify(responseJson[0].requireSlot),
            );
            this.setState({
              acceptsCOD: responseJson[0].acceptsCOD,
              requireSlot: responseJson[0].requireSlot,
            });
          }
        })
        .catch(error => {
          console.error(error);
        });

      let jsonpostdata = {
        businessId: SelectedStoreID,
        items: this.state.localcart,
        orderType: 'BOOM_DELIVERY',
      };
      //console.log("==============")
      // console.log(jsonpostdata)
      try {
        // setLoading(true);
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(jsonpostdata),
        };
        const response = await WebService.PostData(
          'cart-details',
          requestOptions,
        );
        const json = await response.json();
        console.log(
          '============= cart data===================',
          JSON.stringify(json.pricing.customerToPay),
        );

        this.setState({data: json, totalPrice: json.pricing.customerToPay});
      } catch (error) {
        // console.log(error);
      } finally {
        this.setState({isLoading: false});
      }
    } catch (e) {
      console.log(e);
    }

    //console.log(json);
  };

  componentDidMount() {
    // this.fetchData();
    this.importData();
  }
  componentDidUpdate(prevProps, prevState) {
    let a = prevState.totalPrice;
    let b = this.state.totalPrice;
    console.log('a========', a);
    console.log('b========', b);
  }
  increaseCount = async (data, count, productId, type) => {
    const product = await AsyncStorage.getItem(productId);
    const totalPrice = await AsyncStorage.getItem('totalPrice');
    const totalcount = await AsyncStorage.getItem('count');
    const userData = JSON.parse(product);
    let data_obj;
    // console.log(userData,"999999999");
    if (userData.hasOwnProperty('count')) {
      data_obj = {
        name: userData.name,
        variants: userData.variants,
        id: userData.id,
        count: count,
        price: userData.price,
      };
      console.log('aaaaaaaaaaaaaaaa....', '' + JSON.stringify(data_obj));
      await AsyncStorage.setItem(data.item.productId, JSON.stringify(data_obj));
      this.importData();
    } else {
      var veri_id = data.item.variant.id;
      var v_obj = userData.variants;
      v_obj[[veri_id]] = count;
      console.log(
        userData.priduce_v,
        '------------999999999------------' + JSON.stringify(v_obj),
      );
      let arrr = userData.priduce_v;
      var indexx = arrr.findIndex(obj => obj.id === veri_id);
      arrr[indexx].count = count;
      console.log('=================92.5', JSON.stringify(arrr));
      //arrr.splice(indexx,1);
      /// delete v_obj[veri_id]
      data_obj = {
        name: userData.name,
        variants: v_obj,
        id: userData.id,
        priduce_v: arrr,
      };
      await AsyncStorage.setItem(data.item.productId, JSON.stringify(data_obj));
      console.log(
        data_obj,
        '=================999=============',
        JSON.stringify(data_obj),
      );
      this.importData();
    }
  };

  delData = async (data, productId) => {
    console.log(productId);

    const product = await AsyncStorage.getItem(productId);
    const totalPrice = await AsyncStorage.getItem('totalPrice');
    const totalcount = await AsyncStorage.getItem('count');
    const userData = JSON.parse(product);

    // console.log(userData)
    if (userData.hasOwnProperty('count')) {
      console.log(userData.count, totalcount);
      var cutcount = parseInt(totalcount) - parseInt(userData.count);

      var cutprice =
        parseInt(data.item.variant.sellingPrice) * parseInt(userData.count);

      var p_priceupdate = parseInt(totalPrice) - parseInt(cutprice);

      await AsyncStorage.setItem('count', '' + cutcount);
      await AsyncStorage.setItem('totalPrice', '' + p_priceupdate);
      console.log(totalPrice, cutprice);
      await AsyncStorage.removeItem(productId);

      this.importData();
    } else {
      var veri_id = data.item.variant.id;

      console.log(userData.variants[veri_id], totalcount);

      var cutcount =
        parseInt(totalcount) - parseInt(userData.variants[veri_id]);

      var cutprice =
        parseInt(data.item.variant.sellingPrice) *
        parseInt(userData.variants[veri_id]);

      var p_priceupdate = parseInt(totalPrice) - parseInt(cutprice);
      await AsyncStorage.setItem('count', '' + cutcount);
      await AsyncStorage.setItem('totalPrice', '' + p_priceupdate);
      console.log(userData.variants, cutprice);
      delete userData.variants[veri_id];

      var count = Object.keys(userData.variants).length;

      ///  await AsyncStorage.setItem(productId, JSON.stringify(data_obj));
      console.log(userData.variants, count);
      if (count == '0') {
        console.log('1ok');

        await AsyncStorage.removeItem(productId);

        this.importData();
      } else {
        console.log('1++ok');
        let data_obj;

        data_obj = {
          name: userData.name,
          variants: userData.variants,
          id: productId,
        };
        console.log('1ok', data_obj);

        await AsyncStorage.setItem(productId, JSON.stringify(data_obj));
        this.importData();
      }

      //  await AsyncStorage.removeItem(productId)
      //  this.importData()
    }
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

  product_cart = item => {
    console.log('0000000000000000000', item);
    //console.log(this.state.data)
    console.log(item.item.maxOrderQuantity);

    let nameee = item.item.variant.name;
    console.log(nameee, 'nameeeeee');
    if (nameee == '') {
      nameee = item.item.productName;
    } else {
      nameee = item.item.variant.name;
    }

    return (
      <View key={item} style={[styles.container, {padding: 10}]}>
        <View style={{flex: 0.6}}>
          <Text>{nameee} </Text>
          <Text style={globalstyle.ProductPrice}>
            Price ₹
            <Text style={{fontWeight: 'bold', color: '#000000'}}>
              {' '}
              {item.item.variant.sellingPrice}{' '}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textDecorationLine: 'line-through',
              }}>
              ₹ {item.item.variant.maximumPrice}{' '}
            </Text>
          </Text>
        </View>

        <View style={{flex: 0.4}}>
          <View></View>

          <View style={styles.productAddToCart}>
            <Counter
              buttonStyle={{
                borderColor: globalcolor.PrimaryColor,
                borderWidth: 2,
                borderRadius: 25,
              }}
              buttonTextStyle={{
                color: globalcolor.PrimaryColor,
              }}
              countTextStyle={{
                color: globalcolor.PrimaryColor,
              }}
              min={1}
              max={item.item.maxOrderQuantity}
              start={parseInt(item.item.quantity)}
              onChange={(len, type) => {
                console.log(len, type);
                this.increaseCount(item, len, item.item.productId, type);
              }}
            />
          </View>
        </View>

        <View style={{paddingLeft: 40}}>
          <TouchableOpacity
            onPress={() => this.delData(item, item.item.productId)}>
            <FontAwesome
              name="times"
              color={globalcolor.PlaceHolderColor}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    // var StoreId = this.fetchstoreID();
    // console.log('Footer StoreID...', StoreId);
    const {data, isLoading} = this.state;

    let totalcost = this.state.totalPrice;

    let data1 = {
      data: data.pricing,
      prop: this.props,
      Mystate: this.state,
      localcart: this.state.localcart,
    };
    //   console.log('UBk Footer data..', JSON.stringify(data1));

    console.log('addtocart ', JSON.stringify(this.state.data));
    // console.log('addtocart data', this.state.data.totalPrice);
    console.log('pricing', this.state.data.pricing);
    console.log('totalcost', totalcost);

    return totalcost > 0 ? (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1, padding: 1, marginTop: 50}}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data.items}
              ItemSeparatorComponent={this.ItemSeparator}
              keyExtractor={(item, index) => 'item_' + index}
              renderItem={this.product_cart}
            />
          )}
          {/* <Footer data={ prop:this.probs, id:'d' } /> */}

          <Footer data={data1} />
        </View>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={{marginTop: 80, flex: 1}}>
          <Image
            source={require('../assets/img/empty-cart.png')} //Change your icon image here
            style={[styles.OtpImage, {alignSelf: 'center'}]}
          />
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontSize: 25,
              fontFamily: globalcolor.Font,
              color: globalcolor.PrimaryColor,
            }}>
            Your cart is empty!
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

// const checkOut = (data) => {

//   // onPress={() => { data.data.prop.navigation.navigate('Payment') }}>
//   console.log("",data)
//   //    CheckOutAdderss.js
// }

const Footer = data => {
  if (typeof data.data.data === 'undefined') {
    console.log('===========ubk=1===========');

    return data.data.Mystate.totalPrice > 0 ? (
      <View style={{width: '100%', padding: 10}}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text style={{width: '50%', textAlign: 'left'}}>Item total</Text>
          <Text style={{width: '50%', textAlign: 'right'}}> ₹ </Text>
        </View>

        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text style={{width: '50%', textAlign: 'left'}}>Service charge</Text>
          <Text style={{width: '50%', textAlign: 'right'}}>₹ </Text>
        </View>

        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
            flexDirection: 'row',
          }}
        />
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text style={{width: '50%', textAlign: 'left'}}>Total</Text>
          <Text style={{width: '50%', textAlign: 'right'}}> ₹ </Text>
        </View>
      </View>
    ) : null;
    //return (null);
  } else {
    console.log('===========ubk=2===========', data.data.data.customerToPay);
    console.log(
      '===========ubk=2 prop===========',
      data.data.prop.route.params,
    );

    var total = data.data.data.customerToPay;
    var totall = data.data.data.totalPrice;
    return totall > 0 ? (
      <View style={{width: '100%', padding: 10}}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text style={{width: '50%', textAlign: 'left'}}>Item total</Text>
          <Text style={{width: '50%', textAlign: 'right'}}> ₹ {totall}</Text>
        </View>

        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text style={{width: '50%', textAlign: 'left'}}>Service charge</Text>
          <Text style={{width: '50%', textAlign: 'right'}}>₹ 0</Text>
        </View>

        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
            flexDirection: 'row',
          }}
        />
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text style={{width: '50%', textAlign: 'left'}}>Total</Text>
          <Text style={{width: '50%', textAlign: 'right'}}> ₹ {total}</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              data.data.prop.navigation.navigate('CheckOutAdderss', {
                StoreID: data.data.prop.route.params.StoreID,
                localcart: data.data.localcart,
                acceptsCOD: data.data.prop.route.params.acceptsCOD,
                requireSlot: data.data.prop.route.params.requireSlot,
              });
            }}>
            {/* // onPress={() => checkOut(data.data)}> */}

            <View style={globalstyle.FooterTabButton}>
              <Text style={globalstyle.FooterTabText}> CHECK OUT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  productAddToCart: {
    flexDirection: 'row',
    width: '60%',
    height: 30,

    marginLeft: 15,
    alignSelf: 'flex-end',
  },
  AddIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    fontFamily: globalcolor.Font,
  },
  ProductCartItem2: {
    marginLeft: 2,
    width: '40%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  roundButton1: {
    textAlign: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: globalcolor.PrimaryColor,
  },

  spinner: {},

  OtpImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
});
