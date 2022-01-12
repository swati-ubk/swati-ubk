import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import {ConfigFile} from '../service/ConfigFile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from 'react-native-paper';
import WebService from '../service/WebService';
const BankAccountScreen = ({navigation}) => {
  const {colors} = useTheme();
  // console.log('settings.........',probs);
  const [Token, SetToken] = useState('');
  const [data, setData] = React.useState({
    accountNumber: '',
    ConfirmAccountNo: '',
    bankStatement: {
      path: '',
    },
    ifsc: '',
    message: '',
    pan: '',
    panDocument: {
      path: '',
    },
    status: '',
    INVALID_ACCOUNT_NUMBER: true,
    INVALID_CONFIRM_ACCOUNT_NUMBER: true,
    INVALID_IFSC: true,
    INVALID_PAN: true,
    INVALID_BANK_STATEMENT: true,
    INVALID_PAN_DOCUMENT: true,
  });

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
        WebService.PostData('me', requestOptions)
          .then(res => res.json())
          .then(resJson => {
            // return resJson;
            console.log(
              'Bank Account details...............',
              resJson.user.bankAccount.status,
            );
            if (resJson.user.bankAccount.hasOwnProperty('status')) {
              if (resJson.user.bankAccount.status == 'APPROVED') {
                //SetUserData(resJson.user.bankAccount);
                setData({
                  ...data,
                  status: 'APPROVED',
                  accountNumber: resJson.user.bankAccount.accountNumber,
                  ifsc: resJson.user.bankAccount.ifsc,
                  pan: resJson.user.bankAccount.pan,
                });
              } else {
              }
            } else {
              setData({
                ...data,
                status: '',
              });
            }
          })
          .catch(e => console.log(e));
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, []);

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  function handleBackButtonClick() {
    console.log(navigation);
    navigation.goBack();
    return true;
  }

  const handleaccountNumber = async val => {
    setData({
      ...data,
      accountNumber: val,
    });
  };
  const handleConfirmaccountNumber = async val => {
    setData({
      ...data,
      ConfirmAccountNo: val,
    });
  };
  const handlePanNumber = async val => {
    setData({
      ...data,
      pan: val,
    });
  };
  const handleIfsc = async val => {
    setData({
      ...data,
      ifsc: val,
    });
  };

  const UpdateBankAccount = async () => {
    // console.log('update bank account.......');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },
      body: JSON.stringify({
        accountNumber: data.accountNumber,
        confirmAccountNumber: data.ConfirmAccountNo,
        ifsc: data.ifsc,
        pan: data.pan,
      }),
    };

    console.log('updatebank Requestoption', requestOptions);
    const response = await WebService.PostData('bank-account', requestOptions);
    const resJson = await response.json();
    console.log('bank account update response....', resJson);
    if (resJson.hasOwnProperty('errors')) {
      resJson.errors.forEach(element => {
        //   console.log('element....', element);
        if (element.code == 'INVALID_ACCOUNT_NUMBER') {
          //console.log('Invalid name....');
          setData({
            ...data,
            INVALID_ACCOUNT_NUMBER: true,
          });
        }
        if (element.code == 'INVALID_IFSC') {
          setData({
            ...data,
            INVALID_IFSC: true,
          });
        }
        if (element.code == 'INVALID_BANK_STATEMENT') {
          setData({
            ...data,
            INVALID_BANK_STATEMENT: true,
          });
        }
        if (element.code == 'INVALID_PAN_DOCUMENT') {
          setData({
            ...data,
            INVALID_PAN_DOCUMENT: true,
          });
        }
      });
    } else {
      console.log('no errors...');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*------------BACK BUTTON START------------------*/}
      <View style={[globalstyle.BackButton]}>
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
            Bank Account
          </Text>
        </View>
      </View>
      {/*------------BACK BUTTON END------------------*/}
      <ScrollView>
        <View style={styles.Listheight}>
          <Text style={globalstyle.LableText}>Enter Account Number</Text>
          <View style={globalstyle.ListrowAccount}>
            <TextInput
              placeholder=""
              placeholderTextColor="#666666"
              //secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                globalstyle.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleaccountNumber(val)}
              value={data.accountNumber}
              editable={data.status == 'APPROVED' ? false : true}
            />
          </View>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_ACCOUNT_NUMBER ? null : {display: 'none'},
            ]}>
            Please enter a valid account number
          </Text>
        </View>
        <View style={styles.Listheight}>
          <Text style={globalstyle.LableText}>Confirm Account Number</Text>
          <View style={globalstyle.ListrowAccount}>
            <TextInput
              placeholder=""
              placeholderTextColor="#666666"
              //secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                globalstyle.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleConfirmaccountNumber(val)}
              value={data.ConfirmAccountNo}
              editable={data.status == 'APPROVED' ? false : true}
            />
          </View>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_CONFIRM_ACCOUNT_NUMBER ? null : {display: 'none'},
            ]}>
            Please confirm the account number. The account numbers must match
          </Text>
        </View>
        <View style={styles.Listheight}>
          <Text style={globalstyle.LableText}>IFSC Code</Text>
          <View style={globalstyle.ListrowAccount}>
            <TextInput
              placeholder="SBIN000558"
              placeholderTextColor="#666666"
              // secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                globalstyle.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleIfsc(val)}
              value={data.ifsc}
              editable={data.status == 'APPROVED' ? false : true}
            />
          </View>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_IFSC ? null : {display: 'none'},
            ]}>
            Please enter a valid IFSC
          </Text>
        </View>
        <View style={styles.Listheight}>
          <Text style={globalstyle.LableText}>PAN</Text>
          <View style={globalstyle.ListrowAccount}>
            <TextInput
              placeholder="PAN"
              placeholderTextColor="#666666"
              // secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                globalstyle.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              value={data.pan}
              editable={data.status == 'APPROVED' ? false : true}
              onChangeText={val => handlePanNumber(val)}
            />
          </View>
        </View>
        <View
          style={[
            styles.ApprovedMsg,
            data.status == 'APPROVED' ? null : {display: 'none'},
          ]}>
          <Text style={{color: globalcolor.Successcolor, fontSize: 20}}>
            {' '}
            <FontAwesome
              name="check-circle-o"
              color={globalcolor.Successcolor}
              size={20}
            />{' '}
            Approved
          </Text>
        </View>

        <View
          style={[
            styles.Listheight,
            data.status == 'APPROVED' ? {display: 'none'} : null,
          ]}>
          <Text style={globalstyle.LableText}>Bank Statement</Text>
          <TouchableOpacity
          // onPress={() => OpenFooterpopup('account-cover-image')}
          >
            <View
              style={[
                globalstyle.coverphoto,
                {marginLeft: 15, marginRight: 15, marginTop: 20, height: 120},
              ]}>
              <Image
                source={require('../assets/img/cloud-computing.png')} //Change your icon image here
                style={[globalstyle.UploadIocn, {alignSelf: 'center'}]}
              />
              <Text style={{alignSelf: 'center', fontFamily: globalcolor.Font}}>
                Upload Bank Statement
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_BANK_STATEMENT ? null : {display: 'none'},
            ]}>
            Please upload a bank statement or passbook front page clearly
            stating your account number and name on it
          </Text>
        </View>
        <View
          style={[
            styles.Listheight,
            data.status == 'APPROVED' ? {display: 'none'} : null,
          ]}>
          <Text style={globalstyle.LableText}>PAN Card Front</Text>
          <TouchableOpacity
          //onPress={() => OpenFooterpopup('account-cover-image')}
          >
            <View
              style={[
                globalstyle.coverphoto,
                {marginLeft: 15, marginRight: 15, marginTop: 20, height: 120},
              ]}>
              <Image
                source={require('../assets/img/cloud-computing.png')} //Change your icon image here
                style={[globalstyle.UploadIocn, {alignSelf: 'center'}]}
              />
              <Text style={{alignSelf: 'center', fontFamily: globalcolor.Font}}>
                Upload PAN Card
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_BANK_STATEMENT ? null : {display: 'none'},
            ]}>
            Please upload a bank statement or passbook front page clearly
            stating your account number and name on it
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          UpdateBankAccount();
        }}
        style={data.status == 'APPROVED' ? {display: 'none'} : null}>
        <View style={globalstyle.FooterTabButton}>
          <Text style={globalstyle.FooterTabText}> Save Changes</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BankAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
  },
  ShopTitle: {
    marginLeft: 20,
    fontFamily: globalcolor.Font,
    fontSize: 20,
    fontWeight: '400',
    color: globalcolor.SeconderFontColor,
  },
  Listheight: {
    marginTop: 10,
  },
  ApprovedMsg: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderColor: globalcolor.SuccessLight,
  },
  errorMsg: {
    marginLeft: 10,
    color: globalcolor.Errorcolor,
  },
});
