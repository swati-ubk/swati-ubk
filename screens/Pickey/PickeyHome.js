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
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome5';
 

  const PickeyHome=(probs)=>{
      return(
          <SafeAreaView style={styles.container}>
             
                     <View style={styles.profile}>
                        
                            <TouchableOpacity
                          onPress={() => probs.navigation.navigate('BookingPage')}>
                          <View style={styles.ListCategoryrow}>
                            <View style={styles.ListFirstCategoryIcon}>
                              <FontAwesome
                                name="car-alt"
                                size={25}
                              />
                            </View>
                            <View style={styles.ListBody}>
                              <Text style={styles.ListText}>Booking Page</Text>
                            </View>
                            <View style={styles.ListSecondIcon}>
                              <FontAwesome
                                name="chevron-right"
                                
                                size={18}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => probs.navigation.navigate('VerifyPage')}>
                          <View style={styles.ListCategoryrow}>
                            <View style={styles.ListFirstCategoryIcon}>
                              <FontAwesome
                                name="car-alt" 
                                
                                size={25}
                              />
                            </View>
                            <View style={styles.ListBody}>
                              <Text style={styles.ListText}>Verify Page</Text>
                            </View>
                            <View style={styles.ListSecondIcon}>
                              <FontAwesome
                                name="chevron-right"
                                
                                size={18}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => probs.navigation.navigate('PreBooking')}>
                          <View style={styles.ListCategoryrow}>
                            <View style={styles.ListFirstCategoryIcon}>
                              <FontAwesome
                                name="car-alt" 
                                
                                size={25}
                              />
                            </View>
                            <View style={styles.ListBody}>
                              <Text style={styles.ListText}>Pre Booking Page</Text>
                            </View>
                            <View style={styles.ListSecondIcon}>
                              <FontAwesome
                                name="chevron-right"
                                
                                size={18}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => probs.navigation.navigate('Recommendation')}>
                          <View style={styles.ListCategoryrow}>
                            <View style={styles.ListFirstCategoryIcon}>
                              <FontAwesome
                                name="car-alt" 
                                
                                size={25}
                              />
                            </View>
                            <View style={styles.ListBody}>
                              <Text style={styles.ListText}>On Recommendation</Text>
                            </View>
                            <View style={styles.ListSecondIcon}>
                              <FontAwesome
                                name="chevron-right"
                                
                                size={18}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => probs.navigation.navigate('PopUp')}>
                          <View style={styles.ListCategoryrow}>
                            <View style={styles.ListFirstCategoryIcon}>
                              <FontAwesome
                                name="car-alt" 
                                
                                size={25}
                              />
                            </View>
                            <View style={styles.ListBody}>
                              <Text style={styles.ListText}>Pop Up</Text>
                            </View>
                            <View style={styles.ListSecondIcon}>
                              <FontAwesome
                                name="chevron-right"
                                
                                size={18}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                     </View>
               
            </SafeAreaView>
      )
   }

   const styles = StyleSheet.create({

    container:{
        flex:1 ,
        marginBottom:20,
        marginHorizontal:20
    },
    profile: {
      flex: 1, 
      alignItems: 'center', 
      marginTop:60,
      flexDirection:'column',
  
     // justifyContent: 'center'
    },
    chooseimage:{
      alignItems: 'center', 
      position:'absolute',
      marginTop:95,
      marginLeft:80,
      
      
    },
    coverbackground:{
      marginTop:20,
      borderRadius : 10,
      width: '90%',
      borderStyle: 'dashed',
      borderWidth: 2,
      
    },
    ListCategoryrow: {
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 8,
      marginRight: 5,
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      backgroundColor: '#fff',
      borderRadius: 10,
  
      elevation: 5,
    },
    ListFirstCategoryIcon: {
      width: '20%',
      marginLeft: 10,
      //backgroundColor:globalcolor.Separator,
      padding: 20,
    },
    ListSecondIcon: {
      alignSelf: 'center',
      width: '20%',
      padding: 20,
    },
    ListBody: {
      width: '60%',
      padding: 20,
      alignSelf: 'center',
    },
    ListText: {
      // fontFamily: globalcolor.Font,
      // color: globalcolor.SeconderFontColor,
    },
    coverphoto:{
      alignItems: 'center', 
      padding:30
    },
    action: {
      flex:1,
      width:'90%',
      marginTop: 10,
      paddingBottom: 5
    },
    do_list:{

        flex:0.1,
        width:'100%',
        height:'50%',
        marginHorizontal:10,
        marginVertical:10,
        elevation:4,
        borderRadius:10

    },
    list_title:{

        textAlign:'left',
        marginLeft:20,
        fontSize:16,
        marginTop:10,
        color:'#666666'

    }
  
    
  });

   export default PickeyHome