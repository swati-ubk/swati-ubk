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
  const [data, setData] = useState(probs.route.params.referencedata);
  const [DelivryType, setDeliveryType] = useState('Delivery Address');
  const [Items, setItems] = useState([]);
  const [UTRNo, SetUTRNo] = useState('');
  const [statusbardata, Setstatusbardata] = useState(
    probs.route.params.referencedata.events,
  );

  // const statusbardata = [
  //   {title: 'Stop 1', letter: 'A', isCurrent: false},
  //   {title: 'Stop 2', letter: 'B', isCurrent: true},
  //   {title: 'Stop 3', letter: 'C', isCurrent: false},
  //   {title: 'Stop 4', letter: 'D', isCurrent: false},
  //   {title: 'Stop 5', letter: 'E', isCurrent: true},
  // ];

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setData(probs.route.params.referencedata);
        Setstatusbardata(probs.route.params.referencedata.events);
        // Setstatusbardata(probs.route.params.referencedata)
        console.log('Payout details....', probs.route.params.referencedata);
        console.log(
          'Payout events....',
          probs.route.params.referencedata.events,
        );
        //if()
        if (probs.route.params.referencedata.hasOwnProperty('payout')) {
          SetUTRNo(probs.route.params.referencedata.payout.utr);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, [probs.route.params.referenceId]);

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
  const getSettlementStatusText = state => {
    switch (state) {
      case 'PENDING':
        return 'Approved';
      case 'INITIATED':
        return 'Sent to Bank';
      case 'PROCESSED':
        return 'Transferred';
      case 'FAILED':
        return 'Rejected by Bank';
      case 'REFUNDED':
        return 'Refunded';
      default:
        return '';
    }
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
            Payout Breakup
          </Text>
        </View>
      </View>
      {/*------------BACK BUTTON END------------------*/}
      <ScrollView>
        <SafeAreaView>
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
          <View style={styles.OTPContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.OtpText}>Reference ID: </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>{data.referenceId}</Text>
            </View>
          </View>

          <View style={styles.OTPContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.OtpText}>Speed</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>{data.speed}</Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.OtpText}>Requested Amount</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>{data.requestedAmount}</Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.OtpText}>Service Charge (-)</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>
                {data.data.serviceCharge}
              </Text>
            </View>
          </View>

          <View style={styles.OTPContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.OtpText}>Tax (-)</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}>{data.gst}</Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.OtpText}>TDS (-)</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}> ₹ {data.data.tds}</Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.OtpText}>Amount to Receive</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}> ₹ {data.amount}</Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.OtpText}>Requested At</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>
                <Text style={{textAlign: 'right'}}>
                  {' '}
                  {Moment(data.createdAt).format('DD MMM YYYY hh:mm')}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.OtpText}>UTR</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>{UTRNo}</Text>
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
          <View style={styles.OTPContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.OtpText}>Events</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                <View style={globalstyle.verticalLine}></View>
                <View style={globalstyle.verticalWrap}>
                  {/* <View style={globalstyle.itemWrap}>
                    <View style={globalstyle.firstPoint}></View>
                    <View style={{marginLeft: 5, flex: 1}}>
                      <Text>UTTAM</Text>
                    </View>
                  </View> */}
                  {statusbardata.map((item, index) => (
                    <View style={globalstyle.itemWrap} key={index}>
                      <View style={globalstyle.firstPoint}></View>
                      <View style={{marginLeft: 5, flex: 1}}>
                        <Text style={{marginTop: 15}}>
                          {getSettlementStatusText(item.event)}
                        </Text>
                        <Text style={{color: globalcolor.SeconderFontColor}}>
                          {' '}
                          {Moment(item.createdAt).format('DD MMM YYYY hh:mm')}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
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
