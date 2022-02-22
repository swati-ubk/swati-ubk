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
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import FontAwesome from 'react-native-vector-icons/FontAwesome5';

  const BusinessPage =({navigation})=>{

    function handleBackButtonClick() {
        console.log(navigation);
        navigation.goBack();
        return true;
      }
      return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                        <View style={styles.bottom_border}>
                            
                            {/*------------BACK BUTTON START------------------*/}
                                <View style={[globalstyle.BackButton ]}>
                                  <TouchableOpacity onPress={() => handleBackButtonClick()}>
                                    <View style={styles.backbutton}>
                                      <FontAwesome
                                        name="arrow-left"
                                        color={globalcolor.PrimaryColor}
                                        size={20}
                                      />
                                      <Text style={styles.font_position}>A1 grocery shop</Text>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                                {/*------------BACK BUTTON END------------------*/}

                        </View>
                        <View style={styles.position}>
                            <Text style={styles.font_position}>Business information</Text>
                                <View style={styles.edit_box}>
                                    <Text style={styles.box_text}>Edit</Text>
                                </View>
                        </View>
                        {/* 1st Card */}
                        <View style={styles.box}> 
                                <View style={styles.static_input}>
                                    <Text style={styles.input_field}>Business name</Text>
                                    <Text style={styles.input_field}>Description</Text>
                                    <Text style={styles.input_field}>Category</Text>
                                </View>
                                <View style={styles.dynamic_input}>
                                    <Text style={styles.input_field}>A1 Grocery store</Text>
                                    <Text style={styles.input_field}>All type Grocery item available</Text>
                                    <Text style={styles.input_field}>Grocery store</Text>
                                </View>
                        </View>

                        {/* 2nd Card */}
                        <View style={styles.position}>
                            <Text style={styles.font_position}>Business Photos</Text></View>
                        <View style={styles.box}> 
                                <View style={styles.static_input}>
                                    <Text style={styles.image_text}>Photos</Text>
                                </View>
                                <View style={styles.dynamic_input}>
                                <Image source={require('../../assets/img/rectangle.png')}
                                                style={styles.image_style}/>
                                </View>
                        </View>
                        {/* 3rd Card */}

                        <View style={styles.position}>
                            <Text style={styles.font_position}>Business Location</Text></View>
                        <View style={styles.box}> 
                                <View style={styles.static_input}>
                                    <Text style={styles.input_field}>State</Text>
                                    <Text style={styles.input_field}>City</Text>
                                    <Text style={styles.input_field}>Address</Text>
                                </View>
                                <View style={styles.dynamic_input}>
                                    <Text style={styles.input_field}>Bihar</Text>
                                    <Text style={styles.input_field}>Patna</Text>
                                    <Text style={styles.input_field}>A1 grocery shop, nagerbazar, kolkata</Text>
                                </View>
                        </View>

                        {/* 4th Card */}
                        <View style={styles.position}>
                            <Text style={styles.font_position}>Map</Text></View>
                                <View style={styles.box}> 
                                    <View style={styles.image_style}>
                                        <Image source={require('../../assets/img/map.png')}
                                                style={styles.image_style}/>
                                    </View>
                                    
                            
                                </View>
                         {/*Contact Information  */}

                         <View style={styles.position}>
                            <Text style={styles.font_position}>Business Location</Text></View>
                        <View style={styles.box}> 
                                <View style={styles.static_input}>
                                    <Text style={styles.input_field}>Phone</Text>
                                    <Text style={styles.input_field}>Email</Text>
                                    <Text style={styles.input_field}>Website</Text>
                                    <Text style={styles.input_field}>Owner aadhar no.</Text>
                                    <Text style={styles.input_field}>PAN</Text>
                                    <Text style={styles.input_field}>GSTIN</Text>
                                    <Text style={styles.input_field}>Tag</Text>
                                </View>
                                <View style={styles.dynamic_input}>
                                    <Text style={styles.input_field}>Bihar</Text>
                                    <Text style={styles.input_field}>Patna</Text>
                                    <Text style={styles.input_field}>A1 grocery shop, nagerbazar, kolkata</Text>
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
    font_position:{
        color:globalcolor.PlaceHolderColor,
        fontSize:16,
        marginHorizontal:10,
        marginBottom:10
    },
    bottom_border:{
        borderBottomColor:globalcolor.BorderColor,
        borderBottomWidth:1,
        
    },
    image_style: {
        
        minHeight:40,
        width: '100%',
        resizeMode: 'stretch',
        alignItems: 'center',
      },
    input_field:{
        color:globalcolor.PlaceHolderColor,
        fontSize:14,
        textAlign:'left',
        marginTop:12
    },
    backbutton:{
        flex: 0.4, 
        marginRight: 20,
        flexDirection:'row'
      }, 
    dynamic_input:{
        flexDirection:'column',
        width:'60%',
        paddingVertical:10,
        paddingHorizontal:5
    }, 
    static_input:{
        flexDirection:'column',
        width:'40%',
        backgroundColor:'#F0F0F0',
        paddingVertical:10,
        paddingHorizontal:5,
        borderBottomLeftRadius:8,
        borderTopLeftRadius:8
    } ,
    box:{
        flexDirection:'row',
        marginHorizontal:10,
        width:'95%',
        borderColor: '#C4C4C4',
        borderWidth: 1,
        borderRadius:8,
        marginBottom:20
    },
    box_text:{
        color:globalcolor.PrimaryColor,
        fontSize:14,
        textAlign:'center',
        marginTop:5
    },
    position:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:10
    },
    image_text:{
        color:globalcolor.PlaceHolderColor,
        fontSize:15,
        textAlign:'left',
        marginTop:30,
        marginHorizontal:20
    },
    edit_box:{
        borderColor: '#FF9626',
        borderWidth: 1,
        borderRadius:8,
        width:'20%',
        marginHorizontal:10,
        
    }
})

  export default BusinessPage