import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import WebService from '../service/WebService';
const SignInScreen = ({navigation}) => {
  // console.log(navigation);
  const [data, setData] = useState({
    username: '',
    lastname: '',
    password: '',
    confirm_password: '',
    mobile: '',
    email: '',
    Refercode: '',
    RefercodeSatus: '',
    check_textInputChange: true,
    check_textInputChangeLastName: true,
    secureTextEntry: true,
    check_textInputMobile: true,
    check_textInputEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    confirm_secureTextEntry: true,
    invalidRefererror: true,
    isValidrefercode: false,
    SinupValidate: false,
    ReferBy: '',
  });

  const [errormsg, setErrormsg] = useState('');
  const [ResponseError, setResponseError] = useState('');
  const textInputChange = val => {
    if (val.length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        SinupValidate: true,
      });

      return true;
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        SinupValidate: false,
      });
      return false;
    }
  };
  const textInputChangeLastname = val => {
    if (val.length >= 4) {
      setData({
        ...data,
        lastname: val,
        check_textInputChangeLastName: true,
        SinupValidate: true,
      });
      return true;
    } else {
      setData({
        ...data,
        lastname: val,
        check_textInputChangeLastName: false,
        SinupValidate: false,
      });
      return false;
    }
  };
  const handlemobilenumberChanger = val => {
    if (val.length == 10) {
      setData({
        ...data,
        mobile: val,
        check_textInputMobile: true,
        SinupValidate: true,
      });
      return true;
    } else {
      setData({
        ...data,
        mobile: val,
        check_textInputMobile: false,
        SinupValidate: false,
      });
      return false;
    }
  };
  const handlemailValidation = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setData({
        ...data,
        email: text,
        check_textInputEmail: false,
        SinupValidate: false,
      });
      return false;
    } else {
      setData({
        ...data,
        email: text,
        check_textInputEmail: true,
        SinupValidate: true,
      });
      return true;
    }
  };
  const handlePasswordChange = val => {
    if (val.length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
        SinupValidate: true,
      });
      return true;
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
        SinupValidate: false,
      });
      return false;
    }
  };

  const handleConfirmPasswordChange = val => {
    // console.log("password===="+data.password);
    //console.log("Confirm Password====="+val);
    if (data.password == val) {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const onChangeRefercode = val => {
    setData({
      ...data,
      Refercode: val,
    });
  };
  const checkPromcode = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({referCode: data.Refercode}),
    };
    console.log(requestOptions);

    WebService.PostData('verify/refer-code-user', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        console.log('Referdata...', resJson);
        if (resJson.hasOwnProperty('referrer')) {
          // console.log('vaild refer code');  isValidrefercode
          setData({
            ...data,
            isValidrefercode: true,
            invalidRefererror: true,
            RefercodeSatus: data.Refercode,
            ReferBy: resJson.referrer.name,
          });
        } else {
          setData({
            ...data,
            isValidrefercode: false,
            invalidRefererror: false,
            RefercodeSatus: '',
          });
        }
      })
      .catch(e => console.log(e));
  };
  // const validate = text => {
  //   console.log(text);
  //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //   if (reg.test(text) === false) {
  //     console.log('Email is Not Correct');
  //     this.setState({email: text});
  //     return false;
  //   } else {
  //     this.setState({email: text});
  //     console.log('Email is Correct');
  //   }
  // };
  const Signup = () => {
    if (data.SinupValidate) {
      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.username,
          lastName: data.lastname,
          email: data.email,
          mobile: data.mobile,
          password: data.password,
          referralCode: data.Refercode,
        }),
      };
      WebService.PostData('sign-up/initiate', requestOptions)
        .then(res => res.json())
        .then(resJson => {
          if (resJson.success) {
            navigation.navigate('OTPScreen', {
              data: data,
            });
          } else {
            console.log('Step1 Response', resJson.errors[0].userMessage);
            setErrormsg(resJson.errors[0].userMessage);
            setResponseError(resJson.errors[0].userMessage);
          }
        })
        .catch(e => console.log(e));
    } else {
      setErrormsg('! Ohh Please Complete All mandatory fields');
      //console.log('Singup..', data.SinupValidate);

      //
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fd7729" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
        <Text style={{color: globalcolor.Textcolor, marginTop: 10}}>
          {errormsg}
        </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.text_footer}>
            First Name <Text style={{color: globalcolor.Errorcolor}}>*</Text>
          </Text>
          <View style={styles.action}>
            {
              <FontAwesome
                name="user-o"
                color={globalcolor.PrimaryColor}
                size={20}
              />
            }
            <TextInput
              placeholder="Your First Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
          </View>
          {data.check_textInputChange ? null : (
            <Text style={globalstyle.errorMsg}>Enter a valid first name.</Text>
          )}
          <Text style={styles.text_footer}>
            Last Name <Text style={{color: globalcolor.Errorcolor}}>*</Text>
          </Text>
          <View style={styles.action}>
            {
              <FontAwesome
                name="user-o"
                color={globalcolor.PrimaryColor}
                size={20}
              />
            }
            <TextInput
              placeholder="Your Last Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChangeLastname(val)}
            />
          </View>
          {data.check_textInputChangeLastName ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={globalstyle.errorMsg}>Enter a valid last name</Text>
            </Animatable.View>
          )}
          <Text style={styles.text_footer}>
            Mobile Number <Text style={{color: globalcolor.Errorcolor}}>*</Text>
          </Text>
          <View style={styles.action}>
            {
              <FontAwesome
                name="mobile"
                color={globalcolor.PrimaryColor}
                size={30}
              />
            }
            <TextInput
              keyboardType="number-pad"
              placeholder="Mobile number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlemobilenumberChanger(val)}
            />
          </View>
          {data.check_textInputMobile ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={globalstyle.errorMsg}>
                Enter a valid mobile number.
              </Text>
            </Animatable.View>
          )}
          <Text style={styles.text_footer}>
            Email id<Text style={{color: globalcolor.Errorcolor}}>*</Text>
          </Text>
          <View style={styles.action}>
            {
              <FontAwesome
                name="envelope-o"
                color={globalcolor.PrimaryColor}
                size={20}
              />
            }
            <TextInput
              placeholder="email@domain.com"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlemailValidation(val)}
            />
          </View>
          {data.check_textInputEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={globalstyle.errorMsg}>Enter a valid Email Id.</Text>
            </Animatable.View>
          )}

          <Text style={[styles.text_footer, {marginTop: 10}]}>
            Password
            <Text style={{color: globalcolor.Errorcolor}}>*</Text>
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={globalcolor.PrimaryColor} size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={globalstyle.errorMsg}>Enter a valid password</Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 10,
              },
            ]}
            // onPress={checkPromcode()}
          >
            Refer code
          </Text>

          <View style={styles.action}>
            {/* <Image
              source={require('../assets/img/marker.png')} //Change your icon image here
              style={styles.IconsImg}
            /> */}
            <Feather
              name="share-2"
              color="grey"
              size={20}
              color={globalcolor.PrimaryColor}
            />
            <TextInput
              placeholder="Refer code (Optional)"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => onChangeRefercode(val)}
              //value={data.Refercode}
            />
            <Button
              title="Check"
              color={globalcolor.PrimaryColor}
              onPress={() => checkPromcode()}
            />
            {/* <TouchableOpacity onPress={() => checkPromcode()}>
              <View style>
                <Text>Check</Text>
              </View>
            </TouchableOpacity> */}
          </View>
          {data.invalidRefererror ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={globalstyle.errorMsg}>Invaild Refer Code.</Text>
            </Animatable.View>
          )}
          {data.isValidrefercode ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{color: globalcolor.Successcolor, fontSize: 14}}>
                You have been referred by {data.ReferBy}
              </Text>
            </Animatable.View>
          ) : null}
          {/* <Text style={{marginTop: 10, color: globalcolor.Errorcolor}}>
              {ResponseError}
            </Text> */}
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                Signup();
              }}>
              <LinearGradient
                colors={['#fd8e4e', '#fd7729']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#fd7729',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fd7729',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fd7729',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    //marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    //paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  IconsImg: {
    width: 25,
    height: 25,
  },
  checkrefer: {
    backgroundColor: globalcolor.Successcolor,
    padding: 5,
    borderRadius: 5,
  },
});
