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

    const CheckoutInvoice=({navigation})=>{

        function handleBackButtonClick() {
            console.log(navigation);
            navigation.goBack();
            return true;
          }

        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.booking_details}>
                         <TouchableOpacity onPress={() => handleBackButtonClick()}>
                                <FontAwesome name="left" size={25} color='' style={styles.icon_position}/>
                            </TouchableOpacity>
                            <View style={styles.details_box}>
                                <Text style={styles.small_text}>Dumdum airport</Text>
                                <Text style={styles.small_text}>14/12/2021, 10:00am</Text>
                            </View>
                    </View>
                </View>
                <ScrollView>
                    {/* Start trip */}
                    <View style={styles.bottom_border}>
                         <View style={styles.tripstart_duration}>
                             <Text style={styles.large_font}>Your trip:</Text>
                             <TextInput placeholder="Total Days count" style={{marginTop:-10}}/>
                         </View>
                         <View style={styles.tripend_duration}>
                             <Text style={styles.medium_font}>Start</Text>
                                 <View style={{flexDirection:'row',marginLeft:20,justifyContent:'space-between'}}>
                                     <View style={styles.box}><Text>30/12/2021</Text></View>
                                     <View style={styles.box}><Text>10.00AM</Text></View>
                                     <FontAwesome name='calendar' size={25} style={styles.calendaricon_position}/>
                                 </View>
                         </View>
                         {/* End trip */}
                        
                         <View style={styles.tripend_duration}>
                            <Text style={styles.medium_font}>End</Text>
                                 <View style={{flexDirection:'row',marginLeft:28}}>
                                     <View style={styles.box}><Text>01/01/2022</Text></View>
                                     <View style={styles.box}><Text>10.00AM</Text></View>
                                     <FontAwesome name='calendar' size={25} style={styles.calendaricon_position}/>
                                 </View>
                         </View>
                    </View>
                    {/* Invoice */}
                    <View style={styles.invoice_style}>
                        <View>
                            <Text style={styles.space_txt}>Taxes (16%) : </Text>
                            <Text style={styles.space_txt}>Services fee(14%) :</Text>
                            <Text style={styles.space_txt}>Pickup fee : </Text>
                            <Text style={styles.space_txt}>Security deposite : </Text>
                        </View>
                        <View>
                            <Text style={styles.space_txt}>$ 8</Text>
                            <Text style={styles.space_txt}>$ 7</Text>
                            <Text style={styles.space_txt}>$ 2</Text>
                            <Text style={styles.space_txt}>$ 5</Text>
                        </View>
                       
                    </View>
                        <View style={styles.final_row}>
                            <Text style={styles.bold_font}>Total price:</Text>
                            <Text style={styles.bold_font}>$111</Text>
                        </View>
                </ScrollView>
                {/* Checkout */}
                <View style={styles.footer}>
                             <TouchableOpacity
                                onPress={() => {navigation.navigate('CheckoutInvoice') }}>
                               <Text style={styles.checkout_text}>Continue</Text>
                            </TouchableOpacity> 
                </View>
            </SafeAreaView>
        )
    }

    const styles = StyleSheet.create({

        container:{
            flex:1 ,
            marginTop:40,
        },
        booking_details:{
            width:'100%',
            minHeight:50,
            flexDirection:'row',
            padding:5,
        },
        small_text:{
            fontFamily:'Roboto',
            fontSize:13,
            textAlign:'left',
            marginLeft:5,
            padding:2
        },
        details_box:{
            elevation:3,
            borderRadius:3,
            width:'90%',
            flexDirection:'column',
            padding:5
            
        },
        icon_position:{
       
            marginTop:8,
            padding:2,
            justifyContent:'flex-end'
    
        },
        calendaricon_position:{
       
            marginTop:8,
            padding:2,
            marginLeft:30
    
        },
        checkout_text:{
            textAlign:'center',
            fontWeight:'bold',
            marginVertical:20
        },
        footer:{
        
            backgroundColor:'#ffff00',
            height:'10%',
            width:'100%'
        },
        large_font:{
            fontSize:18,
            color:'#262626'
        },
        bold_font:{
            fontWeight:'bold',
            marginLeft:10,
            fontSize:18,
            color:'#262626'
        },
        box:{
            minHeight:20,
            minWidth:60,
            borderWidth:1,
            borderRadius:2,
            margin:4,
            padding:5,
            marginHorizontal:10
            
        },

        medium_font:{
            marginLeft:10,
            marginVertical:5,
            color:'#262626',
            fontSize:15
        },
        tripstart_duration:{
            flexDirection:'row',marginHorizontal:20,marginTop:10
        },
        tripend_duration:{
            flexDirection:'row',marginHorizontal:20,width:'100%',
        },
        bottom_border:{
            borderBottomWidth:1,
            paddingBottom:20
        },
        invoice_style:{
            marginHorizontal:10,
            marginVertical:10,
            flexDirection:'row',
            justifyContent:'space-between',
            borderBottomWidth:1
        },
        space_txt:{
            marginVertical:12,
            marginHorizontal:10,
            color:'#262626',
            textAlign:'left'
        },
        final_row:{
            justifyContent:'space-between',flexDirection:'row',marginHorizontal:20
        }

    })

    export default CheckoutInvoice