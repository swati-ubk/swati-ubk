
  import React from 'react';
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
    Linking,
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/Ionicons';
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import Dropdown from './components/Dropdown';

  const AddBusinessLocation=({navigation})=>{

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
                                        name="arrow-back"
                                        color={globalcolor.PrimaryColor}
                                        size={22}
                                      />
                                      <Text style={styles.font_position}>Start with the basic (3/4)</Text>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                       {/*------------BACK BUTTON END------------------*/}

                       <View style={{flex:1,height:'100%'}}>
                                <View style={styles.box_heading}> 
                                    <Text>State</Text>
                                        <View>
                                            <Dropdown/>
                                        </View>
                                </View>

                                <View style={styles.box_heading}> 
                                    <Text>City</Text>
                                        <View>
                                            <Dropdown/>
                                        </View>
                                </View>

                                <View style={styles.box_heading}> 
                                    <Text>Address</Text>
                                        <View style={styles.box}>
                                            <TextInput style={styles.placeholder}
                                                placeholder='Write your business address in details,it may help people
                                                to find to easily.'/>
                                        </View>   
                                </View>
                       </View>


                        {/* Image */}
                       <View style={{marginTop:10}}>
                            <Image source={require('../../assets/img/locationmap.png')} 
                            style={styles.image_style}/>
                       </View>

                       
                    </View>
            </ScrollView>
            {/* Footer */}
            <View style={styles.footer}>
                                 <TouchableOpacity
                                    onPress={() => {navigation.navigate('AddBusinessDetails') }}>
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
    footer_txt:{
      color:globalcolor.Textcolor,
      textAlign:'center',
      fontSize:15,
      marginTop:10,
      position:'relative'
    },
    footer:{
      flex:1,
      width:'100%',
      height:'20%',
      minHeight:50,
      backgroundColor:globalcolor.PrimaryColor,
      position:'relative',
      marginTop:20
    },
    image_style:{
      minHeight:50, 
      resizeMode: 'stretch', 
      alignItems: 'center',
      borderRadius:5
    },
    box:{
      borderColor:globalcolor.BorderColor,
      borderWidth: 1,
      borderRadius:8,
      width:'100%',
      marginVertical:8,
      minHeight:60,
    },
    placeholder:{
      color:globalcolor.PlaceHolderColor,
      fontSize:12,
      marginHorizontal:10,
      minWidth:80,
      position:'absolute',
      
    },
    box_heading:{
      flexDirection:'column',
      marginHorizontal:25
    },
    backbutton:{
      flex: 0.4, 
      marginRight: 20,
      flexDirection:'row'
    }

})
  export default AddBusinessLocation