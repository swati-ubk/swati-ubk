import React, { useState } from "react";
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

  const List = [
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Accepted',
    },
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Accepted',
    },
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Accepted',
    },
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Accepted',
    },
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Pending',
    },
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Accepted',
    },
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Pending',
    },
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Pending',
    },
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Accepted',
    },
    {
      name: '#12346689',
      amount: '189.00',
      status: 'Accepted',
    },
  ]

  const OrderList=()=>{

    

  

    const renderItem =({item}) => {

      return (
       
        <View style={styles.cart_list}>
        <View style={styles.list_style}>
            <Text style={{color:globalcolor.PlaceHolderColor}}>{item.name}</Text>
            <Text style={{color:globalcolor.PlaceHolderColor}}>{item.amount}</Text>
            <Text style={[item.status=='Pending'?{color:globalcolor.Errorcolor}:{color:globalcolor.Successcolor}]}>{item.status}</Text>
            
            

          
            
        </View>
      </View> 
     
      )
    }

    return(
  <SafeAreaView style={styles.container}>
    
   
        <View>
        <Text style={styles.search_text}>Search</Text>
        </View>
   
      <View style={styles.search_bar}>
          <View style={styles.search_box}>
            <TextInput style={styles.order_text}
              placeholder='Enter Order ID'/> 
                <View style={styles.icon_position}>
                    <FontAwesome name="search" color={globalcolor.PlaceHolderColor} size={25} />
                      </View>
          </View>
          <View style={{flex:0.2,position:'relative'}}>
              <View style={styles.round_shape}>
              <FontAwesome name="filter" color={globalcolor.PrimaryColor} size={25} style={{marginLeft:15}} />
              </View>
          </View>
      </View>

      {/* Orderlist */}
      <View style={{flex:1,marginBottom:40}}>
        <View style={styles.id_cart}>

            <FlatList
            data={List}
            renderItem={renderItem}/>

            
            
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
    id_cart:{
      width:'100%',
      height:'100%',
      marginVertical:0 
    },
    cart_list:{
     
      marginHorizontal:10,
      elevation:1,
      borderRadius:4,
      position:'relative'
      
    },
    profile: {
      flex: 1,
      alignItems: 'center',
      textAlignVertical: 'center',
      marginBottom: 10,
    },
    itemPhoto: {
      width: '96%',
      alignSelf: 'center',
      height: '100%',
      borderRadius: 5,
    },
    search_text:{
  
      marginTop:80,
      marginHorizontal:15,
      fontSize:16,
      color:'#646469'
    },
    order_text:{

      marginHorizontal:10,
      fontSize:14,
      color:'#646469',
      fontFamily: globalcolor.Font,
    },
    search_bar:{
      width:'100%',
      flexDirection:'row',
      minHeight:50,
      marginBottom:10
  
    },
    search_box:{

      width:'80%',
      height:'40%',
      elevation:2,
      borderRadius:10,
      marginLeft:10,
      marginVertical:10, 
      minHeight:40,
    },
    round_shape:{
      width:50,
      height:50,
      backgroundColor:'#F0F0F0',
      borderRadius:100,
      marginLeft:5,
      justifyContent:'center'
    },
    order_list:{
      flex:1,
      height:'100%',
      minHeight:100,
      marginHorizontal:15,
     
      borderRadius:10,
      marginVertical :10,
    },
    order_cart:{

      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:15,
      width:'100%',
      height:'40%',
      fontSize:10,
      elevation:1,
      marginTop:10,
      borderRadius:5
    },
    list_style:{
      flexDirection:'row',justifyContent:'space-between', paddingHorizontal:10, marginVertical:15,
    },
    icon_position:{
      position: 'absolute',zIndex: 1,marginTop: 5,right: 10,
    }
  
  });


  export default OrderList