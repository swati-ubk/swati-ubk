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
 import FontAwesome from 'react-native-vector-icons/FontAwesome5';


 const Recommendation=({navigation})=>{

    function handleBackButtonClick() {
        console.log(navigation);
        navigation.goBack();
        return true;
      }

     return(

        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleBackButtonClick()}>
                        <FontAwesome name='chevron-left'size={25}  style={styles.icon_position}/>
                   </TouchableOpacity>
                        <View style={{justifyContent:'center',marginLeft:40}}>
                             <Text style={{marginVertical:10,fontWeight:'bold',textAlign:"center"}}>Recommended match for:</Text>
                             <Text>DEC 03, 10.00AM - DEC 08, 10.00AM</Text>
                        </View>
               
           </View>
           {/* Hero Section */}
           <ScrollView>
                <View style={styles.img_position}>
                        <Image source={require('../../assets/img_pickey/carherosection.png')}
                                style={styles.image}/>
                </View>
                <View style={styles.second_row}>
                    <View>
                        <Text style={styles.large_txt}>Maruti Suzuki Swift 2015</Text>
                        <View style={{flexDirection:'row',marginTop:-8}} >
                                <Text style={styles.font}>4.02</Text>
                                    <FontAwesome name="star" color='red'size={15} style={styles.icon_style} />
                                <Text style={styles.font}>(105 Trips)</Text>
                                    <FontAwesome name="award" color='#add8e6'size={15} style={styles.icon_style} />
                                <Text style={styles.color_font}>All star host</Text>
                        </View>
                    </View>    
                      
                    <View>
                        <View style={{marginTop:-30}}>
                            <Image source={require('../../assets/img_pickey/avatar.png')}
                            style={styles.small_image}/>
                        </View>
                        <View style={styles.rating_box}>
                                <Text style={styles.rating_txt}>5.0</Text>
                                <FontAwesome name="star" color='red'size={10} style={styles.star_rating}/>
                        </View>
                    </View>
                    
                </View> 
                {/*Body Section */}
                <View style={styles.body}>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <FontAwesome name="check" color='#228b22'size={15} />
                        <Text style={styles.benefit_txt}>Delivery include</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <FontAwesome name="check" color='#228b22'size={15} />
                        <Text style={styles.benefit_txt}>50 miles include, 10.00 fee for each  addtional mile  </Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <FontAwesome name="check" color='#228b22'size={15} />
                        <Text style={styles.benefit_txt}>4 Seats</Text>
                    </View>
                </View>

                {/* Button */}
                <View style={styles.btn_position}>
                    <View style={styles.btn}>
                        <Text style={styles.bold_font}>Checkout with this car</Text>
                    </View>  
                </View>
                <View >
                    <View style={{borderWidth:1,width:'90%',minHeight:40,borderColor:'#000',marginLeft:20,marginVertical:5}}>
                        <Text style={styles.bold_font}>Go to Car details page</Text>
                    </View>
                </View>

                {/* Image */}

                <View style={{marginVertical:10,marginHorizontal:10,}}>
                        <Image source={require('../../assets/img_pickey/sidecar.png')}
                                style={styles.image}/>
                </View>

            </ScrollView>
            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.map}>
                    <FontAwesome name="map-marked-alt" size={20}/>
                    <Text style={styles.bold_font}>Map</Text> 
                </View>
                <View style={styles.filter}>
                    <FontAwesome name="filter" size={20}/>
                    <Text style={styles.bold_font}>Filter</Text> 
                </View>
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
        minHeight:50,
        
        padding:10,
        flexDirection:'row',
        paddingHorizontal:5
        
    },
    icon_position:{
       
        marginTop:12,
        marginLeft:10,
        padding:4,
       

    },
    img_position:{
        marginLeft:5,
        marginRight:5,
        padding:5,
        
        
    },
    image:{
        width:340,
        height:140,
        resizeMode:'stretch',
       
    },
    
    large_txt:{
        textAlign:'left',
        fontSize:18,
        color:'#262626',
        minHeight:40,
        fontWeight:'900',
        width:'100%',
        marginTop:5,  
    },
    small_image:{
        width:60,
        height:60,
        resizeMode:'contain',
       
    },
    second_row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:25,
        
        
    },
    rating_box:{
        width:'40%',
        minWidth:60,
        minHeight:25,
        padding:10,
        elevation:4,
        borderRadius:15,
        marginTop:-5,
        backgroundColor:'#fff',
        flexDirection:'row'

    },
    rating_txt:{
        textAlign:'center',
        fontSize:15,
        marginVertical:-10,
        marginHorizontal:5
        
    },
    star_rating:{
        marginTop:-4.8,
        
    },
    font:{
        textAlign:'left',
        fontSize:15,
        marginHorizontal:5
      
    },
    icon_style:{
        marginTop:3,
        marginHorizontal:4
    },
    color_font:{
        color:'#CCC100',
        fontWeight:'900'
    },
    body:{
        marginHorizontal:20,
        marginTop:15,
        
        
    },
    benefit_txt:{
        textAlign:'left',
        fontSize:14,
        marginHorizontal:20,  
    },
    btn:{
        padding:5,
        width:'100%',
        minHeight:30,
        backgroundColor:'#ffff00',
        borderRadius:2,
        elevation:2
    },
    blank_btn:{
        padding:5,
        width:'100%',
        minHeight:20,
        
        borderRadius:2,
        elevation:2
    },
    btn_position:{
        marginVertical:10,marginHorizontal:20,
    },
    bold_font:{
        textAlign:'center',
        fontWeight:'900',
        padding:5
       
    },
    footer:{
        width:'100%',
        minHeight:40,
        backgroundColor:'yellow',
        flexDirection:'row'
    },
    map:{
        justifyContent:'center',
        flexDirection:'row',
        marginHorizontal:5,
        marginVertical:10,
        width:'50%'
    },
    filter:{
        justifyContent:'center',
        flexDirection:'row',
        marginHorizontal:5,
        marginVertical:10,
        width:'50%',
        borderLeftWidth:1
    }
})

 export default Recommendation