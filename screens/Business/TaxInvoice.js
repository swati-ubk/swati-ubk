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
    useWindowDimensions,
    Switch
  } from 'react-native';
import { globalcolor } from "../../style/globalcolor";
import FontAwesome from 'react-native-vector-icons/Ionicons';
import Radiobutton from "./components/Radiobutton";
import  { useState } from 'react';

  const TaxInvoice =()=>{

    

    return(

        <SafeAreaView style={styles.container}>
            <ScrollView>     
                <View>
                {/* Item type */}
                     <View >
                        <View style={styles.fast_row}>
                            <Text style={styles.font}>Item type</Text>
                                <View style={{marginTop:5}}>
                                     <View style={styles.item_box}>
                                        <TextInput placeholder="Select type of item(Service/Product)" style={{textAlign:'left'}}/>
                                    </View>
                                 </View>     
                        </View>
                        {/* Item & Category */}
                        <View style={styles.item_row}>
                            <View style={styles.item_column}>
                                <Text style={styles.large_borderheading}>Item name</Text>
                                    <View style={{marginVertical:5}}>
                                         <View style={styles.item_box}>
                                            <TextInput placeholder="Enter Item name" style={{textAlign:'left'}}/>
                                        </View>
                                     </View>     
                            </View>
                            <View style={styles.item_column}>
                                <Text style={styles.large_borderheading}>Category</Text>
                                    <View style={{marginVertical:5}}>
                                         <View style={styles.item_box}>
                                            <TextInput placeholder="Select category" style={{textAlign:'left'}}/>
                                        </View>
                                     </View>     
                             </View>

                        </View>
                        {/* Description */}
                        <View>
                            <View style={styles.row}>
                                    <Text style={styles.large_borderheading}>Description</Text>
                                        <View style={{marginVertical:5}}>
                                             <View style={styles.description_box}>
                                                <TextInput placeholder="Enter some details about this item" style={{textAlign:'left'}}/>
                                            </View>
                                         </View>     
                            </View>
                        </View>

                        {/* Photo attachment */}
                        <View>
                            <View style={styles.row}>
                                    <Text style={styles.font}>Photos (.png/.jpg/.jpeg)</Text>
                                        <View style={{marginVertical:5}}>
                                             <View style={styles.dotted_box}>
                                                <FontAwesome name='cloud-upload-outline'color={globalcolor.PlaceHolderColor} size={35}style={{marginHorizontal:140}}/>
                                                <Text style={{textAlign:'center',color:globalcolor.PlaceHolderColor}}>Drag & drop any file or browse</Text>
                                            </View>
                                         </View>     
                            </View>
                        </View>

                        {/* Radio button */}
                        <View>
                            <View style={styles.row}>
                                    <Text style={styles.font}>Do you have multiple variants of this product ?</Text></View> 
                            <View style={styles.radiobutton_position}>
                                <View style={{marginHorizontal:10,}}>
                                    <Radiobutton/>                                  
                                </View>
                                
                            </View>
                        </View>

                        {/* Price section */}
                        <View style={styles.price_sectionrow}>
                            <View style={styles.box_position}>
                                <Text style={styles.border_heading}>Maximum price</Text>
                                    <View style={{marginVertical:5}}>
                                         <View style={styles.small_box}>
                                            <Text style={styles.placeholder_text}>₹0</Text>
                                        </View>
                                     </View>     
                            </View>
                            <View style={styles.box_position}>
                                <Text style={styles.border_heading}>Selling price</Text>
                                    <View style={{marginVertical:5}}>
                                         <View style={styles.small_box}>
                                         <Text style={styles.placeholder_text}>₹0</Text>
                                        </View>
                                     </View>     
                            </View>
                            <View style={styles.box_position}>
                                <Text style={styles.border_heading}>Item name</Text>
                                    <View style={{marginVertical:5}}>
                                         <View style={styles.small_box}>
                                         <Text style={styles.placeholder_text}>0%</Text>
                                        </View>
                                     </View>     
                            </View>
                        </View>

                        {/* Invoice */}
                        <View style={styles.invoice_row}>                                 
                                    <View style={{flexDirection:'column',marginHorizontal:10,marginVertical:5,width:'50%'}}>
                                        <Text style={styles.large_text}>Price Breakup</Text>
                                        <Text style={styles.static_smalltext}>Selling Price</Text>
                                        <Text style={styles.static_smalltext}>Commission (0%)</Text>
                                        <Text style={styles.static_smalltext}>Processing Fee (0%)</Text>
                                        <Text style={styles.static_smalltext}>GST (18%)</Text>
                                        <Text style={styles.large_text}>Amount to Receive</Text>
                                    </View>
                                    <View style={{flexDirection:'column',marginRight:5,marginVertical:5,width:'40%'}}>
                                        <Text style={styles.dynamic_smaltext}></Text>
                                        <Text style={styles.dynamic_smaltext}>₹0.00</Text>
                                        <Text style={styles.dynamic_smaltext}>(-) ₹0.00</Text>
                                        <Text style={styles.dynamic_smaltext}>(-) ₹0.00</Text>
                                        <Text style={styles.dynamic_smaltext}>(-) ₹0.00</Text>
                                        <Text style={styles.input_field}>₹0.00</Text>
                                    </View>
                        </View>
                        {/* Save Draft */}
                        <View style={styles.last_row}>
                            <View style={styles.box}>
                                <Text style={styles.box_text}>Save draft</Text>
                            </View>
                           
                            <View style={{flexDirection:'column'}}>
                                <Text style={styles.small_text}>Customer sees</Text>
                                <Text style={styles.right_font}>₹0.00</Text>
                            </View>
                            <View style={{flexDirection:'column'}}>
                            <Text style={styles.small_text}>You got</Text>
                                <Text style={styles.right_font}>₹0.00</Text>
                            </View>
                            
                        </View>
                     </View>
                </View>
            </ScrollView>
        </SafeAreaView>
       
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:40,
    },
    input_field:{
        color:globalcolor.PlaceHolderColor,
        fontSize:20,
        marginVertical:8,
        textAlign:'right'
    },
    right_font:{
        color:globalcolor.PlaceHolderColor,
        fontSize:20,
        textAlign:'right'
    },
    small_text:{
        color:globalcolor.PlaceHolderColor,
        fontSize:10,
        marginVertical:8
    },
    box:{
        marginVertical:15,
        borderColor: '#C4C4C4',
        borderWidth: 1,
        borderRadius:10,
        width:'30%',
        height:'70%'
    },
    box_text:{
        color:globalcolor.PlaceHolderColor,
        fontSize:14,
        textAlign:'center',
        marginTop:10
    },
    last_row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:15,
        marginBottom:20
    },
    invoice_row:{
        flexDirection:'row',
        marginVertical:10,
        marginHorizontal:10,
        backgroundColor:'#d1fae5',
        borderColor: '#389e0d', 
        borderWidth: 1,
        borderRadius:8,
        width:'95%',
    },
   large_text:{
        color:globalcolor.PlaceHolderColor,
        fontSize:20,
        marginVertical:2
    },
    static_smalltext:{
        color:globalcolor.PlaceHolderColor,
        fontSize:12,
        marginVertical:2
    },
    dynamic_smaltext:{
        color:globalcolor.PlaceHolderColor,
        fontSize:12,
        marginVertical:2,
        textAlign:'right'
    },
    placeholder_text:{
        textAlign:'left',
        color:globalcolor.PlaceHolderColor,
        fontSize:15,
        marginVertical:8,
        marginHorizontal:8
    },
    item_box:{
        paddingHorizontal:5,borderColor: '#C4C4C4',borderWidth: 1, borderRadius:10,minHeight:20,
    },
    small_box:{
        paddingHorizontal:5,borderColor: '#C4C4C4',borderWidth: 1, borderRadius:10,minHeight:40,
    },
    border_heading:{
        color:globalcolor.PlaceHolderColor,fontSize:12,marginLeft:5,
        
    },
    large_borderheading:{
        color:globalcolor.PlaceHolderColor,fontSize:16,
    },
    box_position:{
        flexDirection:'column',marginTop:10,width:'30%',marginHorizontal:5
    },
    price_sectionrow:{
        flexDirection:'row',marginHorizontal:10,marginBottom:5
    },
    font:{
        color:globalcolor.PlaceHolderColor,fontSize:15,
    },
    radiobutton_position:{
        flexDirection:'row',marginHorizontal:10,marginVertical:10
    },
    row:{
        flexDirection:'column',marginTop:10,paddingHorizontal:10,width:'100%',
    },
    dotted_box:{
        paddingHorizontal:5,borderColor: '#C4C4C4',borderWidth: 1,borderStyle: 'dotted', borderRadius:10,minHeight:100,justifyContent:'center'
    },
    description_box:{
        paddingHorizontal:5,borderColor: '#C4C4C4',borderWidth: 1, borderRadius:10,minHeight:80,
    },
    item_row:{
        flexDirection:'row',marginHorizontal:10,
    },
    fast_row:{
        flexDirection:'column',marginTop:10,marginHorizontal:10
    },
    item_column:{
        flexDirection:'column',marginTop:10,width:'50%',marginRight:5
    }
})

  export default TaxInvoice