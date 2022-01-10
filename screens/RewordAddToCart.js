import React, {Component} from 'react';
import WebService from '../service/WebService';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
//import InputSpinner from "react-native-input-spinner";

import Counter from 'react-native-counters';

export default class RewordAddToCart extends Component {
  constructor(props) {
    console.log('RewardsCart Props..', props);
    super(props);

    this.state = {
      value: 1,
      data: [],
      localcart: [],
      isLoading: true,
      count: 0,
      totalPrice: 0,
      localcartReword: [],
      CartCount: props.route.params.CartCount,
      TotalCartCoin: props.route.params.TotalCartCoin,
    };
    console.log('state....', this.state);
  }

  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const itemsArray = await AsyncStorage.multiGet(keys);
      let object = {};
      itemsArray.map(item => {
        console.log('-------222----------', `${item[0]}`); //count
        if (`${item[0]}` == 'RewordCart') {
          // console.log("llllllllllllllllllllllllllllllll",item[1])
          object['ubk'] = JSON.parse(item[1]);

          //console.log("llllllllllllllllllllllllllllllll",object)
        } else {
        }
      });

      this.setState(state => ({
        localcartReword: [object],
      }));

      ///this.fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    // this.fetchData();
    this.importData();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.importData();
    });
  }
  componentDidUpdate(prevProps, prevState) {
    let a = prevState.TotalCartCoin;
    let b = this.props.route.params.TotalCartCoin;

    console.log('a============', a);
    console.log('b============', b);
    if (a != b) {
      this.setState(prevState => ({
        TotalCartCoin: b,
      }));
      this.importData();
    }
  }

  increaseCount = async (data, count, productId, type) => {
    //const product = await AsyncStorage.getItem(productId);
    //const totalPrice = await AsyncStorage.getItem('totalPrice');
    // const totalcount = await AsyncStorage.getItem('count');
    /// const userData = JSON.parse(product);
    ///let data_obj;

    console.log('oooooo----', this.state.localcartReword[0].ubk);

    console.log(productId, '..999999999..' + count);

    let arrr = this.state.localcartReword[0].ubk;
    var indexx = arrr.findIndex(obj => obj.productId === productId);
    arrr[indexx].quantity = count;
    console.log('=================92.5', JSON.stringify(arrr));

    await AsyncStorage.setItem('RewordCart', JSON.stringify(arrr));

    this.importData();
  };

  delData = async (data, productId) => {
    console.log(productId, '-------------------');

    const rewordData = await AsyncStorage.getItem('RewordCart');

    console.log('nooooooo', JSON.parse(rewordData));

    if (rewordData === null || rewordData === undefined) {
      //    //no value set in storage
      //    console.log("okkkkk");
      /// await AsyncStorage.setItem('RewordCart', JSON.stringify(data_obj));
    } else {
      // data_obj= { name : product[0].productName,
      //   size: product[0].availableSize[0],
      //   quantity:1,
      //   priceInCoins:product[0].priceInCoins,
      //   productId :product[0].id,
      //   }

      let data = JSON.parse(rewordData);

      let ppp = data.filter(data => data.productId == productId);

      console.log(data + '-------------------eeeeeeeddd--------', ppp[0]);
      var index = data.indexOf(ppp[0]);

      data.splice(index, 1);
      // var ddata=ppp[0];

      console.log(
        '-------------------eeeeeeeddd--------',
        JSON.stringify(data),
      );

      // const filteredItems = ddata.filter(ddata => ddata !== ppp)
      // ddata.sli
      // data.push(data_obj)
      /// console.log(index+"-----nooooooo",filteredItems);
      await AsyncStorage.setItem('RewordCart', JSON.stringify(data));

      this.importData();
    }
  };

  checkOut() {
    console.log('okkkkkkkkkkk');
  }

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
    //console.log(item.item.maxOrderQuantity)

    let nameee = item.item.name;
    console.log(nameee, 'nameeeeee');

    return (
      <View key={item} style={[styles.container, {padding: 10}]}>
        <View style={{flex: 0.6}}>
          <Text>{nameee} </Text>
          <Text style={globalstyle.ProductPrice}>
            <Image
              source={{uri: 'https://diskounto.com/common/reward-coin.png'}}
              style={{width: 15, height: 15, borderRadius: 70}}
            />
            <Text style={{fontWeight: 'bold', color: '#000000'}}>
              {' '}
              {item.item.priceInCoins}{' '}
            </Text>
            {/* <Text style={{fontWeight:"bold",color:'#000000',textDecorationLine: 'line-through'}}>₹ { item.item.priceInCoins} </Text>  */}
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
              max={5}
              start={parseInt(item.item.quantity)}
              onChange={(len, type) => {
                console.log(len, type);

                console.log('----11111---', item.item.productId);
                this.increaseCount(item, len, item.item.productId, type);
              }}
            />
          </View>
        </View>

        <View style={{paddingLeft: 50}}>
          <TouchableOpacity
            onPress={() => this.delData(item, item.item.productId)}>
            <FontAwesome
              name="times"
              color={globalcolor.Errorcolor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {localcartReword, isLoading} = this.state;

    console.log('------33333-------', this.state.localcartReword);

    let data1 = {data: this.state.localcartReword[0], prop: this.props};

    var data22 = JSON.stringify(this.state.localcartReword[0]);
    console.log('sdsdsdsdsds---------', data22);
    if (data22 === null || data22 === undefined) {
      // console.log("okkk-------------")
      return <Text>NO DATA IN ADD TO CART</Text>;
    } else {
      console.log('okkk222222-------------');
      //console.log("======="+JSON.stringify(JSON.parse(data22).ubk))

      let data = JSON.parse(data22);

      // var ddddddd=JSON.stringify(data.ubk);
      //  console.log("ddddddddddd============"+ddddddd);

      return (
        <SafeAreaView style={styles.container}>
          <View style={{flex: 1, padding: 1, marginTop: 50}}>
            <FlatList
              data={data.ubk}
              ItemSeparatorComponent={this.ItemSeparator}
              keyExtractor={(item, index) => 'item_' + index}
              renderItem={this.product_cart}
            />

            {/* <Footer data={ prop:this.probs, id:'d' } /> */}

            <Footer data={data1} />
          </View>
        </SafeAreaView>
      );
    }
  }
}

const Footer = data => {
  //  // const { data } = this.state;
  console.log('=========ssss=====', data.data.data);

  //       if (typeof data.data.data === 'undefined') {

  const rewordArray = data.data.data.ubk;

  let result = 0;
  rewordArray.forEach(element => {
    result += element.priceInCoins * element.quantity;
  });

  // const result = rewordArray.reduce((total, currentValue) => total = total + currentValue.priceInCoins * currentValue.quantity ,0);

  console.log(result, '-----2222-------' + rewordArray.length);

  return (
    <View style={{width: '100%', padding: 10}}>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <Text style={{width: '50%', textAlign: 'left'}}>
          Price ({rewordArray.length} items)
        </Text>
        <Text style={{width: '50%', textAlign: 'right'}}> ₹ {result}</Text>
      </View>

      <View style={{width: '100%', flexDirection: 'row'}}>
        <Text style={{width: '50%', textAlign: 'left'}}>Delivery Charges</Text>
        <Text style={{width: '50%', textAlign: 'right', color: '#018301'}}>
          Free
        </Text>
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
        <Text style={{width: '50%', textAlign: 'right'}}> ₹ {result}</Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            data.data.prop.navigation.navigate('RewordAddress', {
              total: result,
            });
          }}>
          <View style={globalstyle.FooterTabButton}>
            <Text style={globalstyle.FooterTabText}> CHECK OUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
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
});
