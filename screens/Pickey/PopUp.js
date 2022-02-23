import React , { useState }from "react";
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
 import FontAwesome from 'react-native-vector-icons/FontAwesome5';
 import { Modal, Pressable } from "react-native";


 const PopUp=({navigation})=>{

    function handleBackButtonClick(){
        console.log(navigation);
        navigation.goBack();
        return true;

    }
    
     return(
        <SafeAreaView style={styles.container}>
            <View style={styles.popup_position}>
                 <View style={styles.popup}>
                     <TouchableOpacity onPress={()=>handleBackButtonClick()}>
                         <FontAwesome name='chevron-left'size={25} />
                            </TouchableOpacity>
                             <Text style={styles.font}>Where</Text>
                     </View>
                     <View style={styles.bottom_border}>
                         <FontAwesome name="paper-plane" size={20}/>
                            <Text style={styles.font}>Dumdum airport</Text>
                     </View>
                     <View style={{marginBottom:50}}> 
                        <Text style={styles.trip_font}>Trip updates</Text>
                           <View style={styles.bottom_border}>
                                       <FontAwesome name="calendar" size={20}/>
                               <Text style={styles.small_font}>14/12/2021, 10:00am</Text>
                                       <FontAwesome name="long-arrow-alt-right" size={20}/>
                               <Text style={styles.small_font}>18/12/2021, 10:00am</Text>
                           </View>
                        </View>
                     <View style={styles.search_btn}>
                        <Text style={styles.search_txt}>Search</Text>
                     </View>
                   
                </View>


                {/* Review Carousel */}

                <View>
                    <View style={{flexDirection:'row',flex:1,marginVertical:30,marginHorizontal:5}}>
                        <View style={styles.carousel}>
                            <View style={styles.carousel_upper}>
                                <View style={{flexDirection:'row',marginTop:10}}>
                                    <Text style={styles.small_carouselfont}>John doe</Text>
                                    <FontAwesome name="award" size={20}/>
                                    <Text style={styles.small_font}>All star host</Text>
                                </View>
                                <View style={styles.review_paragraph}>
                                    <FontAwesome name="quote-left" size={15}/>
                                    <Text style={{fontSize:10,fontStyle:'italic',marginTop:10}}>Lorem Ipsum is simply dummy text of the printing andtypesetting industry.Lorem Ipsum is simply dummy
                                     text of the printing and typesetting industry.</Text>
                                </View>
                                
                            </View>
                            <View style={styles.lower_carosel}>
                                <FontAwesome name="star-half-alt" size={15} color='red' style={{marginLeft:10}}/>
                                <View style={styles.image_position}>
                                <Image source={require('../../assets/img_pickey/avatar.png')}
                                        style={styles.image}/>
                                </View>
                                <View>
                                    <Text style={styles.small_carouselfont}>2,221 trip</Text>
                                    <Text style={styles.small_carouselfont}>Joined Aug 2021</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
        </SafeAreaView>
     )
 }



 const styles = StyleSheet.create({

    container:{
        flex:1 ,
        marginTop:20,
        backgroundColor:'#f5f5dc'
         
    },
    popup_position:{
        flex:0.4,
        minHeight:40,
        elevation: 5,
        shadowColor: '#52006A',
        
    },
    popup:{
        width:'100%',
        flexDirection:'row',
        marginVertical:20,
        marginHorizontal:10,
        borderRadius:10
        
    },
    bottom_border:{
        flexDirection:'row',
        borderBottomColor:'#ffd700',
        borderBottomWidth:1,
        marginHorizontal:20,
        paddingBottom:10,
    },
    font:{
        fontSize:15,
        marginHorizontal:10,
        
    },
    trip_font:{
        fontSize:15,
        marginHorizontal:20,
        marginVertical:20
        
    },
    small_font:{
        fontSize:12,
        marginHorizontal:10,
        
    },
    small_carouselfont:{
        fontSize:11,
        marginHorizontal:12,
        
    },
    search_btn:{
        width:'98%',
        minHeight:45,
        backgroundColor:'#ffff00',
        bottom:0,
        marginHorizontal:4,
        position:'absolute'

    },
    search_txt:{
        textAlign:'center',
        marginTop:10,
        fontWeight:'bold',
        
    },
    carousel:{
        width:'80%',
        position:'absolute',
        minHeight:130,
        minWidth:50,
        elevation:2,
        shadowOffset:{ width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowColor: '#000',
        borderRadius:10
        
    },
    carousel_upper:{
        minHeight:90,
        minWidth:50,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:'#CCC100',
       
        
    },
    review_paragraph:{
       width:'85%',
        minWidth:30,
        minHeight:60,
        flexDirection:'row',
        marginHorizontal:10, 
        marginVertical:5
        
    },
    lower_carosel:{
        justifyContent:'space-between',
        flexDirection:'row',
        
        marginVertical:5
    },
    image_position:{
        marginTop:-20
    },
    image:{
        height:40,
        width:50,
        resizeMode:'contain',
        marginLeft:70
    }
    
})

 export default PopUp