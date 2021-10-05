import React from 'react';
import { View, Text, Button, StyleSheet,SafeAreaView,Image,TextInput,ScrollView,TouchableOpacity } from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';
import {globalcolor} from '../style/globalcolor';
const ProfileScreen = () => {
  const theme = useTheme();
    return (
      
      <SafeAreaView style={globalstyle.container}>
        <ScrollView >
        <View style={styles.profile}>
          <View > 
             <Image
                  source={require('../assets/img/avtar.png')} //Change your icon image here
                  style={globalstyle.avaterImage}
              />
               <FontAwesome name="camera"  size={26} style={styles.chooseimage}/>
          </View>
          <View style={styles.coverbackground}>
              <View style={styles.coverphoto}>
              <FontAwesome name="camera"  size={50} color={globalcolor.PrimaryColor} />
                  <Text style={{color:globalcolor.PrimaryColor, fontFamily:globalcolor.Font}}>Upload Cover Photo</Text>
              </View>
           
           </View>
           <View style={styles.action}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'100%'}}>
                        <Text style={globalstyle.TextLabel}>First Name</Text>
                          <TextInput 
                              placeholder="First name"
                              placeholderTextColor={globalcolor.PlaceHolderColor}
                              autoCapitalize="none"
                              style={globalstyle.textbox}
                              
                            // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                          />
                    </View>
                     {/* <View style={{marginTop:40}}>
                       <Text>icon here</Text>
                     </View> */}

                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'100%'}}>
                        <Text style={globalstyle.TextLabel}>Last  Name</Text>
                          <TextInput 
                              placeholder="Last name"
                              placeholderTextColor={globalcolor.PlaceHolderColor}
                              autoCapitalize="none"
                              style={globalstyle.textbox}
                              
                            // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                          />
                    </View>
                     {/* <View style={{marginTop:40}}>
                       <Text>icon here</Text>
                     </View> */}

                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'92%'}}>
                        <Text style={globalstyle.TextLabel}>Date of Birth</Text>
                          <TextInput 
                              placeholder="09/05/2002"
                              placeholderTextColor={globalcolor.PlaceHolderColor}
                              autoCapitalize="none"
                              style={globalstyle.textbox}
                              
                            // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                          />
                    </View>
                     <View style={{marginTop:40}}>
                     <FontAwesome name="calendar"  size={25} color={globalcolor.PrimaryColor} />
                     </View>

                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'100%'}}>
                        <Text style={globalstyle.TextLabel}>Gender</Text>
                          <TextInput 
                              placeholder="Male"
                              placeholderTextColor={globalcolor.PlaceHolderColor}
                              autoCapitalize="none"
                              style={globalstyle.textbox}
                              
                            // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                          />
                    </View>
                     {/* <View style={{marginTop:40}}>
                       <Text>icon here</Text>
                     </View> */}

                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'92%'}}>
                        <Text style={globalstyle.TextLabel}>Email address</Text>
                          <TextInput 
                              placeholder="abc@demo.com"
                              placeholderTextColor={globalcolor.PlaceHolderColor}
                              autoCapitalize="none"
                              style={globalstyle.textbox}
                              
                            // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                          />
                    </View>
                     <View style={{marginTop:40}}>
                     <FontAwesome name="check"  size={25} color={globalcolor.Successcolor} />
                     </View>

                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'92%'}}>
                        <Text style={globalstyle.TextLabel}>Phone Number</Text>
                          <TextInput 
                              placeholder="985858555"
                              placeholderTextColor={globalcolor.PlaceHolderColor}
                              autoCapitalize="none"
                              style={globalstyle.textbox}
                              
                            // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                          />
                    </View>
                     <View style={{marginTop:40}}>
                     <FontAwesome name="check"  size={25} color={globalcolor.Successcolor} />
                     </View>

                  </View>
                
            </View>
            

      </View>
      
     
      </ScrollView>
      <TouchableOpacity 
               onPress={() => {this.props.navigation.navigate('ProductListScreen',{StoreId:this.props.route.params.StoreId}) }}
               >
               <View style={globalstyle.FooterTabButton}>
                <Text style={globalstyle.FooterTabText}> Update Profile</Text>
              </View>
              </TouchableOpacity>
      </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profile: {
   flex: 1, 
    alignItems: 'center', 
    marginTop:60,
   // justifyContent: 'center'
  },
  chooseimage:{
    alignItems: 'center', 
    position:'absolute',
    marginTop:95,
    marginLeft:80,
    color:globalcolor.PrimaryColor
    
  },
  coverbackground:{
    marginTop:20,
    borderRadius : 10,
    width: '90%',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: globalcolor.SeconderColor
  },
  coverphoto:{
    alignItems: 'center', 
    padding:30
  },
  action: {
    flex:1,
    width:'90%',
    marginTop: 10,
    paddingBottom: 5
},

  
});
