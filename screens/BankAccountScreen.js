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
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import {ConfigFile} from '../service/ConfigFile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import WebService from '../service/WebService';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';

const BankAccountScreen = ({navigation}) => {
  const {colors} = useTheme();
  // console.log('settings.........',probs);
  const [BankStatement, setBankStatement] = useState(
    'data:image/png;base64,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',
  );
  const [PanImage, SetPanImage] = useState(
    'data:image/png;base64,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',
  );
  const [BanKStatenentData, SetBanKStatenentData] = useState({});
  const [PanImageData, SetPanImageData] = useState({});
  const [loading, Setloading] = useState(false);
  const [Token, SetToken] = useState(false);
  const [ChooseType, SetChooseType] = useState('');
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
    INVALID_ACCOUNT_NUMBER: false,
    INVALID_CONFIRM_ACCOUNT_NUMBER: false,
    INVALID_IFSC: false,
    INVALID_PAN: false,
    INVALID_BANK_STATEMENT: false,
    INVALID_PAN_DOCUMENT: false,
  });
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        Setloading(true);
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
            Setloading(false);
            console.log(
              'Bank Account details...............',
              resJson.user.bankAccount,
            );
            if (resJson.user.bankAccount.hasOwnProperty('status')) {
              if (
                resJson.user.bankAccount.status == 'APPROVED' ||
                resJson.user.bankAccount.status == 'PENDING'
              ) {
                //SetUserData(resJson.user.bankAccount);
                setData({
                  ...data,
                  status: resJson.user.bankAccount.status,
                  accountNumber: resJson.user.bankAccount.accountNumber,
                  ConfirmAccountNo: resJson.user.bankAccount.accountNumber,
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
  const takePhotoFromCamera = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        if (ChooseType == 'account-image') {
          setImage(response.assets[0].uri);
        } else {
          // SetCoverImage(response.assets[0].uri);
        }

        this.bs.current.snapTo(1);
        uploadImage(response.assets[0]);
      }
    });
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
  const choosePhotoFromLibrary = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        this.bs.current.snapTo(1);

        uploadImage(response.assets[0]);
      }
    });
  };
  this.bs = React.createRef();
  this.fall = new Animated.Value(1);
  const uploadImage = async response => {
    console.log(
      'ChooseType......',
      ConfigFile.BaseUrl + `upload?mode=${ChooseType}`,
    );
    // Setloading(true);
    console.log('upload function ----', response.uri);

    var photo = {
      uri: response.uri,
      type: 'image/jpeg',
      name: response.fileName,
    };
    var formData = new FormData();
    formData.append('file', photo);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', ConfigFile.BaseUrl + `upload?mode=${ChooseType}`);
    xhr.setRequestHeader('Authorization', 'Bearer ' + Token);

    xhr.onprogress = function () {
      console.log('LOADING', xhr.status);
    };

    xhr.onload = function () {
      console.log('DONE....', xhr.status);
      console.log('RESPONSE...', xhr);
      console.log('Image Path....', xhr._response);
      let ResponseData = JSON.parse(xhr._response);

      console.log('ResponseData', ResponseData);

      if (ChooseType == 'user-bank-statement') {
        SetBanKStatenentData(ResponseData);
        setBankStatement(ConfigFile.ImageBaseUrl + ResponseData.path);
      } else {
        SetPanImageData(ResponseData);
        SetPanImage(ConfigFile.ImageBaseUrl + ResponseData.path);
      }
    };

    xhr.send(formData);
  };

  const OpenFooterpopup = Choose => {
    SetChooseType(Choose);
    this.bs.current.snapTo(0);
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => takePhotoFromCamera()}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => choosePhotoFromLibrary()}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

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
        bankStatement: [BanKStatenentData],
        panDocument: [PanImageData],
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
          console.log('Invalid name....');
          setData({
            ...data,
            INVALID_ACCOUNT_NUMBER: true,
          });
          return false;
        }
        if (element.code == 'INVALID_CONFIRM_ACCOUNT_NUMBER') {
          console.log('Invalid name....');
          setData({
            ...data,
            INVALID_CONFIRM_ACCOUNT_NUMBER: true,
          });
          return false;
        }
        if (element.code == 'INVALID_IFSC') {
          console.log('Invalid name....');
          setData({
            ...data,
            INVALID_IFSC: true,
          });
          return false;
        }
        if (element.code == 'INVALID_CONFIRM_ACCOUNT_NUMBER') {
          console.log('Invalid name....');
          setData({
            ...data,
            INVALID_CONFIRM_ACCOUNT_NUMBER: true,
          });
          return false;
        }
        if (element.code == 'INVALID_IFSC') {
          console.log('Invalid name....');
          setData({
            ...data,
            INVALID_IFSC: true,
          });
          return false;
        }
        if (element.code == 'INVALID_PAN') {
          console.log('Invalid name....');
          setData({
            ...data,
            INVALID_PAN: true,
          });
          return false;
        }
        if (element.code == 'INVALID_BANK_STATEMENT') {
          console.log('Invalid name....');
          setData({
            ...data,
            INVALID_BANK_STATEMENT: true,
          });
          return false;
        }
        if (element.code == 'INVALID_PAN_DOCUMENT') {
          console.log('Invalid name....');
          setData({
            ...data,
            INVALID_PAN_DOCUMENT: true,
          });
          return false;
        }
      });
    } else {
      console.log('no errors...');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View>
          {ActivityIndicatorShow()}
          <Text style={globalstyle.ActivityIndicator}>
            Loading please wait....
          </Text>
        </View>
      ) : (
        <View>
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
            <BottomSheet
              ref={this.bs}
              snapPoints={[330, 0]}
              renderContent={this.renderInner}
              renderHeader={this.renderHeader}
              initialSnap={1}
              callbackNode={this.fall}
              enabledGestureInteraction={true}
            />
            <Animated.View
              style={{
                //```  margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
              }}>
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
                    editable={
                      data.status == 'APPROVED' || data.status == 'PENDING'
                        ? false
                        : true
                    }
                  />
                </View>
                {data.INVALID_ACCOUNT_NUMBER ? (
                  <Text style={[styles.errorMsg]}>
                    Please enter a valid account number
                  </Text>
                ) : null}
              </View>
              <View style={styles.Listheight}>
                <Text style={globalstyle.LableText}>
                  Confirm Account Number
                </Text>
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
                    editable={
                      data.status == 'APPROVED' || data.status == 'PENDING'
                        ? false
                        : true
                    }
                  />
                </View>
                {data.INVALID_CONFIRM_ACCOUNT_NUMBER ? (
                  <Text style={[styles.errorMsg]}>
                    Please confirm the account number. The account numbers must
                    match
                  </Text>
                ) : null}
              </View>
              <View style={styles.Listheight}>
                <Text style={globalstyle.LableText}>IFSC Code</Text>
                <View style={globalstyle.ListrowAccount}>
                  <TextInput
                    placeholder=""
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
                    editable={
                      data.status == 'APPROVED' || data.status == 'PENDING'
                        ? false
                        : true
                    }
                  />
                </View>
                {data.INVALID_IFSC ? (
                  <Text style={[styles.errorMsg]}>
                    Please enter a valid IFSC
                  </Text>
                ) : null}
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
                    editable={
                      data.status == 'APPROVED' || data.status == 'PENDING'
                        ? false
                        : true
                    }
                    onChangeText={val => handlePanNumber(val)}
                  />
                </View>
                {data.INVALID_PAN ? (
                  <Text style={[styles.errorMsg]}>
                    Please enter a valid IFSC
                  </Text>
                ) : null}
              </View>
              {data.status == 'APPROVED' ? (
                <View
                  style={[
                    styles.ApprovedMsg,
                    {borderColor: globalcolor.SuccessLight},
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
              ) : null}
              {data.status == 'PENDING' ? (
                <View
                  style={[
                    styles.ApprovedMsg,
                    {borderColor: globalcolor.Errorcolor},
                  ]}>
                  <Text style={{color: globalcolor.Errorcolor, fontSize: 20}}>
                    {' '}
                    <FontAwesome
                      name="times"
                      color={globalcolor.Errorcolor}
                      size={20}
                    />{' '}
                    Pending
                  </Text>
                </View>
              ) : null}
              {data.status == 'APPROVED' || data.status == 'PENDING' ? null : (
                <View style={[styles.Listheight]}>
                  <Text style={globalstyle.LableText}>Bank Statement</Text>
                  <TouchableOpacity
                    onPress={() => OpenFooterpopup('user-bank-statement')}>
                    <View
                      style={[
                        globalstyle.coverphoto,
                        {
                          marginLeft: 15,
                          marginRight: 15,
                          marginTop: 20,
                          height: 120,
                        },
                      ]}>
                      <ImageBackground
                        source={{uri: BankStatement}}
                        resizeMode="cover"
                        style={styles.Coverimage}></ImageBackground>
                      <Image
                        source={require('../assets/img/cloud-computing.png')} //Change your icon image here
                        style={[globalstyle.UploadIocn, {alignSelf: 'center'}]}
                      />
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontFamily: globalcolor.Font,
                        }}>
                        Upload Bank Statement
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.errorMsg,
                      data.INVALID_BANK_STATEMENT ? null : {display: 'none'},
                    ]}>
                    Please upload a bank statement or passbook front page
                    clearly stating your account number and name on it
                  </Text>
                </View>
              )}
              {data.status == 'APPROVED' || data.status == 'PENDING' ? null : (
                <View style={[styles.Listheight]}>
                  <Text style={globalstyle.LableText}>PAN Card Front</Text>
                  <TouchableOpacity
                    onPress={() => OpenFooterpopup('user-pan-card')}>
                    <View
                      style={[
                        globalstyle.coverphoto,
                        {
                          marginLeft: 15,
                          marginRight: 15,
                          marginTop: 20,
                          height: 120,
                        },
                      ]}>
                      <ImageBackground
                        source={{uri: PanImage}}
                        resizeMode="cover"
                        style={styles.Coverimage}></ImageBackground>
                      <Image
                        source={require('../assets/img/cloud-computing.png')} //Change your icon image here
                        style={[globalstyle.UploadIocn, {alignSelf: 'center'}]}
                      />
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontFamily: globalcolor.Font,
                        }}>
                        Upload PAN Card
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.errorMsg,
                      data.INVALID_PAN_DOCUMENT ? null : {display: 'none'},
                    ]}>
                    Please upload a bank statement or passbook front page
                    clearly stating your account number and name on it
                  </Text>
                </View>
              )}
            </Animated.View>
          </ScrollView>
          {data.status == 'APPROVED' || data.status == 'PENDING' ? null : (
            <TouchableOpacity
              onPress={() => {
                UpdateBankAccount();
              }}>
              <View style={globalstyle.FooterTabButton}>
                <Text style={globalstyle.FooterTabText}>Save</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
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
  },
  errorMsg: {
    marginLeft: 10,
    color: globalcolor.Errorcolor,
  },
  chooseimage: {
    alignItems: 'center',
    position: 'absolute',
    marginTop: 80,
    marginLeft: 80,
    color: globalcolor.PrimaryColor,
  },
  coverbackground: {
    // marginTop: 20,
    width: '100%',
  },

  action: {
    width: '90%',
    marginTop: 10,
    paddingBottom: 5,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    //marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },

  FooterTabButton: {
    backgroundColor: globalcolor.PrimaryColor,
    height: 20,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  Profilebackground: {
    backgroundColor: globalcolor.Separator,
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  Coverimage: {
    flex: 1,
    justifyContent: 'center',
    height: 116,
    borderRadius: 20,
  },
});
