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
  } from 'react-native';
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { Button } from "react-native-paper";
  import  Moment  from "moment";
  import  {useState, useEffect} from 'react';


  const settlement =()=>{


    

    return(
        <SafeAreaView style={styles.container}>
        <View >
            <View>
                <Text style={styles.header_text}>Settlement Breakup </Text></View>
                <View style={{flexDirection:'row'}}>
                {/* Chart view Static */}
                <View style={styles.fst_box}>
                    <View style={styles.box_style}>
                        <Text style={styles.font_position}>Reference ID</Text>
                        <Text style={styles.font_position}>Speed</Text>
                        <Text style={styles.font_position}>Requested Amount</Text>
                        <Text style={styles.font_position}>Settled Amount</Text>
                        <Text style={styles.font_position}>Fee (-)</Text>
                        <Text style={styles.font_position}>Tax (-)</Text>
                        <Text style={styles.font_position}>TDS</Text>
                        <Text style={styles.font_position}>Requested At</Text>
                        <Text style={styles.font_position}>UTR</Text>
                        <Text style={styles.font_position}>Events</Text>
                    </View>
                </View>

                {/* Chart view Dynamic */}
                <View style={styles.second_box}>
                    <View style={styles.box_style}>
                        <Text style={styles.font_position}>SETNOR0qgIb</Text>
                        <Text style={styles.font_position}>NORMAL</Text>
                        <Text style={styles.font_position}>₹9.02</Text>
                        <Text style={styles.font_position}>₹9.02</Text>
                        <Text style={styles.font_position}>₹0.00</Text>
                        <Text style={styles.font_position}>₹0.02</Text>
                        <Text style={styles.font_position}>-</Text>
                        <Text style={styles.font_position}>₹ 29/05/2021 09:03 PM</Text>
                        <Text style={styles.font_position}>HTUYUIHJ2556</Text>
                        <Text style={styles.font_position}>-</Text>

                    </View>
                </View>

                <View style={styles.button_style}>
                     <Button style={{backgroundColor:'#FF9626',}}><Text style={{color:'#fff'}}>OK</Text></Button>
    
                 </View>

            </View>  
              
              
        </View>

    </SafeAreaView>

    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginTop:80,
    },
    font_position:{
        color:globalcolor.PlaceHolderColor,
        paddingVertical:8
    },
    box_style:{
        height:'90%',marginHorizontal:20,fontSize:20
    },
    button_style:{
        width:'100%',height:'50%',minWidth:100,position:'absolute',marginTop:528,flexDirection:'column',flex:1,
    },
    fst_box:{
        width:"50%",backgroundColor:'#F0F0F0',marginVertical:20,borderRadius:2
    },
    second_box:{
        width:"50%",marginVertical:20,borderRadius:2
    },
    header_text:{
        marginTop:50,color:globalcolor.PrimaryColor,marginHorizontal:20,fontSize:18
    }

})

  export default settlement