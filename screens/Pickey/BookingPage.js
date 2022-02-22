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
 import FontAwesome from 'react-native-vector-icons/AntDesign';



 const BookingPage=({navigation})=>{

    function handleBackButtonClick() {
        console.log(navigation);
        navigation.goBack();
        return true;
      }

     return(
        <SafeAreaView style={styles.container}>
                <View style={styles.main_container}>
                    <View style={styles.booking_details}>
                        <TouchableOpacity onPress={() => handleBackButtonClick()}>
                            <FontAwesome name="left" size={25} color='' style={styles.icon_position}/>
                            </TouchableOpacity>
                                <View style={styles.details_box}>
                                    <Text style={styles.small_text}>Dumdum airport</Text>
                                    <Text style={styles.small_text}>14/12/2021, 10:00am</Text>
                                </View>
                    </View>
                    {/* Image */}
                    <ScrollView >
                    <View style={styles.image}>
                        <Image source={require('../../assets/img_pickey/heroimage.png')}
                                style={styles.image_style}/>
                    </View>

                    {/* Second row */}
                    <View style={styles.second_row}>
                            <View style={{marginHorizontal:10,}}>
                                <Text style={styles.bold_text}>New xuv</Text>
                                <Text style={styles.small_text}>Host name: Nayan das</Text>
                            </View>
                            <View style={styles.yellow_box}>
                                <View style={{padding:5}}>
                                    <Text style={styles.yellowbold_text}>$</Text>
                                    <Text style={styles.largebold_text}>50</Text>
                                    <Text style={{textAlign:'center',fontSize:10,marginBottom:6}}>per day</Text>
                                </View>
                            </View> 
                    </View>
                    {/* Trip details */}
                    <View >
                        <Text style={styles.heading}>Trip date</Text>
                            <View style={styles.trip_row}>
                                    <View>
                                        <FontAwesome name="calendar" size={25}  style={styles.icon_position}/>
                                    </View>
                                    <View style={{marginRight:80,marginTop:8}}>
                                        <Text style={styles.font}>Mon, Jan 3 at 10.00AM</Text>
                                        <Text style={styles.font}>Mon, Jan 3 at 10.00AM</Text>
                                    </View>
                                    <View style={{flexDirection:'row',marginTop:20}}>
                                        <Text style={{fontWeight:'bold'}}>Change</Text> 
                                        <FontAwesome name="right" size={20} color='' />
                                    </View>
                            </View>
                    </View>
                    {/* Pickup & return */}
                    <View >
                        <Text style={styles.heading}>Pickup & return</Text>
                            <View style={styles.trip_row}>
                                    <View>
                                    <FontAwesome name="car" size={25}  style={styles.icon_position}/>
                                    </View>
                                    <View style={{marginRight:150,marginTop:10}}>
                                        <Text style={styles.font}>Airport</Text>
                                        
                                    </View>
                                    <View style={{flexDirection:'row',marginTop:10}}>
                                        <Text style={{fontWeight:'bold'}}>Change</Text> 
                                        <FontAwesome name="right" size={20} color='' />
                                    </View>
                            </View>
                    </View>

                    {/* Note box */}
                    <View style={{marginBottom:40}}>
                        <View style={styles.note_box}>
                            <View style={{marginHorizontal:15,marginVertical:10}}>
                                <Text style={styles.font}>Notes:</Text>
                                <Text style={styles.font}>* This car book for minimum 5hrs</Text>
                                <Text style={styles.font}>* Home location pickup and drop should free of &nbsp;cost and other location may charge apply.</Text>
                                <Text style={styles.font}>* Security Deposite will apply  cusomers bill. and it is  &nbsp; auto refund </Text>
                                <Text style={styles.font}>* terms and condition apply</Text>
                            </View>
                        </View>
                    </View>
                    </ScrollView>

                    {/* Checkout */}
                    <View style={styles.footer}>
                             <TouchableOpacity
                                onPress={() => {navigation.navigate('CheckoutInvoice') }}>
                               <Text style={styles.checkout_text}>Checkout</Text>
                        </TouchableOpacity> 
                    </View>
                </View>  
        </SafeAreaView>
     )
 }

 const styles = StyleSheet.create({

    container:{
        flex:1 ,
        marginTop:40,
    },
    main_container:{
        flexDirection:'column',
        
    },
    booking_details:{
        width:'100%',
        minHeight:50,
        flexDirection:'row',
        padding:5,
    },
    icon_position:{
       
        marginTop:8,
        padding:4

    },
   
    image_position:{
       
        minHeight:40,
        minWidth:40,
        

    },
    details_box:{
        elevation:3,
        borderRadius:3,
        width:'90%',
        flexDirection:'column',
        padding:5
        
    },
    small_text:{
        fontFamily:'Roboto',
        fontSize:13,
        textAlign:'left',
        marginLeft:5,
        padding:2
    },
    image_style:{

        resizeMode: "contain",
        height: 140,
        width: 400, 
    
        
    },
    image:{
        top:0,
        padding:0,
        justifyContent:'center',
        width:'100%',
        marginTop:10,
 
    },
    yellow_box:{
        
        minHeight:40,
        minWidth:80,
        borderRadius:12,
        backgroundColor:'yellow',
        elevation:4,
        zIndex:1,
        marginTop:-30,
        marginBottom:15,
        marginHorizontal:10,
        paddingLeft:10
    },
    font:{
        textAlign:'left',
        marginVertical:2,
        fontSize:13
    },
    bold_text:{
        fontFamily:'Roboto',
        fontSize:15 ,
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:5,
        marginTop:10
        
    },
    yellowbold_text:{
        fontFamily:'Roboto',
        fontSize:15 ,
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:5,
        marginBottom:-10
        
    },
    largebold_text:{
        fontFamily:'Roboto',
        fontSize:30 ,
        fontWeight:'900',
        textAlign:'center',
        
        
    },
    second_row:{
        flexDirection:"row",
        justifyContent:'space-between',
        minHeight:50,
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'black' ,
        
        
    },
    trip_row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        paddingVertical:10,
        
    },
    heading:{
        color:'gray',
        marginHorizontal:15,
        marginTop:8,
        fontSize:16
    },
    note_box:{
        minHeight:180,
        minWidth:90,
        backgroundColor:'gainsboro',
        borderRadius:10,
        marginHorizontal:15,
        marginTop:10,
    },
    footer:{
        
        backgroundColor:'yellow',
        height:'40%',
        width:'100%'
    },
    checkout_text:{
        textAlign:'center',
        fontWeight:'bold',
        marginVertical:20
    }
})

 export default BookingPage