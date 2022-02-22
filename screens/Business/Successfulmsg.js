import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    FlatList,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Picker,
    CheckBox
  } from 'react-native';
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import FontAwesome from 'react-native-vector-icons/Ionicons';
  import { Button } from "react-native-paper";
  import Dropdown from "./components/Dropdown";
  import  { useState } from "react";


  const Succesfulmsg =({navigation})=>{

    function handleBackButtonClick() {
        console.log(navigation);
        navigation.goBack();
        return true;
      }

    return(
        
        <SafeAreaView style={styles.container}>
            <View style={styles.position}>
                <View style={{alignItems:'center',}} >
                    <Image source={require('../../assets/img/successful.png')}
                    style={styles.image_style}/>
                </View>
                <Text style={styles.text}>Your Business Details Successfully Updated. </Text>
            </View>
        </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:40,
    },
    position:{  
        justifyContent:'center',
    },
    image_style:{
        justifyContent:'center',
        width:'60%',
        height:'70%',
        padding:10

    },
    text:{
        color:globalcolor.Successcolor,
        textAlign:'center',
    }
})

  export default Succesfulmsg