import React, {useState,useEffect } from 'react';
import { View, Text, Button, TouchableOpacity,StyleSheet,SafeAreaView,Image,TextInput,ScrollView } from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {globalcolor} from '../style/globalcolor';
import { Avatar } from 'react-native-paper';
import {ConfigFile} from '../service/ConfigFile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'react-native-paper';
import WebService from '../service/WebService';
const BankAccountScreen = ({navigation}) => {
  const { colors } = useTheme();
 // console.log('settings.........',probs);
  const [UserData,SetUserData]=useState('');
 const [data, setData] = React.useState({
  username: '',
  password: '',
  check_textInputChange: false,
  secureTextEntry: true,
  isValidUser: true,
  isValidPassword: true,
});
 
 useEffect(() => {

  async function fetchMyAPI() {
    try {
     // let userToken = await AsyncStorage.getItem('userToken');
      let userdata = await AsyncStorage.getItem('user'); 

     // SetToken(userToken);
      SetUserData(...UserData,JSON.parse(userdata));
      let alldata = JSON.parse(userdata);
      console.log('All data Address......',JSON.stringify(alldata));
      
      
       setImage(ConfigFile.ImageBaseUrl+alldata.profilePic.path);
      // SetCoverImage(ConfigFile.ImageBaseUrl+alldata.coverPic.path);
    


     // setImage(ConfigFile.ImageBaseUrl+alldata.profilePic.path);
      console.log('profilePic.....',ConfigFile.ImageBaseUrl+alldata.profilePic.path);
    } catch(e) {
      console.log(e);
    }
  }

  fetchMyAPI()
}, [])

const updateSecureTextEntry = () => {
  setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
  });
}
function handleBackButtonClick() {
  console.log(navigation);
   navigation.goBack();
   return true;
}

const UpdatePassword=()=>{
  console.log('Password Update.......');
}

    return (
      <SafeAreaView style={styles.container}>
         {/*------------BACK BUTTON START------------------*/}
         <View style={[globalstyle.BackButton]}>
              <TouchableOpacity 
                onPress={() => handleBackButtonClick()}
                >
                <View style={{flex:0.4,marginRight:20}}>
                    <FontAwesome name="arrow-left"color={globalcolor.PrimaryColor} size={20}  />
                </View>
               </TouchableOpacity> 
                <View style={{flex:0.6}}> 
                   <Text style={{color:globalcolor.PrimaryColor,fontFamily:globalcolor.Font,fontSize:20}}>
                     Bank Account
                   </Text>
                </View>
            </View>
            {/*------------BACK BUTTON END------------------*/}
      <ScrollView >
      
       
          <View style={styles.Listheight}>
              <Text style={globalstyle.LableText}>Enter Account Number</Text>
            <View style={globalstyle.ListrowAccount}>
            <TextInput 
                    placeholder="*********"
                    placeholderTextColor="#666666"
                    //secureTextEntry={data.secureTextEntry ? true : false}
                    style={[globalstyle.textInput, {
                        color: colors.text
                    }]}
                   
                    autoCapitalize="none"
                   // onChangeText={(val) => handlePasswordChange(val)}
                  // value={UserData.firstName}
                />
              
            </View>
            </View>     
            <View  style={styles.Listheight}>
              <Text style={globalstyle.LableText}>Confirm Account Number</Text>
            <View style={globalstyle.ListrowAccount}>
            <TextInput 
                    placeholder="**********"
                    
                    placeholderTextColor="#666666"
                    //secureTextEntry={data.secureTextEntry ? true : false}
                    style={[globalstyle.textInput, {
                        color: colors.text
                    }]}
                   
                    autoCapitalize="none"
                   // onChangeText={(val) => handlePasswordChange(val)}
                   //value={UserData.lastName}
                />
               
            </View>
            </View>     
            <View  style={styles.Listheight}>
                <Text style={globalstyle.LableText}>IFSC Code</Text>
                    <View style={globalstyle.ListrowAccount}>
                    <TextInput 
                            placeholder="SBIN000558"
                            
                            placeholderTextColor="#666666"
                           // secureTextEntry={data.secureTextEntry ? true : false}
                            style={[globalstyle.textInput, {
                                color: colors.text
                            }]}
                        
                            autoCapitalize="none"
                        // onChangeText={(val) => handlePasswordChange(val)}
                      //  value={UserData.mobile}
                        />
                        
                    </View>
            </View>  
            <View  style={styles.Listheight}>
                <Text style={globalstyle.LableText}>PAN</Text>
                    <View style={globalstyle.ListrowAccount}>
                    <TextInput 
                            placeholder="BJHHU85"
                            
                            placeholderTextColor="#666666"
                           // secureTextEntry={data.secureTextEntry ? true : false}
                            style={[globalstyle.textInput, {
                                color: colors.text
                            }]}
                        
                            autoCapitalize="none"
                        // onChangeText={(val) => handlePasswordChange(val)}
                       // value={UserData.address[0].pin}
                        />
                        
                    </View>
            </View>  
            <View  style={styles.Listheight}>
                <Text style={globalstyle.LableText}>Bank Statement</Text>
                <TouchableOpacity onPress={() => OpenFooterpopup('account-cover-image')}>
                  <View style={[globalstyle.coverphoto,{marginLeft:15,marginRight:15,marginTop:20,height:120}]}>
               
                          <Image
                           source={require('../assets/img/cloud-computing.png')} //Change your icon image here
                            style={[globalstyle.UploadIocn,{alignSelf:'center'}]}
                          />
                        <Text style={{alignSelf:'center',fontFamily:globalcolor.Font}}>Upload Bank Statement</Text>
                  
                  </View>
              </TouchableOpacity> 
            </View>  
            <View  style={styles.Listheight}>
                <Text style={globalstyle.LableText}>PAN Card Front</Text>
                <TouchableOpacity onPress={() => OpenFooterpopup('account-cover-image')}>
                  <View style={[globalstyle.coverphoto,{marginLeft:15,marginRight:15,marginTop:20,height:120}]}>
               
                          <Image
                           source={require('../assets/img/cloud-computing.png')} //Change your icon image here
                            style={[globalstyle.UploadIocn,{alignSelf:'center'}]}
                          />
                        <Text style={{alignSelf:'center',fontFamily:globalcolor.Font}}>Upload PAN Card</Text>
                  
                  </View>
              </TouchableOpacity> 
            </View>

             
            
           
            
            
      </ScrollView>

      <TouchableOpacity 
               onPress={() => {UpdatePassword() }}
               >
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
    marginTop:50,
  },
  profile: {
    flex: 1, 
     alignItems: 'center', 
     textAlignVertical:'center',
     marginBottom:10
   },
   ShopTitle:{
    marginLeft:20,
    fontFamily:globalcolor.Font,
    fontSize:20,
    fontWeight:'400',
    color:globalcolor.SeconderFontColor
  },
  Listheight:{
      marginTop:10
  }
 
  
});
