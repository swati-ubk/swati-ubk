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
    ActivityIndicator, } from 'react-native';
 import FontAwesome from 'react-native-vector-icons/AntDesign';

 const VerifyPage=({navigation})=>{

    const [hover,setHover] = useState();

    const handleMouseIn = ()=> {
        setHover(true);
    };

    const handleMouseOut = ()=> {
        setHover(true);
    };


    function handleBackButtonClick() {
        console.log(navigation);
        navigation.goBack();
        return true;
      }

    
    return(

        <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.head_section}>
                    <TouchableOpacity onPress={() => handleBackButtonClick()}>
                        <FontAwesome name="left" size={28} color='#000000' style={styles.icon_position}/>
                    </TouchableOpacity>    
                        <Text style={styles.checkout_text}>Phone verify</Text>
                   
                </View>

                {/* Body section */}
                <ScrollView>
                    <View>
                        <Text style={styles.heading}>We sent you a code to verify your phone number</Text>
                            <View style={{paddingBottom:180}}>
                                <Text style={styles.contact_no}>Sent to (+91)9876543210</Text>
                                    <View style={styles.box_position}>
                                        <View style={styles.input_box}>
                                            <TextInput placeholder="4" style={styles.bold_font}/>
                                        </View>
                                        <View style={styles.input_box}>
                                            <TextInput placeholder="2" style={styles.bold_font}/>
                                        </View>
                                        <View style={styles.no_input}>
                                            <TextInput placeholder="" style={styles.bold_font}/>
                                        </View>
                                        <View style={styles.no_input}>
                                            <TextInput placeholder="" style={styles.bold_font}/>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.color_font}>Don’t receive OTP?</Text>
                                        {/* <Text style={styles.colorbold_font}>Get via call</Text> */}
                                    </View>
                            </View>
                             {/* Verify */}
                             <View style={styles.button_position}>
                                        <View style={styles.verify_button}>
                                            <Text style={styles.font}>Verify and continue</Text>
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
        marginTop:5
        
    },
    head_section:{
        flexDirection:'row',
        height:'14%',
        width:'100%',
        backgroundColor:'yellow',
    },
    icon_position:{
        marginTop:35,
        padding:4

    },
    checkout_text:{
        
        fontWeight:'bold',
        textAlign:'center',
        marginTop:45,
        marginLeft:90,
        fontSize:16 
    },
    heading:{
        width:'60%',
        textAlign:'left',
        fontWeight:'bold',
        marginHorizontal:20,
        marginVertical:22,
        fontSize:16
    },
    contact_no:{
        fontSize:15,
        color:'#696969',
        textAlign:'center',
    },
    box_position:{
        flexDirection:'row',
        marginVertical:20,
        marginHorizontal:30,
    },
    input_box:{
        elevation:2,
        // width:'15%',
        // height:'45%',
        minHeight:20,
        minWidth:50,
        borderRadius:2,
        marginHorizontal:10
    },
    bold_font:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center'
    },
    color_font:{
        fontSize:15,
        fontWeight:'300',
        textAlign:'center',
        color:'#006400',
        marginVertical:10
    },
    no_input:{
        elevation:1,
        minHeight:20,
        minWidth:50,
        borderRadius:2,
        marginHorizontal:10
    },
    colorbold_font:{
        fontWeight:'bold',
        color:'#ff0000',
        textAlign:'center',
        marginVertical:10,
        fontSize:15,

    },
    button_position:{
        justifyContent:'center',
        bottom:0,
        marginHorizontal:40,
        marginVertical:20
    },
    verify_button:{
        elevation:2,
        backgroundColor:'#ffff00',
        minWidth:60,
        minHeight:40,
    },
   
    font:{
        textAlign:'center',
        fontWeight:'300',
        color:'#262626',
        marginTop:10
    }
})

 export default VerifyPage