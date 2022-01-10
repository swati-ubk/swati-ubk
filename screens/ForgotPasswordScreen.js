import React, {useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import LinearGradient from 'react-native-linear-gradient';
import WebService from '../service/WebService';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;
const ForgotPasswordScreen = probs => {
  //console.log('phone number=====' + probs.route.params.data.mobile);

  // console.log(probs);
  const [loading, setLoading] = useState(false);
  const [errormsg, setErrormsg] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [UserEmail, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [SucussMsg, setSucussMsg] = useState('');
  const [data, setData] = useState({
    email: '',
  });
  //const {signIn} = React.useContext(AuthContext);
  // useEffect(() =>  signInWithPhoneNumber('+916200938310'), []);
  useEffect(() => {
    async function fetchMyAPI() {}

    fetchMyAPI();
  }, []);

  const EmailID = val => {
    setData({
      ...data,
      email: val,
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

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/img/email.png')} //Change your icon image here
        style={styles.OtpImage}
      />
      <View style={{margin: 20}}>
        <View>
          <Text>Enter Email ID</Text>
        </View>
        <View>
          <TextInput
            placeholder="Email@domain.com"
            autoFocus={true}
            style={styles.EmailBox}
            onChangeText={val => EmailID(val)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Button
            title="Verify"
            onPress={() => confirmCode()}
            color={globalcolor.PrimaryColor}
            style={{borderRadius: 20, height: 50}}
          />
        </View>
        <Text style={[styles.OtpText, {color: globalcolor.Errorcolor}]}>
          {msg}
        </Text>
        <Text style={[styles.OtpText, {color: globalcolor.Successcolor}]}>
          {SucussMsg}
        </Text>
      </View>
    </SafeAreaView>
  );

  async function signInWithPhoneNumber() {
    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + Token,
      },
      body: JSON.stringify({
        email: probs.route.params.data.email,
        mobile: probs.route.params.data.mobile,
      }),
    };

    //console.log(requestOptions);
    WebService.PostData('sign-up/resend-otp', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        // console.log('Resend data....', resJson);
        if (resJson.hasOwnProperty('errors')) {
          if (resJson.errors[0].type == 'REJECTED') {
            setMsg(resJson.errors[0].userMessage);
          }
        } else {
          setSucussMsg(`A Verification link has been resent to ${data.email}`);
        }
      })
      .catch(e => console.log(e));
  }
  async function confirmCode() {
    let requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + Token,
      },
      body: JSON.stringify({
        email: data.email,
      }),
    };
    WebService.PostData('forgot-password', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        console.log('Step2222 Response', resJson);

        if (resJson.hasOwnProperty('errors')) {
          if (resJson.errors[0].type == 'REJECTED') {
            setSucussMsg('');
            setMsg(resJson.errors[0].userMessage);
          }
        } else {
          setMsg('');
          setSucussMsg(`A Verification link has been resent to ${data.email}`);
        }
      })
      .catch(e => console.log(e));
  }

  /*
   if (!confirm) {
     console.log("wwwww22222s");
 
     return (
       <View
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center"
       }}>
       <Button
         title="Phone Number Sign In"
       />
        </View>
     );
   }
   else
   {
     console.log("sasasasa11");
 
     return (
       <View
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center"
       }}>
       
       <TextInput 
        style={styles.textInput} 
        value="111"
        placeholderTextColor="#666666"
        value={code} onChangeText={text => setCode(text)}
         />
      
       <Button title="Confirm Code" onPress={() => confirmCode()} /> 
     </View>
   )
   }
 */
};
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    flex: 1,
    marginTop: 50,
  },
  OTPContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    flexDirection: 'column',
  },
  OTPtextInput: {
    width: 80,
    textAlign: 'center',
    backgroundColor: '#05375a',
    paddingLeft: 5,
    color: '#ffffff',
  },
  otpView: {
    marginLeft: 5,
    marginRight: 5,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  OtpImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  OtpText: {
    marginTop: 20,
    textAlign: 'center',
    fontFamily: globalcolor.Font,
    color: '#000000',
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
  EmailBox: {
    width: '100%',
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
    borderBottomWidth: 0.5,
  },
});
