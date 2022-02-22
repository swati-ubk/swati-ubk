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
  import { useState } from 'react';
  import { Icon } from 'react-native-elements';
  import {globalcolor} from '../../../style/globalcolor';
  import {globalstyle} from '../../../style/globals';
  import FontAwesome from 'react-native-vector-icons/AntDesign';



  const Dropdown=()=>{

    const [visible, setVisible] = useState(false);
      
      
      
  const toggleDropdown = () => {
    setVisible(!visible);
  };
  
  

  const renderDropdown = () => {
    if (visible) {
      return (
          <View style={styles.dropdown}>
              <View style={{minWidth:200,borderBottomColor:globalcolor.PrimaryColor,borderBottomWidth:1,paddingVertical:5,}}>
                  <Text style={{textAlign:'center',color:globalcolor.PlaceHolderColor}}>Grocery Store</Text>
              </View>    
              <View style={{minWidth:200,borderBottomColor:globalcolor.PrimaryColor,borderBottomWidth:1,paddingVertical:5,}}>
                  <Text style={{textAlign:'center',color:globalcolor.PlaceHolderColor}}>Garments House</Text>
              </View>  
              <View style={{minWidth:200,borderBottomColor:globalcolor.PrimaryColor,borderBottomWidth:1,paddingVertical:5,}}>
                  <Text style={{textAlign:'center',color:globalcolor.PlaceHolderColor}}>Automobile Shop</Text>
              </View>
              <View style={{minWidth:200,borderBottomColor:globalcolor.PrimaryColor,borderBottomWidth:1,paddingVertical:5,}}>
                  <Text style={{textAlign:'center',color:globalcolor.PlaceHolderColor}}>Cosmetics Shop</Text>
              </View>    
            
           
          </View>
      );
    }
  };

    return(
        <View style={styles. dropdown_box}>
              <TouchableOpacity
              style={styles.button}
              onPress={toggleDropdown}>
              {renderDropdown()}
              <Text style={{color:globalcolor.PlaceHolderColor,fontSize:12}}>Select business category</Text>
               <FontAwesome name="down" color={globalcolor.PlaceHolderColor} size={20} style={{ marginTop:2,marginLeft:120}}/> 
            </TouchableOpacity>
      </View>
      
    )
  }


  const styles = StyleSheet.create({

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
        minHeight:120,
        width: '100%',
        
        shadowRadius: 10,
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 5,
        zIndex:1
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

    })

  export default Dropdown