import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ConfigFile} from '../service/ConfigFile';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import RadioForm from 'react-native-simple-radio-button';
import Option from './components/Option';
const RequestPayout = probs => {
  //console.log("==========All category==========");
  // console.log(probs.navigation.navigate);
  const [loading, setLoading] = useState(false);
  const [Token, SetToken] = useState('');
  const [data, setData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [UserAccount, SetUserAccount] = useState('');
  const [cashBalance, SetcashBalance] = useState(0);
  const [Payoutcalculate, SetPayoutcalculate] = useState({
    serviceCharge: 0,
    instantCharge: 0,
    fee: 0,
    gst: 0,
    tds: 0,
    finalAmount: 0,
    amountToBeSettled: 0,
  });
  const [settlementSpeed, SETsettlementSpeed] = useState('INSTANT');
  const [WithDrawAmount, SetWithDrawAmount] = useState(0);

  const radio_props = [
    {label: 'Instant ', value: 'INSTANT'},
    {label: 'Normal ', value: 'NORMAL'},
  ];
  useEffect(() => {
    async function fetchMyAPI() {
      //SetRequestAmount(100);
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        SetToken(userToken);
        // SetWithDrawAmount(100);
        FetachReferalNetwork(userToken);
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, []);

  const FetachReferalNetwork = userToken => {
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    };
    console.log('requestOptions..', requestOptions);
    WebService.PostData('customer/settlement?limit=1000&skip=0', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        setData(resJson);
        //console.log('Payout data..', JSON.stringify(resJson));
      })
      .catch(e => console.log(e));
    WebService.PostData('me', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        setUserData(resJson);
        console.log('accountNumber...', resJson.user.bankAccount.accountNumber);
        SetUserAccount(resJson.user.bankAccount.accountNumber);
        SetcashBalance(resJson.user.cashBalance.toFixed(2));
        console.log('Payout data..', JSON.stringify(resJson));
      })
      .catch(e => console.log(e));
  };
  const handleBackButtonClick = () => {
    console.log('Back buttton............', probs.navigation);
    probs.navigation.goBack();
    return true;
  };
  const FunsettlementSpeed = val => {
    SETsettlementSpeed(val);
    CalculateThePayout(WithDrawAmount, val);
  };
  const createAlert = () =>
    Alert.alert(' Success ', 'The payout request is successfully accepted', [
      {
        text: 'OK',
        onPress: () => {
          probs.navigation.goBack();
        },
      },
    ]);
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
  const IsPremiumUser = Status => {
    let StatusCode = '';
    let ColorBorder = '';
    let Colortext = '';
    if (Status == 'PROCESSED') {
      StatusCode = Status;
      ColorBorder = globalcolor.SuccessLight;
      Colortext = globalcolor.Successcolor;
    } else if (Status == 'INITIATED') {
      StatusCode = Status;
      ColorBorder = globalcolor.ProgessColorLight;
      Colortext = globalcolor.ProgessColor;
    } else if (Status == 'PENDING') {
      StatusCode = Status;
      ColorBorder = globalcolor.ProgessColorLight;
      Colortext = globalcolor.ProgessColor;
    } else if (Status == 'REFUNDED') {
      StatusCode = Status;
      ColorBorder = globalcolor.LightError;
      Colortext = globalcolor.Errorcolor;
    } else {
    }

    return (
      <View style={{padding: 1, borderWidth: 1, borderColor: ColorBorder}}>
        <Text
          style={{
            fontFamily: globalcolor.Font,
            color: Colortext,
            textAlign: 'center',
          }}>
          {StatusCode}
        </Text>
      </View>
    );
  };
  const TillDate = data => {
    if (data.hasOwnProperty('endDate')) {
      return (
        <Text style={{padding: 2, textAlign: 'center'}}>
          {Moment(data.endDate).format('DD MMM YYYY')}{' '}
        </Text>
      );
    }
    // return (
    //     data.length > 0 ?

    //         <Text >56456445</Text>

    //         : null
    // )
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
  const textInputChange = val => {
    SetWithDrawAmount(val);
    //CalculateThePayout(val);
    CalculateThePayout(val, settlementSpeed);
  };
  const CalculateThePayout = (val, settlementSpeed) => {
    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },
      body: JSON.stringify({
        requestedAmount: val,
        settlementSpeed: settlementSpeed,
      }),
    };
    console.log('requestOptions......', requestOptions);
    WebService.PostData('customer/settlement/calculate', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        SetPayoutcalculate(resJson);
        console.log('payout calculate....', JSON.stringify(resJson));
      })
      .catch(e => console.log(e));
  };

  // const ConfirmPayoutRequest = () => {
  //     console.log('Call Me.....')
  // }
  const instantChargeFun = val => {
    return val > 0 ? (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
          marginTop: 20,
          marginRight: 5,
          borderRadius: 10,
        }}>
        <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
          <Text>Instant Charge (-)</Text>
        </View>
        <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
          <Text style={{textAlign: 'right'}}>₹ {val} </Text>
        </View>
      </View>
    ) : null;
  };
  const ConfirmButoon = (val, settlementSpeed) => {
    return val >= 100 ? (
      <TouchableOpacity
        onPress={() => {
          ConfirmPayoutRequest(val, settlementSpeed);
        }}>
        <View style={globalstyle.FooterTabButton}>
          <Text style={globalstyle.FooterTabText}>Confirm</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };
  const ConfirmPayoutRequest = (WithDrrawAmount, Type) => {
    console.log('WithDrrawAmount...', WithDrrawAmount);
    console.log('Type..', Type);
    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },
      body: JSON.stringify({
        requestedAmount: WithDrrawAmount,
        settlementSpeed: Type,
      }),
    };
    console.log('requestOptions......', requestOptions);
    WebService.PostData('customer/settlement', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        // SetPayoutcalculate(resJson);
        console.log('settlement request..', JSON.stringify(resJson));
        createAlert();
      })
      .catch(e => console.log(e));
  };

  const settlementSpeedMsg = type => {
    return type == 'INSTANT' ? (
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          borderColor: globalcolor.AlertBorder,
          backgroundColor: globalcolor.AlertBackground,
          borderWidth: 1,
          padding: 10,
        }}>
        <Text>
          With Instant Payouts, get money settled to your bank account in a few
          seconds, even during non-banking hours and weekends
        </Text>
      </View>
    ) : (
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          borderColor: globalcolor.AlertBorder,
          backgroundColor: globalcolor.AlertBackground,
          borderWidth: 1,
          padding: 10,
        }}>
        <Text>Your money will be transferred in T+2 day.</Text>
      </View>
    );
  };

  const CheckMoreThanLimit = val => {
    return val >= 100 ? (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 20,
            marginRight: 5,
            borderRadius: 10,
          }}>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text>Account Number</Text>
          </View>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text style={{textAlign: 'right'}}>{UserAccount}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 20,
            marginRight: 5,
            borderRadius: 10,
          }}>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text>Requested Amount</Text>
          </View>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text style={{textAlign: 'right'}}> ₹ {WithDrawAmount}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 20,
            marginRight: 5,
            borderRadius: 10,
          }}>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text>Service Charge @5% of ₹ {WithDrawAmount} (-)</Text>
          </View>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text style={{textAlign: 'right'}}>
              ₹ {Payoutcalculate.serviceCharge}{' '}
            </Text>
          </View>
        </View>
        {instantChargeFun(Payoutcalculate.instantCharge)}
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 20,
            marginRight: 5,
            borderRadius: 10,
          }}>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text>Tax (-)</Text>
          </View>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text style={{textAlign: 'right'}}>₹ {Payoutcalculate.gst}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 20,
            marginRight: 5,
            borderRadius: 10,
          }}>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text>Final Amount</Text>
          </View>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text style={{textAlign: 'right'}}>
              ₹ {Payoutcalculate.finalAmount}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 20,
            marginRight: 5,
            borderRadius: 10,
          }}>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text>TDS @ 5% of ₹ {Payoutcalculate.finalAmount} (-)</Text>
          </View>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text style={{textAlign: 'right'}}>₹ {Payoutcalculate.tds}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 20,
            marginBottom: 20,
            marginRight: 5,
            borderRadius: 10,
          }}>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: globalcolor.Font,
                fontWeight: 'bold',
              }}>
              Amount to receive
            </Text>
          </View>
          <View style={{flex: 0.5, marginLeft: 5, marginRight: 5}}>
            <Text
              style={{
                textAlign: 'right',
                fontSize: 18,
                fontFamily: globalcolor.Font,
                fontWeight: 'bold',
              }}>
              ₹ {Payoutcalculate.amountToBeSettled}
            </Text>
          </View>
        </View>
      </View>
    ) : null;
  };

  const renderItemComponent = data => {
    console.log('payout Items..', data);

    return (
      <TouchableOpacity>
        <View style={styles.ListCategoryrow}>
          <View style={styles.ListFirstCategoryIcon}>
            <Text style={{textAlign: 'left'}}>{data.item.requestedAmount}</Text>
            {/* <Text>{value.email}</Text> */}
          </View>

          <View style={{flex: 0.3, alignSelf: 'center'}}>
            <Text style={{textAlign: 'left'}}>
              {' '}
              {Moment(data.item.createdAt).format('DD MMM YYYY')}
            </Text>
          </View>
          <View style={{flex: 0.3, alignSelf: 'center'}}>
            {IsPremiumUser(data.item.status)}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return data.length > 0 ? (
    <SafeAreaView style={styles.container}>
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
            Request Payout
          </Text>
        </View>
      </View>
      {/*------------BACK BUTTON END------------------*/}
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
              borderColor: globalcolor.PrimaryColor,
            }}>
            <View style={{flex: 0.5, padding: 20}}>
              <Text style={{fontFamily: globalcolor.Font}}>
                Available Balance
              </Text>
              <Text
                style={{
                  fontFamily: globalcolor.Font,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                ₹ {cashBalance}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 20, marginLeft: 10, marginRight: 10}}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              selectedButtonColor={globalcolor.PrimaryColor}
              buttonColor={globalcolor.PrimaryColor}
              formHorizontal={true}
              onPress={value => {
                FunsettlementSpeed(value);
              }}
            />
          </View>
          {settlementSpeedMsg(settlementSpeed)}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 20,
              marginRight: 5,
              borderRadius: 10,
            }}>
            <View style={{flex: 1, marginLeft: 5, marginRight: 5}}>
              <Text>Enter amount to withdraw</Text>
              <TextInput
                placeholder="Amount"
                keyboardType="number-pad"
                style={styles.InputText}
                placeholderTextColor="#666666"
                onChangeText={val => textInputChange(val)}
              />
            </View>
          </View>

          {CheckMoreThanLimit(WithDrawAmount)}
        </View>
      </ScrollView>
      {ConfirmButoon(WithDrawAmount, settlementSpeed)}
    </SafeAreaView>
  ) : (
    <View style={globalstyle.ActivityContainer}>
      {ActivityIndicatorShow()}
      <Text style={globalstyle.ActivityIndicator}>Loading please wait....</Text>
    </View>
  );
};

export default RequestPayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
  },

  ListBodyCategory: {
    flex: 0.3,
    alignSelf: 'center',
    textAlignVertical: 'center',
    padding: 20,
  },
  ListFirstCategoryIcon: {
    flex: 0.3,
    marginLeft: 10,
    // backgroundColor: globalcolor.Separator,
    shadowColor: '#fff',
    padding: 20,
  },
  ListSecondIcon: {
    alignSelf: 'flex-end',
    flex: 0.3,
    padding: 20,
  },
  ListCategoryrow: {
    flexDirection: 'row',
    borderBottomWidth: 1,

    borderBottomColor: globalcolor.Separator,
  },
  ListText: {
    fontFamily: globalcolor.Font,
    color: '#000',
    textAlign: 'center',

    //  color: globalcolor.SeconderFontColor
  },
  InputText: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: globalcolor.Separator,
  },
});
