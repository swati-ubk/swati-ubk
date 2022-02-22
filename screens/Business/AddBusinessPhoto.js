
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
  
  const AddBusinessPhoto = ({navigation}) => {


    function handleBackButtonClick() {
      console.log(navigation);
      navigation.goBack();
      return true;
    }


    return (

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
                                      <Text style={styles.font_position}>Start with the basic (2/4)</Text>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                                {/*------------BACK BUTTON END------------------*/} 
                                <View style={styles.content}>
                                   <View style={{marginHorizontal:20,marginTop:30,}}>
                                       <Text>Add business photo</Text>
                                   </View>
                                   <View style={styles.image_box}>
                                         <FontAwesome name='cloud-upload-outline'size={40} color={globalcolor.BorderColor} style={{marginLeft:130, marginTop:15}}/>
                                         <Text style={styles.upload_text}>Choose your file location</Text>
                                   </View>
                                </View>     
                </View>
          </ScrollView>
            {/* Footer */}
            <View style={styles.footer}>
                                 <TouchableOpacity
                                    onPress={() => {navigation.navigate('AddBusinessLocation') }}>
                                       <Text style={styles.footer_txt}>
                                               Next
                                           </Text>
                                </TouchableOpacity>            
                          </View>   
        </SafeAreaView>
    
    );
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
    content:{
      flex:1,
      marginBottom:280
    },

    image_box:{
      height:'20%',
      width:'90%',
      minHeight:150,
      marginHorizontal:20,
      marginVertical:15,
      paddingVertical:30,
      borderRadius:10,
      borderColor:'#000',
      borderWidth: 1,
      borderStyle:'dotted',
      flexDirection:'column'

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
    upload_text:{
      textAlign:'center',
      color:globalcolor.BorderColor,
    },
    backbutton:{
      flex: 0.4, 
      marginRight: 20,
      flexDirection:'row'
    }

  })
  
  export default AddBusinessPhoto;




   

  