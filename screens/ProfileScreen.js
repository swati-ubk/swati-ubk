import React, {useState,useEffect } from 'react';
import { View, Text, Button,TouchableOpacity,ImageBackground, StyleSheet,SafeAreaView,Image,TextInput,ScrollView } from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';
import {globalcolor} from '../style/globalcolor';
import { Avatar } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import {ConfigFile} from '../service/ConfigFile';
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};



const ProfileScreen = () => {

  const [image, setImage] = useState('data:image/png;base64,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');
  const [Token,SetToken]=useState('');
  const [UserData,SetUserData]=useState('');
  useEffect(() => {
    async function fetchMyAPI() {
      let userToken= null;
      let userdata= null;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        userdata = await AsyncStorage.getItem('user'); 

        console.log("userToken...4",userToken);
        console.log("usersdarta...4",userdata);

        SetToken(userToken);
        SetUserData(userdata);

      } catch(e) {
        console.log(e);
      }
    }
  
    fetchMyAPI()
  }, [])








   /*
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQzYjcwYTI0MDJhODU1NzhlOTFiMmQiLCJlbWFpbCI6Im5pdGlzaGt1bWFyNTM0M0BnbWFpbC5jb20iLCJpYXQiOjE2MzI4MjIzMTgsImV4cCI6MTYzMjkwODcxOH0.qLMgkDTdQG1AJrQ9Sj5Vl7qTvMOldKNiX9giuBQw0hw'},
    };
    WebService.PostData('me',requestOptions)
    .then((response) => response.json())
       .then((responseJson) => {
         if (responseJson.length > 0) {
           setLoading(false);
              console.log('------------Profile data------------------');
              console.log(responseJson);
            //  setData([...data,...responseJson]);
         } 
       })
       .catch((error) => {
         console.error(error);
       }); 
       */


   





    choosePhotoFromLibrary = () => {
    launchImageLibrary (options , (response) => { 

    //  console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
       } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
       } else if (response.customButton) {
         //console.log('User tapped custom button: ', response.customButton);
       } else {
   
       // console.log('Response = ', response);
       //
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ',  response.assets[0].width);
        console.log('height -> ',  response.assets[0].height);
        console.log('fileSize -> ',  response.assets[0].fileSize);
        console.log('type -> ',  response.assets[0].type);
        console.log('fileName -> ',  response.assets[0].fileName);
   

        setImage(response.assets[0].uri);
         this.bs.current.snapTo(1);

         this.uploadImage(response.assets[0])

       }
    })
   

  }

   uploadImage =  async (response) => {
    console.log("sadfasdasd----",response.uri);

   // var url = 'http://192.168.29.175:8000/users/testimage'; 
    var photo = {
      uri:  response.uri, // CameralRoll Url
      type: 'image/jpeg',
      name: response.fileName,
       };
     var formData = new FormData();
     formData.append("file", photo);

     var xhr = new XMLHttpRequest();
   // console.log("url===============",ConfigFile.BaseUrl+'upload?mode=account-image');
     xhr.open('POST', ConfigFile.BaseUrl+'upload?mode=account-image');
     xhr.setRequestHeader("Authorization", 'Bearer '+Token);
     console.log('OPENED', xhr.status);

  xhr.onprogress = function () {
      console.log('LOADING', xhr.status);
  };

  xhr.onload = function () {
      console.log('DONE', xhr.status);
      console.log('RESPONSE', xhr);
      //console.log('Image Path',xhr._response)
      let ResponseData= JSON.parse(xhr._response);
      console.log('ResponseData',ResponseData);
      console.log('Image Path',ConfigFile.ImageBaseUrl+ResponseData.path);
      setImage(ConfigFile.ImageBaseUrl+ResponseData.path);

      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type':'application/json','Authorization':"Bearer "+Token},
        body:  JSON.stringify({profilePic:'poikopdikodid'})
      };
console.log(requestOptions);
      
      fetch('http://api.beta.diskounto.com/profile', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        console.log("Upload image---",resJson);
      }).catch(e => console.log(e));
      

  };
  
  xhr.send(formData);
  console.log("sadfasdasd----",response);
  

  }


   takePhotoFromCamera = () => {

    launchCamera(options, (response) => { 
    ////  Use launchImageLibrary to open image gallery
          console.log('Response = ', response);
        
          if (response.didCancel) {
           // console.log('User cancelled image picker');
          } else if (response.error) {
           // console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            //console.log('User tapped custom button: ', response.customButton);
          } else {
      
       
          //
           console.log('uri -> ', response.assets[0].uri);
           console.log('width -> ',  response.assets[0].width);
           console.log('height -> ',  response.assets[0].height);
           console.log('fileSize -> ',  response.assets[0].fileSize);
           console.log('type -> ',  response.assets[0].type);
           console.log('fileName -> ',  response.assets[0].fileName);
      

            setImage(response.assets[0].uri);
            this.bs.current.snapTo(1);
            //this.uploadImage(response.assets[0])
          }
        });
      
  }
  

 
  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={this.takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={this.choosePhotoFromLibrary}>
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

  bs = React.createRef();
 fall = new Animated.Value(1);

  
  //render() {

 

  return (
    <SafeAreaView style={globalstyle.container}>
     

    <ScrollView >
    <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
      }}>
      <View>
    <View style={styles.profile}>
    <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
          <View > 
              <Image
                  source={{uri:image}} //Change your icon image here
                  style={[globalstyle.avaterProfileImage,globalstyle.BorderRadius50]}
              />
               <FontAwesome name="camera"  size={26} style={styles.chooseimage}/>
          </View>
          </TouchableOpacity>
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
     </View> 
     </Animated.View> 
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
//}



export default ProfileScreen;

const styles = StyleSheet.create({
  profile: {
   flex: 1, 
    alignItems: 'center', 
    marginTop:6,
   // justifyContent: 'center'
  },
  chooseimage:{
    alignItems: 'center', 
    position:'absolute',
    marginTop:80,
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
  
    width:'90%',
    marginTop: 10,
    paddingBottom: 5
},
panel: {
  padding: 20,
  backgroundColor: '#FFFFFF',
  paddingTop: 20,
  marginBottom:20
 
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
// action: {
//   flexDirection: 'row',
//   marginTop: 10,
//   marginBottom: 10,
//   borderBottomWidth: 1,
//   borderBottomColor: '#f2f2f2',
//   paddingBottom: 5,
// },
// actionError: {
//   flexDirection: 'row',
//   marginTop: 10,
//   borderBottomWidth: 1,
//   borderBottomColor: '#FF0000',
//   paddingBottom: 5,
// },
FooterTabButton:{
  backgroundColor:globalcolor.PrimaryColor,
 
  
  height:20,
 
  
  
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
  
});