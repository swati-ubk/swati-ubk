import React from 'react';
import { View, Text, Button, StyleSheet,SafeAreaView,Image,TextInput,ScrollView } from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';
import {globalcolor} from '../style/globalcolor';
const CartScreen = () => {
  const theme = useTheme();
    return (
      <ScrollView style={styles.container}>
      <SafeAreaView style={globalstyle.container}>
        <View style={styles.profile}>
          
                <Text>Hello  cart page</Text>
           
            

      </View>
      
      </SafeAreaView>
      </ScrollView>
    );
};

export default CartScreen;

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
