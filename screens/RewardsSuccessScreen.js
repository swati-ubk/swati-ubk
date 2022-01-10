import React, {useState, useEffect} from 'react';
import {
  BackHandler,
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConfigFile} from '../service/ConfigFile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const RewardsSuccessScreen = probs => {
  //console.log("phone number=====" + probs.route.params.data.mobile);

  /// console.log('Successprobs', probs.route.params.data);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [Orderdata, SetOrdedata] = useState(probs.route.params.OrderData);
  const [StatusCode, SetStatusCode] = useState('');
  const [StatusColor, SetStatusColor] = useState('');

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let keys = [];
        try {
          keys = await AsyncStorage.getAllKeys();
        } catch (e) {
          // read key error
        }
        // console.log('All Keys..', keys);
        keys.forEach(element => {
          //console.log('key====', element);
          if (element != 'user' && element != 'userToken') {
            AsyncStorage.removeItem(element);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }

    console.log('Orderdata...', JSON.stringify(Orderdata));

    // let Status = Orderdata.result.status;

    // if (Status == 'COMPLETE') {
    //     SetStatusCode('DELIVERED');
    //     // SetStatusColor(globalcolor.Successcolor);

    // } else if (Status == 'PROCESSING') {
    //     SetStatusCode('IN PROCESS');
    //     // SetStatusColor(globalcolor.ProgessColor);
    // }
    // else {
    //     SetStatusCode('WAITING TO ACCEPT');
    //     // SetStatusColor(globalcolor.PrimaryColor);

    // }

    fetchMyAPI();

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const ImageDynamic = Data => {
    console.log('ImageDynamic', ConfigFile.ImageBaseUrl + Data[0].path);
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
  const CancelOrder = OrderStatus => {
    return OrderStatus == 'CREATED' ? (
      <TouchableOpacity
      // onPress={() => { this.props.navigation.navigate('ProductListScreen', { StoreId: this.props.route.params.StoreId, acceptsCOD: acceptsCOD, requireSlot: requireSlot }) }}
      >
        <View style={globalstyle.FooterTabButton}>
          <Text style={globalstyle.FooterTabText}> Cancel Order</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  // const ActivityIndicatorShow = () => {
  //     return (
  //         <View >
  //             {loading ? (
  //                 <ActivityIndicator
  //                     size="large"
  //                     color={globalcolor.PrimaryColor}
  //                     style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}

  //                 />
  //             ) : null}
  //         </View>
  //     )
  // }

  return (
    <View style={styles.container}>
      {/*------------BACK BUTTON START------------------*/}

      {/*------------BACK BUTTON END------------------*/}
      <ScrollView>
        <SafeAreaView>
          <View>
            <Image
              source={require('../assets/img/checkmark.gif')} //Change your icon image here
              style={styles.OtpImage}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                textAlign: 'center',
                color: globalcolor.Successcolor,
                fontSize: 16,
              }}>
              {' '}
              Congratulations! Your order is successful
            </Text>
          </View>

          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text>Order ID</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>
                {Orderdata.orders[0].orderId}
              </Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text>Ordered At</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>
                {Moment(Orderdata.orders[0].createdAt).format(
                  'DD MMM YYYY hh:mm',
                )}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text>Delivery Address</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>
                {Orderdata.orders[0].address.name}
              </Text>
              <Text style={{textAlign: 'right'}}>
                {Orderdata.orders[0].address.mobileNo}
              </Text>
              <Text style={{textAlign: 'right'}}>
                {Orderdata.orders[0].address.locality}
              </Text>
              <Text style={{textAlign: 'right'}}>
                {Orderdata.orders[0].address.address}
              </Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 1}}>
              <Text>
                <Image
                  source={{uri: 'https://diskounto.com/common/reward-coin.png'}}
                  style={{marginLeft: 5, marginRight: 5, width: 20, height: 20}}
                />
                Price In Coin
              </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>
                {Orderdata.orders[0].totalPriceInCoins}
              </Text>
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
          {Orderdata.orders[0].products.map((value, index) => (
            <View key={index}>
              <View style={[styles.OTPContainer]}>
                <View style={{flex: 1}}>
                  <Text
                    style={[styles.OtpText, {color: globalcolor.PrimaryColor}]}>
                    {value.productName}
                  </Text>
                  <Text style={{fontFamily: globalcolor.Font, padding: 10}}>
                    {' '}
                    {value.quantity} X ₹ {value.priceInCoins}{' '}
                  </Text>
                </View>

                {ImageDynamic(value.photos)}
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
      {CancelOrder(Orderdata.orders[0].orderState)}
    </View>
  );
};
export default RewardsSuccessScreen;

const styles = StyleSheet.create({
  container: {
    // flexDirection:'row',
    flex: 1,
    marginTop: 50,
  },
  OTPContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: 'row',
  },

  OtpImage: {
    height: 100,
    width: 250,
    alignSelf: 'center',
  },
  OtpText: {
    // marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: globalcolor.Font,
    color: globalcolor.PrimaryColor,
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
