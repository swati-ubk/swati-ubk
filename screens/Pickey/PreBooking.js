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
    ActivityIndicator, } from 'react-native';
import { Button } from "react-native-paper";
 import FontAwesome from 'react-native-vector-icons/FontAwesome';

 const PreBooking=()=>{

    
    return(
        <SafeAreaView style={styles.container}>

                <View style={styles.header}>
                   
                        <FontAwesome name='bars'size={25}  style={styles.icon_position}/>
                        <Text style={{marginVertical:15,fontWeight:'bold'}}>Pre booking</Text>
                        <FontAwesome name='bell-o'size={25}  style={styles.icon_position}/>
                    
                </View>
                {/* Hero Section */}
                <ScrollView>
                    <View style={styles.img_position}>
                        <Image source={require('../../assets/img_pickey/carherosection.png')}
                                style={styles.image}/>
                    </View>

                    <View>
                        <Text style={styles.large_txt}>Your ride has been Successfully booked</Text>
                         <View style={{marginLeft:110}}>
                             <View style={styles.btn}>
                                 <Text style={styles.font}>Return trip</Text>
                             </View>
                         </View>
                    </View>

                {/* Body section */}

                    <View>
                        <View style={styles.booking_details}>
                            <View style={styles.bottom_border}>
                                <View style={styles.static_data}>
                                    <Text style={styles.bold_txt}>Request ID</Text>
                                    <Text style={styles.normal_txt}>Consumer Name</Text>
                                    <Text style={styles.normal_txt}>Contact Number</Text>
                                    <Text style={styles.normal_txt}>No. of Passengers</Text>
                                </View>
                                <View>
                                    <Text style={styles.bold_txt}>ABC1234567890</Text>
                                    <Text style={styles.normal_txt}>John Doe</Text>
                                    <Text style={styles.normal_txt}>+91-9876543210</Text>
                                    <Text style={styles.normal_txt}>5</Text>
                                </View>  
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginVertical:5}}>
                                 <View>
                                     <Text style={styles.left_txt}>Payment of Mode</Text>
                                     <Text style={styles.red_txt}>CASH</Text>        
                                 </View>
                                 <View style={{borderLeftWidth:1,borderLeftColor:'#c6c6c6',paddingLeft:30,}}>
                                     <Text style={styles.left_txt}>Total Amount</Text>
                                     <Text style={styles.red_txt}>₹6750/-</Text>        
                                 </View>
                            </View>
                        </View>
                    </View>

                {/* Trip summery */}
                    <View>
                        <View style={styles.trip_summery}>
                            <Text style={styles.bold_txt}>Trip summery</Text>
                        </View>
                        <View>
                            <View style={{flexDirection:'row',marginHorizontal:20,marginVertical:5}}>
                                <View style={styles.round_button}></View> 
                                    <View style={{marginLeft:30}}>
                                        <Text style={styles.bold_txt}>Dec 07, 2021    10:00AM</Text>
                                        <Text style={styles.small_txt}>Nagerbazar, Dumdum, Westbengal</Text>
                                    </View>
                            </View>
                            <View style={{flexDirection:'row',marginHorizontal:20,marginVertical:5}}>
                                <View style={styles.round_button}></View> 
                                    <View style={{marginLeft:30}}>
                                        <Text style={styles.bold_txt}>Dec 07, 2021    03:00AM</Text>
                                        <Text style={styles.small_txt}>Nagerbazar, Dumdum, Westbengal</Text>
                                    </View>
                                    <View style={styles.large_button}>
                                        <Text style={{color:'#fff',textAlign:'center',marginTop:8,fontSize:10}}>View details</Text>
                                    </View>
                            </View>

                            {/* Footer */}

                            <View style={styles.footer}>
                                    <Text style={styles.footer_txt}>Introducing pre cab booking</Text>
                                    <Text style={styles.footer_p}>&nbsp;Worried about reaching to bus station or 
                                    coming back to your home from bus station?</Text>
                                <View style={{marginLeft:70}}>
                                    <Image source={require('../../assets/img_pickey/car.png')}
                                    style={styles.small_image}/>
                                </View>
                                <View style={styles.footer_button}>
                                    <Text style={{color:'#fff',textAlign:'center'}}>Book a ride</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            
        
    </SafeAreaView>
    )
 }

 const styles = StyleSheet.create({

    container:{
        flex:1 ,
        marginTop:20,
        
        
    },
    header:{
        width:'100%',
        minHeight:30,
        backgroundColor:'#ffff00',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:5
        
    },
    icon_position:{
       
        marginTop:12,
        padding:4

    },
    position:{
        flexDirection:'row',
        marginHorizontal:10,
        marginVertical:10,
        justifyContent:'space-between'
    },
    image:{
        width:350,
        height:130,
        resizeMode:'contain',
       
    },
    small_image:{
        width:180,
        height:100,
        resizeMode:'contain',
       
    },
    img_position:{
        marginLeft:5,
        marginRight:5
        
    },
    large_txt:{
        textAlign:'center',
        fontSize:20,
        color:'#006400',
        minWidth:20,
        minHeight:40,
        fontWeight:'bold',
        width:'60%',
        marginHorizontal:60,
        marginVertical:10,
        paddingHorizontal:10,
        
    },
    left_txt:{
        textAlign:'left',
        textTransform:'capitalize',
        color:'#000000',
        fontWeight:'900',
        fontSize:13,
        marginRight:20
    },
    btn:{
        
        minHeight:30,
        width:'50%',
        minWidth:50,
        borderRadius:20,
        backgroundColor:'#ffff00',
        justifyContent:'center'

    },
    font:{
        textTransform:'capitalize',
        color:'#000000',
        fontWeight:'900',
        fontSize:13,
        marginHorizontal:30
    },
    booking_details:{
        backgroundColor:'#dcdcdc',
        marginHorizontal:10,
        marginTop:20,
        borderRadius:10,
        minHeight:80,
        width:'95%',
        padding:10
        
    },
    bottom_border:{
        borderBottomColor:'#c6c6c6',
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        paddingBottom:10
  
    },
    static_data:{
        textAlign:'left',
        
    },
    bold_txt:{
        fontWeight:'bold',
        marginVertical:5,
        fontSize:13,
        color:'#262626',
        
    },
    small_txt:{
        fontSize:10,
        color:'#262626',
        
    },
    normal_txt:{
        color:'#262626',
        fontWeight:"300",
        fontSize:13,
        marginVertical:5
    },
    red_txt:{
        color:'red',
        fontWeight:'bold',
        fontSize:13,
        textAlign:'center',
        marginRight:20
        
    },
    trip_summery:{
        marginLeft:30,
        marginTop:10,
        
    },
    round_button:{
        minHeight:10,
        minWidth:10,
        backgroundColor:'#15A412',
        borderRadius:30, 
        padding:8  ,
        position:'absolute',
        marginVertical:8
     },
     large_button:{
         width:'25%',
         height:'20%',
         minWidth:40,
         minHeight:30,
         backgroundColor:'#FE9B07',
         borderRadius:5,
         marginLeft:60,
         marginTop:12

     },
     footer:{
         marginVertical:10,
         marginBottom:20,
         marginHorizontal:8,
         backgroundColor:'#FFF100',
         borderRadius:10,
         minHeight:60,
         width:'96%',
         padding:10
     },
     footer_txt:{
         width:'60%',
         minWidth:50,
         textAlign:'center',
         marginHorizontal:60,
         fontWeight:'bold' 
     },
     footer_p:{
        width:'80%',
        fontSize:13,
        marginLeft:30
 
     },
     footer_button:{
         minHeight:40,
         width:'80%',
         justifyContent:'center',
         borderRadius:10,
         backgroundColor:'#000',
         marginHorizontal:35
     }
})

 export default PreBooking