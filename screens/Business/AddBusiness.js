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
  } from 'react-native';
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import FontAwesome from 'react-native-vector-icons/AntDesign';
  import { Button } from "react-native-paper";
  import Dropdown from "./components/Dropdown";
  import { useCallback } from "react";

 
  

  const AddBusiness =({navigation})=>{

    

    function handleBackButtonClick() {
        console.log(navigation);
        navigation.goBack();
        return true;
      }

      
     
      

    return(

     
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>

                  {/*------------BACK BUTTON START------------------*/}
                  <View style={[globalstyle.BackButton ]}>
                                  <TouchableOpacity onPress={() => handleBackButtonClick()}>
                                    <View style={styles.backbutton}>
                                      <FontAwesome
                                        name="arrowleft"
                                        color={globalcolor.PrimaryColor}
                                        size={22}
                                      />
                                      <Text style={styles.font_position}>Start with the basic (1/4)</Text>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                                {/*------------BACK BUTTON END------------------*/}
                      <View>
                          <View style={styles.content}>
                              <View style={styles.bottom_border}>
                                  <Text>Business name</Text>
                                  <TextInput style={{color:globalcolor.PlaceHolderColor}}
                                  placeholder='Write your business name here'/>
                              </View> 
                        </View>

                        <View style={styles.box_content}> 
                                <Text>Business description</Text>
                                    <View style={styles.box}>
                                        <TextInput style={styles.font}
                                        placeholder='Tell people about your business, location & amenities'/>
                                    </View>   
                        </View>
                        <View style={styles.box_heading}> 
                               <Text>Business category</Text>
                                      <View>
                                          <Dropdown/>
                                      </View>
                            </View>
                            <View style={styles.box_heading}> 
                                <Text>Business sub-category (optional)</Text>
                                      <View>
                                          <Dropdown/>
                                      </View>
                            </View>
                        </View>
                  </View>
             </ScrollView>

              {/* Footer */}
               <View style={styles.footer}>
                    <TouchableOpacity
                       onPress={() => {navigation.navigate('AddBusinessPhoto') }}>
                          <Text style={styles.footer_txt}>
                                  Next
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
    dropdown_box:{
        borderColor:globalcolor.BorderColor,
        borderWidth: 1,
        borderRadius:8,
        width:'100%',
        marginVertical:8,
        minHeight:40,
        flexDirection:'row',
        justifyContent:'space-between',
       
    }, 

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        zIndex: 1,
      },
      buttonText: {
        
        textAlign: 'center',
      },
      dropdown: {
        position: 'absolute',
        top: 50,
        backgroundColor:globalcolor.BorderColor,
        height:'100%',
        width: '100%',
        shadowColor: '#666',
        shadowRadius: 4,
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 0.5,
        zIndex:1,
        elevation:2,
        minWidth: 160,
        shadowOffset: {width: -2, height: 4},
      },
      footer:{
        flex:1,
        width:'100%',
        height:'20%',
        minHeight:50,
        backgroundColor:globalcolor.PrimaryColor,
        position:'relative',
        marginTop:125
      },
      footer_txt:{
        color:globalcolor.Textcolor,
        textAlign:'center',
        fontSize:15,
        marginTop:10,
        position:'relative'
      },
      box_heading:{
        flexDirection:'column',
        marginHorizontal:25,
        marginTop:1
      },
      backbutton:{
        flex: 0.4, 
        marginRight: 20,
        flexDirection:'row'
      },
      font:{
        color:globalcolor.PlaceHolderColor,
        fontSize:12
      },
      box:{
        borderColor:globalcolor.BorderColor,
        borderWidth: 1,
        borderRadius:8,
        width:'100%',
        marginVertical:8,
        minHeight:80
      },
      content:{
        flexDirection:'column',
        marginHorizontal:25,
        
      },
      box_content:{
        flexDirection:'column',
        marginHorizontal:25,
        marginTop:10
      }

})

  export default AddBusiness