import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import {ConfigFile} from '../service/ConfigFile';
const OrderDetails = probs => {
  //console.log("==========All category==========");
  console.log('OrderDeatilsprobs....', probs);
  // console.log(order)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [DelivryType, setDeliveryType] = useState('Delivery Address');
  const [Items, setItems] = useState([]);
  const [Token, SetToken] = useState('');

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        console.log('userToken.....', userToken);
        SetToken(userToken);
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
          // body: JSON.stringify({ })
        };
        WebService.PostData(
          `my-orders/${probs.route.params.orderId}?limit=20&skip=0`,
          requestOptions,
        )
          .then(res => res.json())
          .then(resJson => {
            setItems(resJson[0].items);

            if (resJson[0].orderType == 'BOOM_PICKUP') {
              setDeliveryType('Pickup Address');
            }
            setData(resJson);
          })
          .catch(e => console.log(e));
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, [probs.route.params.orderId]);

  function handleBackButtonClick() {
    console.log(probs.navigation);
    probs.navigation.goBack();
    return true;
  }

  const CancelMyOrder = async Type => {
    //console.log('calling me.....');
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },

      body: JSON.stringify({event: Type}),
    };
    const response = await WebService.PostData(
      `my-orders/${probs.route.params.orderId}`,
      requestOptions,
    );
    const json = await response.json();
    console.log('MyOrder Cancel...', json);
  };
  const ActivityIndicatorShow = () => {
    return (
      <View>
        {loading ? (
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
  };
  const CancelOrder = OrderStatus => {
    return OrderStatus == 'CREATED' ? (
      <TouchableOpacity
        onPress={() => {
          CancelMyOrder('CANCEL');
        }}>
        <View style={globalstyle.FooterTabButton}>
          <Text style={globalstyle.FooterTabText}> Cancel Order</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  const ImageDynamic = Data => {
    console.log('ImageDynamic', Data.length);
    let ImgUrl = '';
    if (Data.length > 0) {
      ImgUrl = ConfigFile.ImageBaseUrl + Data[0].path;
    } else {
      ImgUrl =
        'data:image/png;base64,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';
    }
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: ImgUrl}} //Change your icon image here
          style={[styles.ProductImage]}
        />
      </View>
    );
  };
  //ConfigFile.ImageBaseUrl + value.meta.photos[0].path
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  console.log('orderdetail length==', data.length);

  if (data.length > 0) {
    return (
      <View style={styles.container}>
        {/*------------BACK BUTTON START------------------*/}
        <View style={[globalstyle.BackButton, {marginTop: 30}]}>
          <TouchableOpacity onPress={() => handleBackButtonClick()}>
            <View style={{flex: 0.4, marginRight: 20}}>
              <FontAwesome
                name="arrow-left"
                color={globalcolor.PrimaryColor}
                size={20}
              />
            </View>
          </TouchableOpacity>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                color: globalcolor.PrimaryColor,
                fontFamily: globalcolor.Font,
                fontSize: 20,
              }}>
              Order Details
            </Text>
          </View>
        </View>
        {/*------------BACK BUTTON END------------------*/}
        <ScrollView>
          <SafeAreaView>
            <View style={{flex: 1, padding: 20}}>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 20,
                  fontFamily: globalcolor.Font,
                }}>
                Order ID#:{probs.route.params.orderId}
              </Text>
            </View>
            <View
              style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#C8C8C8',
              }}
            />
            <View style={styles.OTPContainer}>
              <View style={{flex: 0.5}}>
                <Text style={styles.OtpText}>Store name: </Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>
                  {data[0].pickupDetails.name}
                </Text>
              </View>
            </View>

            <View style={styles.OTPContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.OtpText}>{DelivryType}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{textAlign: 'right'}}>
                  {data[0].pickupDetails.name}
                  {data[0].pickupDetails.address}
                  {data[0].pickupDetails.phoneNumber}
                </Text>
              </View>
            </View>

            <View style={styles.OTPContainer}>
              <View style={{flex: 0.5}}>
                <Text style={styles.OtpText}>Name</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{textAlign: 'right'}}>
                  {data[0].user.firstName} {data[0].user.lastName}
                </Text>
              </View>
            </View>
            <View style={styles.OTPContainer}>
              <View style={{flex: 0.5}}>
                <Text style={styles.OtpText}>Email Id</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{textAlign: 'right'}}>{data[0].user.email}</Text>
              </View>
            </View>
            <View style={styles.OTPContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.OtpText}>Mobile Number</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{textAlign: 'right'}}>{data[0].user.mobile}</Text>
              </View>
            </View>

            <View style={styles.OTPContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.OtpText}>Created At</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{textAlign: 'right'}}>
                  {' '}
                  {Moment(data[0].events[0].createdAt).format(
                    'DD MMM YYYY hh:mm',
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.OTPContainer}>
              <View style={{flex: 0.5}}>
                <Text style={styles.OtpText}>Order Amount</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>
                  {' '}
                  ₹ {data[0].pricing.customerToPay}
                </Text>
              </View>
            </View>
            <View style={styles.OTPContainer}>
              <View style={{flex: 0.5}}>
                <Text style={styles.OtpText}>Payment Type</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>{data[0].paymentType}</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                height: 0.5,
                width: '100%',
                backgroundColor: '#C8C8C8',
              }}
            />
            {Items.map((value, index) => (
              <View key={index}>
                <View style={[styles.OTPContainer]} key={index}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.OtpText,
                        {color: globalcolor.PrimaryColor},
                      ]}>
                      {value.meta.productName}
                    </Text>
                    <Text style={{fontFamily: globalcolor.Font, padding: 10}}>
                      {' '}
                      {value.quantity} X ₹ {value.meta.variant.sellingPrice}{' '}
                    </Text>
                  </View>
                  {ImageDynamic(value.meta.photos)}
                </View>
                <View
                  style={{
                    marginTop: 20,
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                  }}
                />
              </View>
            ))}
          </SafeAreaView>
        </ScrollView>
        {CancelOrder(data[0].orderState)}
      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color={globalcolor.PrimaryColor}
          style={{
            marginTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    );
  }
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    // flexDirection:'row',
    flex: 1,
  },
  OTPContainer: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    flexDirection: 'row',
  },

  OtpImage: {
    height: 100,
    width: 250,
    alignSelf: 'center',
  },
  OtpText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: globalcolor.Font,
    color: '#000',
  },
  OTPtextInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: 40,
    textAlign: 'center',
    fontSize: 20,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  signIn: {
    marginTop: 70,
    width: '100%',
    height: 40,
    //paddingLeft:40,
    //paddingRight:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontFamily: globalcolor.Font,
    // fontWeight: 'bold'
  },
  ProductImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
    //alignItems: 'flex-end',
    //alignContent: 'flex-end',
    alignSelf: 'flex-end',
  },
});
