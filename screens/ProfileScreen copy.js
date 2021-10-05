import React, { Component,useState } from 'react';
import { View, Text, Button,TouchableOpacity,ImageBackground, StyleSheet,SafeAreaView,Image,TextInput,ScrollView } from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';
import {globalcolor} from '../style/globalcolor';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};



const ProfileScreen = () => {

  const [image, setImage] = useState('https://ubkinfotech.com/images/logo.png');
  
    choosePhotoFromLibrary = () => {


    launchImageLibrary (options , (response) => { 

      console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
       } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
       } else if (response.customButton) {
         //console.log('User tapped custom button: ', response.customButton);
       } else {
   
        console.log('Response = ', response);
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

    var url = 'http://192.168.29.175:8000/users/testimage'; // File upload web service path
    var photo = {
      uri:  response.uri, // CameralRoll Url
      type: 'image/jpeg',
      name: response.fileName,
       };

     var formData = new FormData();
     formData.append("avatar", photo);

     var xhr = new XMLHttpRequest();
     xhr.open('POST', url);
     console.log('OPENED', xhr.status);

  xhr.onprogress = function () {
      console.log('LOADING', xhr.status);
  };

  xhr.onload = function () {
      console.log('DONE', xhr.status);
      console.log('DONE', xhr);
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
    <View style={styles.container}>
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
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            John Doe
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o"  size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
               
              },
            ]}
          />
        </View>
       
    
     
       
        
        <TouchableOpacity style={styles.commandButton} onPress={ this.uploadImage(image) }>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>

        
      </Animated.View>
    </View>
  );
};
//}



export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
   
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
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});