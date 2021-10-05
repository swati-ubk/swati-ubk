import React, { useState,useEffect } from 'react';
import { Button, TextInput,View,Text,StyleSheet,SafeAreaView,Image,ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import {globalcolor} from '../style/globalcolor';
 import {globalstyle} from '../style/globals.js';
 import LinearGradient from 'react-native-linear-gradient';
 import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';


const CELL_COUNT = 6;
const OTPScreen = (probs) => {

console.log("phone number====="+probs.route.params.data.mobile);

 // console.log(probs);
 const [loading, setLoading]=useState(false)
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [Mobilenumber, setMobileNumber] = useState(probs.route.params.data.mobile);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
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

  fetchMyAPI()
}, [])

const  ActivityIndicatorShow  =  () =>
{
  return(
    <View >
     {loading ? (
    <ActivityIndicator 
      size="large"
      color={globalcolor.PrimaryColor}
      style={{marginTop:50,alignItems:'center',justifyContent:'center'}} 
      
      />
  ) : null}
</View>
  )
}

  return (
    
         <View style={{marginTop:90}}> 
         <Image
                   source={require('../assets/img/sms.png')} //Change your icon image here
                   style={styles.OtpImage}
                   
               />
         <Text style={styles.OtpText} >
           Otp will send Mobile Number +91 {probs.route.params.data.mobile}
         </Text>

         <View style={globalstyle.ActivityContainer}>
           
           <ActivityIndicator
              size="large"
              color={globalcolor.PrimaryColor}
              style={{marginTop:50,alignItems:'center',justifyContent:'center'}} 
              
              />
           <Text style={globalstyle.ActivityIndicator}> please wait....</Text>
       
          </View>
          <View style={styles.OTPContainer}>
            <View>

            </View>
            
              <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({index, symbol, isFocused}) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />

                  
                <View style={{marginTop:80,  height:50}}>
                
                <Button title="Verify" onPress={() => confirmCode()}
                color={globalcolor.PrimaryColor}
                style={{borderRadius:20,height:50}}
                /> 
                <View style={{alignSelf:'center',marginTop:20}}>
                    <Text style={{fontFamily:globalcolor.Font,color:globalcolor.SeconderFontColor,fontSize:20}}
                    onPress={() => signInWithPhoneNumber()}
                    
                    
                    >
                      
                      
                      Resend</Text>
                </View>
                  

                </View>
               
            
                 {/* <TouchableOpacity
                  
                    onPress={() => {confirmCode()}}
                >
                <LinearGradient
                   colors={['#fd8e4e', '#fd7729']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Verify</Text>
                </LinearGradient>
                </TouchableOpacity>
                <View style={{marginTop:50,alignSelf:'center'}}>
                <TouchableOpacity
                    onPress={() => {signInWithPhoneNumber()}}
                >
                  <Text style={{fontFamily:globalcolor.Font,color:globalcolor.SeconderFontColor,fontSize:20}}>Resend</Text>
               </TouchableOpacity>
                </View> */}

          </View>
           


         </View>
        
 
   
  );

  async function signInWithPhoneNumber() {
     console.log('calling mjee---------------');
      console.log(Mobilenumber);
    try{
      const confirmation = await auth().signInWithPhoneNumber('+91'+Mobilenumber);
      console.log(confirmation)
      setConfirm(confirmation);
          }catch(e){
            console.log(e)
          // alert(JSON.stringify(e));
           console.log('Invalid code22.'+JSON.stringify(e));
         }
  }
  async function confirmCode() {
    console.log('confirm call...')
    try {
      console.log(value)
      const response= await confirm.confirm(value);
  
      //console.log(response);
    } catch (error) {
      console.log('Invalid code.');
    }
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

}
export default OTPScreen;

const styles = StyleSheet.create({
  container:{
   // flexDirection:'row',
    flex:1

  },
  OTPContainer:{
    flex:1,marginLeft:20,marginRight:20,marginTop:50,
    flexDirection:'column'
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
  
},
root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth:2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  signIn: {
    marginTop:70,
    width: '100%',
    height: 40,
    //paddingLeft:40,
    //paddingRight:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
  fontSize: 18,
  fontFamily:globalcolor.Font
 // fontWeight: 'bold'
},
});

