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
            <View>
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
                        <Text style={styles.font}>Trip summery</Text>
                    </View>
                    <View>
                        <View style={{flexDirection:'row'}}>
                            <View style>

                            </View>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
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
        fontSize:15,
        marginRight:20
    },
    btn:{
        
        minHeight:30,
        width:'50%',
        minWidth:60,
        borderRadius:20,
        backgroundColor:'#ffff00',
        justifyContent:'center'

    },
    font:{
        textTransform:'capitalize',
        color:'#000000',
        fontWeight:'900',
        fontSize:15,
        marginHorizontal:25
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
        fontSize:14,
        color:'#262626',
        
    },
    normal_txt:{
        color:'#262626',
        fontWeight:"300",
        fontSize:14,
        marginVertical:5
    },
    red_txt:{
        color:'red',
        fontWeight:'bold',
        fontSize:14,
        textAlign:'center',
        marginRight:20
        
    },
    trip_summery:{
        marginLeft:20,
        marginVertical:10
    }
})

 export default PreBooking