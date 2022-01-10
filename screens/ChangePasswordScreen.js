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
const ChangePasswordScreen = ({navigation}) => {
  const {colors} = useTheme();
  // console.log('settings.........',probs);

  const [data, setData] = React.useState({
    secureTextEntry: true,
    secureTextNewPassword: true,
    secureTextConfirmPassword: true,
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword: '',
  });
  const [msg, setMsg] = useState('');
  const [SucussMsg, setSucussMsg] = useState('');
  const [Token, setToken] = useState('');
  const handleOldPassword = val => {
    if (val.length >= 3) {
      setData({...data, OldPassword: val});
    } else {
      setData({...data, OldPassword: val});
    }
  };
  const handleNewpassword = val => {
    //alert(val);
    if (val.length >= 3) {
      setData({...data, NewPassword: val});
    } else {
      setData({...data, NewPassword: val});
    }
  };
  const handleConfirmPassword = val => {
    if (val.length >= 3) {
      setData({...data, ConfirmPassword: val});
    } else {
      setData({...data, ConfirmPassword: val});
    }
  };
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        setToken(userToken);
        //  let userdata = await AsyncStorage.getItem('user');
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

  const UpdatePassword = () => {
    console.log('Password Update.......', data);

    let requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },
      /*
         OldPassword: '',
         NewPassword: '',
         ConfirmPassword: '',
      */
      body: JSON.stringify({
        confirmPassword: data.ConfirmPassword,
        newPassword: data.NewPassword,
        oldPassword: data.OldPassword,
      }),
    };

    console.log('requestOptions', requestOptions);
    WebService.PostData('change-password', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        console.log('Resend data....', resJson);
        if (resJson.hasOwnProperty('errors')) {
          if (resJson.errors[0].type == 'REJECTED') {
            setMsg(resJson.errors[0].userMessage);
          }
        } else {
          setSucussMsg(
            `A new OTP has been resent to ${probs.route.params.data.email} & ${probs.route.params.data.mobile}"`,
          );
        }
      })
      .catch(e => console.log(e));

    /*
    
     if (resJson.hasOwnProperty('errors')) {
          if (resJson.errors[0].type == 'REJECTED') {
            setMsg(resJson.errors[0].userMessage);
          }
        } else {
          setSucussMsg(
            `A new OTP has been resent to ${probs.route.params.data.email} & ${probs.route.params.data.mobile}"`,
          );
        }
    
    
    
    */
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[globalstyle.BackButton, {marginRight: 40}]}>
        <TouchableOpacity onPress={() => handleBackButtonClick()}>
          <View style={{flex: 0.4, marginRight: 10}}>
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
            Change Password
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{padding: 15}}>
          <Text style={[styles.OtpText, {color: globalcolor.Errorcolor}]}>
            {msg}
          </Text>
          <Text style={[styles.OtpText, {color: globalcolor.Successcolor}]}>
            {SucussMsg}
          </Text>
        </View>
        <View>
          <Text style={globalstyle.LableText}>Enter Old Password</Text>
          <View style={globalstyle.ListrowAccount}>
            <TextInput
              placeholder="Old Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                globalstyle.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleOldPassword(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={globalstyle.LableText}>Enter new password</Text>
          <View style={globalstyle.ListrowAccount}>
            <TextInput
              placeholder="New password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                globalstyle.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleNewpassword(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={globalstyle.LableText}>Confirm new password</Text>
          <View style={globalstyle.ListrowAccount}>
            <TextInput
              placeholder="New password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                globalstyle.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPassword(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          UpdatePassword();
        }}>
        <View style={globalstyle.FooterTabButton}>
          <Text style={globalstyle.FooterTabText}> Save Changes</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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
});
