import React, { useState,useEffect } from 'react';
import { Button, TextInput,View,Text,StyleSheet,SafeAreaView,Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import {globalcolor} from '../style/globalcolor';
 import {globalstyle} from '../style/globals.js';
//import firebase from 'firebase';
const OTPScreen = (probs) => {

console.log("phone number====="+probs.route.params.data.mobile);

 // console.log(probs);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
 // useEffect(() =>  signInWithPhoneNumber('+916200938310'), []);
 useEffect(() => {
  async function fetchMyAPI() {
    try{

       //console.log('Invalid code.1333'+phoneNumber);
       const confirmation = await auth().signInWithPhoneNumber('+91'+probs.route.params.data.mobile);
       console.log(confirmation)
       setConfirm(confirmation);
           }catch(e){
             console.log(e)
          //  alert(JSON.stringify(e));
            console.log('Invalid code22.'+JSON.stringify(e));
          }
  }

 // fetchMyAPI()
}, [])




 async function signInWithPhoneNumber() {


  try{
    const confirmation = await auth().signInWithPhoneNumber(probs.route.params.data.mobile);
    console.log(confirmation)
    setConfirm(confirmation);
        }catch(e){
          console.log(e)
        // alert(JSON.stringify(e));
         console.log('Invalid code22.'+JSON.stringify(e));
       }
}


  return (
    <SafeAreaView style={styles.container}>
         <View style={{marginTop:90}}> 
         <Image
                   source={require('../assets/img/sms.png')} //Change your icon image here
                   style={styles.OtpImage}
                   
               />
         <Text style={styles.OtpText} >
           Otp will send Mobile Number +91 {probs.route.params.data.mobile}
         </Text>
          
            <View style={styles.OTPContainer}>
              <View style={styles.otpView}>
                <TextInput
                 // placeholder="0"
                   keyboardType="number-pad"
                  style={styles.OTPtextInput}
                 />
              </View>
              <View style={styles.otpView}>
                <TextInput
                //  placeholder="0"
                  keyboardType="number-pad"
                  style={styles.OTPtextInput}
                 />
              </View>
              <View style={styles.otpView}>
                <TextInput
                //  placeholder="0"
                keyboardType="number-pad"
                  style={styles.OTPtextInput}
                 />
              </View>
              <View style={styles.otpView}>
                <TextInput
                 // placeholder="0"
                 keyboardType="number-pad"
                  style={styles.OTPtextInput}
                 />
              </View>
              <View style={styles.otpView}>
                <TextInput
                 // placeholder="0"
                 keyboardType="number-pad"
                  style={styles.OTPtextInput}
                 />
              </View>
              <View style={styles.otpView}>
                <TextInput
                //  placeholder="0"
                keyboardType="number-pad"
                keyboardType="number-pad"
                  style={styles.OTPtextInput}
                 />
              </View>
              
              

            </View>


         </View>
    </SafeAreaView>
   
  );


  async function signInWithPhoneNumber(phoneNumber) {


    try{

     // console.log('Invalid code.1333'+phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log(confirmation)
      setConfirm(confirmation);
          }catch(e){
            console.log(e)
           alert(JSON.stringify(e));
           console.log('Invalid code22.'+JSON.stringify(e));
         }
  }

  async function confirmCode() {
    try {
      console.log(code)
      const response= await confirm.confirm(code);

      console.log(response);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

 
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


}
export default OTPScreen;

const styles = StyleSheet.create({
  container:{
   // flexDirection:'row',
    flex:1

  },
  OTPContainer:{
    flexDirection:'row',
   // width:'90%',
   marginTop:50,
    alignSelf:'center'
  },
  OTPtextInput: {
    width:80,
    textAlign:'center',
    backgroundColor:'#05375a',
    paddingLeft: 5,
    color: '#ffffff',
},
otpView:{
marginLeft:5,
marginRight:5
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
},
OtpImage:{
  height:150,
  width:150,
  alignSelf:'center'
},
OtpText:{
  marginTop:20,
   textAlign:'center',
   fontFamily:globalcolor.Font,
   color:'#000000'
},
OTPtextInput:{
  borderBottomWidth:1,
  borderBottomColor:'#000',
  width:40,
  textAlign:'center',
  fontSize:20,
  
}
});

