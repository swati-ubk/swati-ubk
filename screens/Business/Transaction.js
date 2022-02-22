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
  import FontAwesome from 'react-native-vector-icons/FontAwesome5';
  


  


  const List = [
    {
      datetime: '20/08/2021  7.00pm',
      amount: '₹100.00',
      credit: '₹10.00 credited for ',
      id:'order ID OD123456789000',
    },
    {
      datetime: '20/08/2021  7.00pm',
      amount: '₹50.00',
      credit: '₹10.00 credited for ',
      id:'order ID OD123456789001',
    },
    {
      datetime: '20/08/2021  7.00pm',
      amount: '₹10.00',
      credit: '₹10.00 dedited for ',
      id:'order ID OD123456789002',
    },
    {
      datetime: '20/08/2021  7.00pm',
      amount: '₹10.00',
      credit: '₹10.00 debited for ',
      id:'order ID OD123456789003',
    },
    {
      datetime: '20/08/2021  7.00pm',
      amount: '₹20.00',
      credit: '₹10.00 credited for ',
      id:'order ID OD123456789004',
    },
    {
      datetime: '20/08/2021  7.00pm',
      amount: '₹20.00',
      credit: '₹10.00 credited for ',
      id:'order ID OD123456789006',
    },
    {
      datetime: '20/08/2021  7.00pm',
      amount: '₹10.00',
      credit: '₹10.00 debited for ',
      id:'order ID OD123456789007',
    },
    {
      datetime: '20/08/2021  7.00pm',
      amount: '₹80.00',
      credit: '₹10.00 credited for ',
      id:'order ID OD123456789008',
    },
    
  ]


  const Transaction=()=>{

    const renderItem =({item})=>{

        return(

          <View style={styles.order_list}>
                          <View>
                            <View style={styles.order_detail}>
                                 <Text style={{color:globalcolor.PlaceHolderColor}}>{item.datetime}</Text>
                                    <Text style={[item.amount=='₹10.00'?{color:globalcolor.Errorcolor}:{color:globalcolor.Successcolor}]}>{item.amount}</Text> 
                                      </View>
                                        <View style={{flexDirection:'row'}}>         
                                        <Text style={styles.credit_text}>{item.credit} </Text>
                                        <Text style={styles.font}>{item.id}</Text></View>
                                      </View>               
                      </View>
        )

    }

    return(
        <SafeAreaView style={styles.container}>     
              <View>
                  <Text style={styles.search_text}>Search</Text>
              </View>

              {/* search box */}
                <View style={styles.search_bar}>
                    <View style={styles.search_box}>
                        <TextInput style={styles.order_text}
                          placeholder='Enter Order ID'/> 
                            <View style={styles.icon_position}>
                                 <FontAwesome name="search" color={globalcolor.PlaceHolderColor} size={25} />
                             </View>
                    </View>
                  </View>  

                  {/* Date range */}
                       <View>
                          <Text style={styles.search_date}>Date Range</Text>
                       </View>
                       
                        <View style={styles.search_bar}>
                            <View style={styles.search_datebox}>
                                  <Text style={styles.date_input}>
                                          20/08/2021
                                    </Text>
                                  <FontAwesome name="exchange-alt"
                                      color={globalcolor.PlaceHolderColor}
                                      style={{marginTop:15}} size={20}/>
                                           <Text style={styles.date_input}>
                                               20/08/2021
                                             </Text>
                          <View style={styles.icon_position}>
                                <FontAwesome name="calendar" color={globalcolor.PlaceHolderColor} size={25} />
                          </View>

                        </View>


                        </View>  
                        

                  {/* Transaction Details */}


                  <View style={styles.list_position}>

                    <FlatList
                    data={List}
                    renderItem={renderItem}
                    keyExtractor={item => item.id} 
                      />         

                  </View>

          
                  
        </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginTop:80,
    },
    content: {
      flex: 1,
      backgroundColor:'red'
      // marginTop:80,
    },
    search_text:{
  
        marginTop:80,
        marginHorizontal:20,
        fontSize:16,
        color:'#646469'
      },
      search_date:{
  
        
        marginHorizontal:20,
        fontSize:16,
        color:'#646469'
      },
      search_bar:{ 
        width:'95%',
        flexDirection:'row',
        minHeight:50,
        marginVertical:5, 
        marginHorizontal:8, 
        
    
      },  
      search_box:{

        width:'95%',
        elevation:1,
        borderRadius:10,
        marginLeft:10,
        minHeight:40, 
        marginBottom:5,
        
      },  

      search_datebox:{

        width:'95%',
        elevation:1,
        borderRadius:10,
        marginLeft:10,
        marginBottom:5,
        minHeight:40, 
        flexDirection:'row',
        justifyContent:'space-between',
      },  
      order_text:{
          
        marginHorizontal:10,
        fontSize:14,
        color:'#646469',
        fontFamily: globalcolor.Font,
      }, 
      date_input:{
        
        color:'#666666',
        marginHorizontal:20,
        marginTop:15,
        paddingRight:20
      },
      order_list:{
        
        width:'100%',
        elevation:1,
        borderRadius:5,
        flexDirection:'column',
        minHeight:70,
        marginVertical:5
      
        
      
      },
      order_detail:{
        justifyContent:'space-between',
        marginHorizontal:10,       
        flexDirection:'row',
        marginTop:15,
        
      },
      text_position:{
        textAlign:'left',
        marginLeft:20,
        marginVertical:10
      },
      list_position:{
        flex:1,height:'100%',marginVertical:5,marginHorizontal:10,
      },
      font:{
        marginTop:10,color:globalcolor.PlaceHolderColor
      },
      credit_text:{
        marginHorizontal:20,marginVertical:10,color: globalcolor.PlaceHolderColor,
      },
      icon_position:{
        position: 'absolute',zIndex: 1,marginTop: 6,right: 10,
      }

})

  export default Transaction