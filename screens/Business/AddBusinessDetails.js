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
    Picker,
    CheckBox
  } from 'react-native';
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import FontAwesome from 'react-native-vector-icons/Ionicons';
  import { Button } from "react-native-paper";
  import Dropdown from "./components/Dropdown";
  import  { useState } from "react";



  const AddBusinessDetails =({navigation})=>{

    const [isSelected, setSelection] = useState(false);

    function handleBackButtonClick() {
        console.log(navigation);
        navigation.goBack();
        return true;
      }

    return(

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View >
                    {/*------------BACK BUTTON START------------------*/}
                    <View style={styles.BackButton }>
                                  <TouchableOpacity onPress={() => handleBackButtonClick()}>
                                    <View style={styles.backbutton}>
                                      <FontAwesome
                                        name="arrow-back"
                                        color={globalcolor.PrimaryColor}
                                        size={22}
                                      />
                                      <Text style={styles.font_position}> Additional Details (4/4)</Text>    
                                    </View>
                                    <View style={{marginLeft:30,}}>
                                        <Text style={styles.font}>Add some more details,it can help customer to connect.</Text>
                                     </View>
                                  </TouchableOpacity>
                                </View>
                       {/*------------BACK BUTTON END------------------*/}

                       {/* Call details */}
                       <View style={styles.box_heading}> 
                                    <Text style={{marginLeft:5}}>Phone number</Text>
                                        <View style={styles.box}>
                                            <TextInput style={styles.placeholder}
                                                placeholder='Write your business phone number here'/>
                                        </View>   
                        </View>

                        {/* mail Deails */}

                        <View style={styles.box_heading}> 
                                    <Text style={{marginLeft:5}}>Email(optional)</Text>
                                        <View style={styles.box}>
                                            <TextInput style={styles.placeholder}
                                                placeholder='Write your business email here'/>
                                        </View>   
                        </View>

                        {/* Website  */}

                        <View style={styles.box_heading}> 
                                    <Text style={{marginLeft:5}}>Website (optional)</Text>
                                        <View style={styles.box}>
                                            <TextInput style={styles.placeholder}
                                                placeholder='Write your business email here'/>
                                        </View>   
                        </View>

                        {/* aadhar details */}

                        <View style={styles.box_heading}> 
                                    <Text style={{marginLeft:5}}>Aadhar number(optional)</Text>
                                        <View style={styles.box}>
                                            <TextInput style={styles.placeholder}
                                                placeholder='Write your website link here   '/>
                                        </View>   
                        </View>

                        {/* Pan details */}

                        <View style={styles.box_heading}> 
                                    <Text style={{marginLeft:5}}>PAN(optional)</Text>
                                        <View style={styles.box}>
                                            <TextInput style={styles.placeholder}
                                                placeholder='Write your business PAN for verification'/>
                                        </View>   
                        </View>

                          {/*  Gst detilas */}

                          <View style={styles.box_heading}> 
                                    <Text style={{marginLeft:5}}>GSTIN(optional)</Text>
                                        <View style={styles.box}>
                                            <TextInput style={styles.placeholder}
                                                placeholder='Write your  GSTIN for tax invoices'/>
                                        </View>   
                        </View> 


                         {/* Tags */}

                         <View style={styles.tag_border}> 
                            <TextInput style={styles.tag}
                                                placeholder='Tags (optional)'/>
                         </View>

                         {/* Referral Code */}

                         <View>
                             <Text style={{color:globalcolor.PrimaryColor,marginLeft:30}}>Do you have a referal code?</Text>
                         </View>

                         {/* CheckList */}
                        <View style={styles.checklist}>
                            <CheckBox
                               value={isSelected}
                               onValueChange={setSelection}
                               style={styles.checkbox}
                             />
                             <Text style={styles.term}>Accept terms and condition</Text>
                        </View>
                         

                </View>
             </ScrollView>
                {/* Footer */}
                <View style={styles.footer}>
                                 <TouchableOpacity
                                    onPress={() => {navigation.navigate('Succesfulmsg') }}>
                                       <Text style={styles.footer_text}>
                                               Save
                                           </Text>
                                </TouchableOpacity>            
                          </View>
        </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:40,
      height:'100%',
      
    },
    font_position:{
        color:globalcolor.PrimaryColor,
        fontSize:16,
        marginHorizontal:10,
        
    },
    BackButton: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
    },
    checkbox: {
        marginLeft:30,
        marginVertical:10
    }, 
    box_heading:{
        flexDirection:'column',
        marginHorizontal:25,
        marginTop:5
    },
    box:{
        borderColor:globalcolor.BorderColor,
        borderWidth: 1,
        borderRadius:8,
        width:'100%',
        marginVertical:8,
        minHeight:30,
    } ,
    placeholder:{
        color:globalcolor.PlaceHolderColor,
        fontSize:12,
        marginHorizontal:5,
    },
    checklist:{
        justifyContent:'flex-start',
        flexDirection:'row'
    },
    font:{
        fontSize:12,
        color:globalcolor.PlaceHolderColor
    },
    footer:{
        flex:1,
        width:'100%',
        height:'20%',
        minHeight:50,
        backgroundColor:globalcolor.PrimaryColor,
        position:'relative',
    },
    footer_text:{
        color:globalcolor.Textcolor,
        textAlign:'center',
        fontSize:15,
        marginTop:10,
        position:'relative'
    },
    tag:{
        marginLeft:30,
        marginBottom:5,
        fontSize:15
    },
    tag_border:{
        borderBottomColor:globalcolor.BorderColor,
        borderBottomWidth:1,
        marginVertical:10
    },
    backbutton:{
        flex: 0.4, 
        marginRight: 20,
        flexDirection:'row'
      },
    term:{
        marginVertical:15,
        color:globalcolor.PlaceHolderColor
    }

})


  export default AddBusinessDetails