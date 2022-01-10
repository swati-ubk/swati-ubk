import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ConfigFile} from '../service/ConfigFile';
import * as Animatable from 'react-native-animatable';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const ProfileScreen = ({navigation}) => {
  const [image, setImage] = useState(
    'data:image/png;base64,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',
  );
  const [CoverImage, SetCoverImage] = useState(
    'data:image/png;base64,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',
  );
  const [ChooseType, SetChooseType] = useState('');
  const [Token, SetToken] = useState('');
  const [UserData, SetUserData] = useState('');
  const [Verified, SetVerified] = useState('check-circle');
  const [Unverified, SetUnverified] = useState('x-circle');
  const [loading, Setloading] = useState(false);
  const [data, setData] = useState({
    check_textInputChange: true,
    check_textInputChangeLastName: false,
    secureTextEntry: true,
    check_textInputMobile: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    confirm_secureTextEntry: true,
    invalidRefererror: true,
    isValidrefercode: false,
  });

  function handleBackButtonClick() {
    console.log(navigation);
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        let userdata = await AsyncStorage.getItem('user');

        SetToken(userToken);
        SetUserData(...UserData, JSON.parse(userdata));
        let alldata = JSON.parse(userdata);
        console.log('All data......', alldata);

        setImage(ConfigFile.ImageBaseUrl + alldata.profilePic.path);
        SetCoverImage(ConfigFile.ImageBaseUrl + alldata.coverPic.path);

        // setImage(ConfigFile.ImageBaseUrl+alldata.profilePic.path);
        console.log(
          'profilePic.....',
          ConfigFile.ImageBaseUrl + alldata.profilePic.path,
        );
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, []);
  const textInputChangeFirstname = val => {
    if (val.length >= 3) {
      SetUserData({...UserData, firstName: val});
      setData({...data, check_textInputChange: true});
    } else {
      SetUserData({...UserData, firstName: val});
      setData({...data, check_textInputChange: false});
    }
    console.log(UserData);
  };
  const textInputChangeLastname = val => {
    if (val.length >= 3) {
      SetUserData({...UserData, lastName: val});
    } else {
      SetUserData({...UserData, lastName: val});
    }
  };
  const handlemobilenumberChanger = val => {
    if (val.length == 10) {
      SetUserData({...UserData, mobile: val});
    } else {
      SetUserData({...UserData, mobile: val});
    }
  };
  const handleGenderchange = val => {
    if (val.length > 0) {
      SetUserData({...UserData, gender: val});
    } else {
      SetUserData({...UserData, gender: val});
    }
  };
  const handleEmailChanger = val => {
    if (val.length > 0) {
      SetUserData({...UserData, email: val});
    } else {
      SetUserData({...UserData, email: val});
    }
  };
  const textInputDateofbirth = val => {
    if (val.length > 0) {
      SetUserData({...UserData, dateOfBirth: val});
    } else {
      SetUserData({...UserData, dateOfBirth: val});
    }
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

  const uploadImage = async response => {
    console.log(
      'ChooseType......',
      ConfigFile.BaseUrl + `upload?mode=${ChooseType}`,
    );
    Setloading(true);
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
      console.log('DONE', xhr.status);
      console.log('RESPONSE', xhr);
      console.log('Image Path', xhr._response);
      let ResponseData = JSON.parse(xhr._response);
      let requestOptions = {};
      if (ChooseType == 'account-image') {
        requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + Token,
          },
          body: JSON.stringify({profilePic: [ResponseData]}),
        };
      } else {
        requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + Token,
          },
          body: JSON.stringify({coverPic: [ResponseData]}),
        };
      }

      console.log('requestOptions....', requestOptions);

      WebService.PostData('profile', requestOptions)
        .then(res => res.json())
        .then(resJson => {
          Setloading(false);

          console.log('profile update return data......', resJson);
          if (ChooseType == 'account-image') {
            setImage(ConfigFile.ImageBaseUrl + ResponseData.path);
          } else {
            SetCoverImage(ConfigFile.ImageBaseUrl + ResponseData.path);
          }

          UpdateUserData(resJson);
        })
        .catch(e => console.log(e));
    };

    xhr.send(formData);
  };

  const UpdateProfile = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },
      body: JSON.stringify({
        firstName: UserData.firstName,
        lastName: UserData.lastName,
        email: UserData.email,
        mobile: UserData.mobile,
        gender: UserData.gender,
        dateOfBirth: UserData.dateOfBirth,
      }),
    };
    WebService.PostData('profile', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        console.log('profile updated---', resJson);
        //{"errors": [{"code": "INVALID_DOB", "type": "INVALID", "userMessage": "Please select a valid date of birth"}]}
        // if(resJson)
        if (resJson.hasOwnProperty('errors')) {
          if (resJson.errors[0].type == 'INVALID') {
            Alert.alert('Wrong Input!', '' + resJson.errors[0].userMessage, [
              {text: 'Okay'},
            ]);
          }
        } else {
          Alert.alert('Success!', 'Profile has been Updated', [{text: 'Okay'}]);
          UpdateUserData(resJson);
        }
      })
      .catch(e => console.log(e));
  };
  async function UpdateUserData(userData) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData.user));
      console.log('updated in localstroge');
    } catch (e) {
      console.log(e);
    }
  }
  const takePhotoFromCamera = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        if (ChooseType == 'account-image') {
          setImage(response.assets[0].uri);
        } else {
          SetCoverImage(response.assets[0].uri);
        }

        this.bs.current.snapTo(1);
        uploadImage(response.assets[0]);
      }
    });
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

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  this.bs = React.createRef();
  this.fall = new Animated.Value(1);

  //render() {
  const ActivityIndicatorShow = () => {
    return (
      <View style={loading ? styles.Profilebackground : null}>
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
        ) : (
          <View>
            <Image
              source={{uri: image}} //Change your icon image here
              style={[globalstyle.avaterProfileImage]}
            />
            <FontAwesome name="camera" size={26} style={styles.chooseimage} />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={globalstyle.container}>
      {/*------------BACK BUTTON START------------------*/}
      <View style={[globalstyle.BackButton, {marginTop: 40}]}>
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
            My Profile
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
          <View>
            <View style={styles.profile}>
              <View style={styles.coverbackground}>
                <TouchableOpacity
                  onPress={() => OpenFooterpopup('account-cover-image')}>
                  <View style={globalstyle.coverphoto}>
                    <Image
                      source={{uri: CoverImage}} //Change your icon image here
                      style={globalstyle.Coverimage}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    marginTop: 40,
                    alignSelf: 'center',
                  }}
                  onPress={() => OpenFooterpopup('account-image')}>
                  {ActivityIndicatorShow()}
                </TouchableOpacity>
              </View>

              <View style={[styles.action, {marginTop: 40}]}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '92%'}}>
                    <Text style={globalstyle.TextLabel}>First Name</Text>
                    <TextInput
                      placeholder="First name"
                      returnKeyType={'next'}
                      autoFocus={true}
                      placeholder="First Name"
                      autoCapitalize="none"
                      style={globalstyle.textbox}
                      onChangeText={val => textInputChangeFirstname(val)}
                      value={UserData.firstName}
                      // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                  </View>
                  <View style={{width: '8%', marginTop: 40}}>
                    {data.check_textInputChange ? (
                      <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="green" size={20} />
                      </Animatable.View>
                    ) : (
                      <Animatable.View animation="bounceIn">
                        <Feather name="x-circle" color="red" size={20} />
                      </Animatable.View>
                    )}
                  </View>
                  {/* <View style={{marginTop:40}}>
                       <Text>icon here</Text>
                     </View> */}
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '100%'}}>
                    <Text style={globalstyle.TextLabel}>Last Name</Text>
                    <TextInput
                      returnKeyType={'next'}
                      autoFocus={true}
                      placeholder="Last Name"
                      placeholderTextColor={globalcolor.PlaceHolderColor}
                      autoCapitalize="none"
                      style={globalstyle.textbox}
                      onChangeText={val => textInputChangeLastname(val)}
                      value={UserData.lastName}
                      // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                  </View>
                  {/* <View style={{marginTop:40}}>
                       <Text>icon here</Text>
                     </View> */}
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '92%'}}>
                    <Text style={globalstyle.TextLabel}>Date of Birth</Text>
                    <TextInput
                      returnKeyType={'next'}
                      autoFocus={true}
                      placeholder="Date of Birth"
                      placeholderTextColor={globalcolor.PlaceHolderColor}
                      autoCapitalize="none"
                      style={globalstyle.textbox}
                      value={UserData.dateOfBirth}
                      onChangeText={val => textInputDateofbirth(val)}
                      // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                  </View>
                  <View style={{marginTop: 40}}>
                    <FontAwesome
                      name="calendar"
                      size={25}
                      color={globalcolor.PrimaryColor}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '100%'}}>
                    <Text style={globalstyle.TextLabel}>Gender</Text>
                    <TextInput
                      returnKeyType={'next'}
                      autoFocus={true}
                      placeholder="Male"
                      placeholderTextColor={globalcolor.PlaceHolderColor}
                      autoCapitalize="none"
                      style={globalstyle.textbox}
                      onChangeText={val => handleGenderchange(val)}
                      value={UserData.gender}
                      // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                  </View>
                  {/* <View style={{marginTop:40}}>
                       <Text>icon here</Text>
                     </View> */}
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '92%'}}>
                    <Text style={globalstyle.TextLabel}>Email address</Text>
                    <TextInput
                      returnKeyType={'next'}
                      autoFocus={true}
                      placeholder="Email id"
                      placeholderTextColor={globalcolor.PlaceHolderColor}
                      autoCapitalize="none"
                      style={globalstyle.textbox}
                      onChangeText={val => handleEmailChanger(val)}
                      value={UserData.email}
                      editable={false}
                      // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                  </View>
                  <View style={{marginTop: 40}}>
                    <Animatable.View animation="bounceIn">
                      <Feather
                        name={UserData.emailVerified ? Verified : Unverified}
                        color={
                          UserData.emailVerified
                            ? globalcolor.Successcolor
                            : globalcolor.Errorcolor
                        }
                        size={20}
                      />
                    </Animatable.View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '92%'}}>
                    <Text style={globalstyle.TextLabel}>Phone Number</Text>
                    <TextInput
                      returnKeyType={'next'}
                      autoFocus={true}
                      placeholder="985858555"
                      placeholderTextColor={globalcolor.PlaceHolderColor}
                      autoCapitalize="none"
                      style={globalstyle.textbox}
                      onChangeText={val => handlemobilenumberChanger(val)}
                      value={UserData.mobile}
                      editable={UserData.mobileVerified ? false : true}
                      // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                  </View>
                  <View style={{marginTop: 40}}>
                    <Feather
                      name={UserData.mobileVerified ? Verified : Unverified}
                      color={
                        UserData.mobileVerified
                          ? globalcolor.Successcolor
                          : globalcolor.Errorcolor
                      }
                      size={20}
                    />

                    {/* <FontAwesome name={UserData.mobileVerified?Verified:Unverified}  size={25} color={UserData.mobileVerified?globalcolor.Successcolor:globalcolor.Errorcolor } /> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      <TouchableOpacity
        //s  onPress={UpdateProfile()}
        onPress={() => UpdateProfile()}>
        <View style={globalstyle.FooterTabButton}>
          <Text style={globalstyle.FooterTabText}> Update Profile</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
//}

export default ProfileScreen;

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    alignItems: 'center',
    // marginTop: ,
    // justifyContent: 'center'
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
});
