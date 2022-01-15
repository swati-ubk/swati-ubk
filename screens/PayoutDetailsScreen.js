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
const PayoutDetailsScreen = probs => {
  //console.log("==========All category==========");
  console.log('PayoutDetailsScreen....', probs);
  // console.log(order)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [DelivryType, setDeliveryType] = useState('Delivery Address');
  const [Items, setItems] = useState([]);
  const [Token, SetToken] = useState('');

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        //     let userToken = await AsyncStorage.getItem('userToken');
        //     console.log('userToken.....', userToken);
        //     SetToken(userToken);
        //     const requestOptions = {
        //       method: 'GET',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: 'Bearer ' + userToken,
        //       },
        //       // body: JSON.stringify({ })
        //     };
        //     WebService.PostData(
        //       `my-orders/${probs.route.params.orderId}?limit=20&skip=0`,
        //       requestOptions,
        //     )
        //       .then(res => res.json())
        //       .then(resJson => {
        //         setItems(resJson[0].items);
        //         if (resJson[0].orderType == 'BOOM_PICKUP') {
        //           setDeliveryType('Pickup Address');
        //         }
        //         setData(resJson);
        //       })
        //       .catch(e => console.log(e));
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, []);

  function handleBackButtonClick() {
    //console.log(probs.navigation);
    probs.navigation.goBack();
    return true;
  }

  //   const CancelMyOrder = async Type => {
  //     //console.log('calling me.....');
  //     const requestOptions = {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + Token,
  //       },

  //       body: JSON.stringify({event: Type}),
  //     };
  //     const response = await WebService.PostData(
  //       `my-orders/${probs.route.params.orderId}`,
  //       requestOptions,
  //     );
  //     const json = await response.json();
  //     console.log('MyOrder Cancel...', json);
  //   };
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

  //ConfigFile.ImageBaseUrl + value.meta.photos[0].path

  // console.log('orderdetail length==', data.length);

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
            Payout Details
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
              Order ID#:25555225
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
              <Text style={{textAlign: 'right'}}>jkasdadhs</Text>
            </View>
          </View>

          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.OtpText}>Name</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>uttam</Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.OtpText}>Email Id</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>ubk@gmail.com</Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.OtpText}>Mobile Number</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>6200938310</Text>
            </View>
          </View>

          <View style={styles.OTPContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.OtpText}>Created At</Text>
            </View>
            <View style={{flex: 1}}>
              {/* <Text style={{textAlign: 'right'}}>
                  {' '}
                  {Moment(data[0].events[0].createdAt).format(
                    'DD MMM YYYY hh:mm',
                  )}
                </Text> */}
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.OtpText}>Order Amount</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}> ₹ 52222</Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.OtpText}>Payment Type</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>gfdggfdg</Text>
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
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default PayoutDetailsScreen;

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
