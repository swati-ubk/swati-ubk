import React, {useState, useEffect} from 'react';
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
const AddToCart = props => {
  //console.log(props.route.params.Catvalue);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isListEnd, setIsListEnd] = useState(false);
  const [acceptsCOD, setacceptsCOD] = useState(false);
  const [requireSlot, setrequireSlot] = useState(false);
  const [totalPrice, settotalPrice] = useState(props.route.params.totalPrice);
  const [localcart, setlocalcart] = useState([]);
  const [StoreId, setStoreId] = useState(props.route.params.StoreID);
  console.log('props...', JSON.stringify(props.route.params.totalPrice));
  useEffect(() => {
    async function fetchMyAPI() {
      console.log('Add to cart Calling me ......');
      try {
        let localcartdata = [];
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
            // console.log('llllllllllllllllllllllllllllllll');
          } else {
            if (`${item[0]}` == 'count') {
              // console.log("a.....",item[1])
              // this.setState({
              //   count: item[1],
              // });
              settotalPrice(item[1]);
            } else if (`${item[0]}` == 'totalPrice') {
              // this.setState({
              //   totalPrice: item[1],
              // });
              settotalPrice(item[1]);
            } else {
              // console.log("============")
              const jsondata = JSON.parse(item[1]);
              // console.log(jsondata)
              let object = {};

              if (jsondata.hasOwnProperty('count')) {
                //let object = {}

                (object['productId'] = jsondata.id),
                  (object['variantId'] = jsondata.variants),
                  (object['quantity'] = jsondata.count);
                console.log('productItems 1111..', object);
                //  setlocalcart(localcart => [...localcart, object]);
                // setlocalcart([...localcart, object]);
                localcartdata.push(object);
              } else {
                // console.log("========11111==========")
                console.log(jsondata.variants);

                for (const [key, value] of Object.entries(jsondata.variants)) {
                  object = {};
                  (object['productId'] = jsondata.id),
                    (object['variantId'] = `${key}`),
                    (object['quantity'] = `${value}`);
                  console.log('productItems 2222..', object);
                  // dataproduct.push(object);
                  //  setlocalcart([...localcart, object]);
                  // setlocalcart(localcart => [...localcart, object]);
                  // this.setState({localcart: [...this.state.localcart, object]});
                }
                //setlocalcart(localcart, dataproduct);
                localcartdata.push(object);
              }

              console.log('localcart data', localcartdata);
              setlocalcart(localcartdata);
            }
          }
        });

        fetchData();
      } catch (error) {
        console.error(error);
      }
    }

    fetchMyAPI();
  }, [props.route.params.StoreID, props.route.params.totalPrice]);

  const fetchData = async () => {
    setLoading(true);
    //   console.log('StoreId...', this.props.route.params.StoreID);
    try {
      let SelectedStoreID = await AsyncStorage.getItem('SelectedStoreID');
      setStoreId(SelectedStoreID);
      //   console.log('SelectedStoreIDABC', this.props.route.params.StoreID);
      //console.log('SelectedStoreIDABCD', SelectedStoreID);
      WebService.GetData('business-details/' + SelectedStoreID)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.length > 0) {
            setacceptsCOD(responseJson[0].acceptsCOD);
            setrequireSlot(responseJson[0].requireSlot);
          }
        })
        .catch(error => {
          console.error(error);
        });

      let jsonpostdata = {
        businessId: SelectedStoreID,
        items: localcart,
        orderType: 'BOOM_DELIVERY',
      };
      console.log('jsonpostdata', jsonpostdata);
      try {
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
        setDataSource(json);
        settotalPrice(json.pricing.customerToPay);

        //   this.setState({data: json, totalPrice: json.pricing.customerToPay});
      } catch (error) {
      } finally {
        // this.setState({isLoading: false});
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }

    //console.log(json);
  };

  /**************************Start Here Search Product*******************************/

  const handleBackButtonClick = () => {
    console.log('Back buttton............', props.navigation);
    props.navigation.goBack();
    return true;
  };

  /**************************End  Here Search Product*******************************/

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{margin: 15}}
          />
        ) : null}
      </View>
    );
  };
  const product_cart = item => {
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

  const ItemSeparator = () => (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
      }}
    />
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*------------BACK BUTTON START------------------*/}
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          borderRadius: 10,
          marginRight: 15,
          marginTop: 30,
        }}>
        <TouchableOpacity onPress={() => handleBackButtonClick()}>
          <View style={{flex: 0.2, marginRight: 20}}>
            <FontAwesome
              name="arrow-left"
              color={globalcolor.PrimaryColor}
              size={20}
            />
          </View>
        </TouchableOpacity>
        <View style={{flex: 0.8}}>
          <Text
            style={{
              color: globalcolor.PrimaryColor,
              fontFamily: globalcolor.Font,
              fontSize: 20,
            }}>
            Cart
          </Text>
        </View>
      </View>
      {/*------------BACK BUTTON END------------------*/}
      <FlatList
        data={dataSource.items}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => 'item_' + index}
        renderItem={product_cart}
      />
    </SafeAreaView>
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

  OtpImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
});

export default AddToCart;
