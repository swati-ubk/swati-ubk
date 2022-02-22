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
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
 

 

  const BusinessHome=(probs)=>{ 

    return(
       
        <SafeAreaView style={styles.container} >
          <ScrollView>
          <View style={styles.profile}>
              <Text style={{marginBottom:10, fontSize:20}}>Hello Business page!....</Text>

              <TouchableOpacity
            onPress={() => probs.navigation.navigate('VendorHome')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
                <FontAwesome
                  name="user" 
                  color={globalcolor.PrimaryColor}
                  size={25}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Vendor</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => probs.navigation.navigate('OrderList')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
              <FontAwesome
                  name="list" 
                  color={globalcolor.PrimaryColor}
                  size={20}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Order List</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('Transaction')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
              <FontAwesome
                  name="money" 
                  color={globalcolor.PrimaryColor}
                  size={24}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Transaction</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('Balance')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
              <FontAwesome
                  name="rupee" 
                  color={globalcolor.PrimaryColor}
                  size={25}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Balance</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('settlement')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
              <FontAwesome
                  name="thumbs-o-up" 
                  color={globalcolor.PrimaryColor}
                  size={24}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Settlement</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('ItemList')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
              <FontAwesome
                  name="list-alt" 
                  color={globalcolor.PrimaryColor}
                  size={20}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Item List</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('TaxInvoice')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
              <FontAwesome
                  name="list-alt" 
                  color={globalcolor.PrimaryColor}
                  size={20}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>TaxInvoice</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('BusinessPage')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
              <FontAwesome
                  name="list-alt" 
                  color={globalcolor.PrimaryColor}
                  size={20}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Business Page</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('AddBusiness')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
              <FontAwesome
                  name="list-alt" 
                  color={globalcolor.PrimaryColor}
                  size={20}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Add Business</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('PickeyBooking')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
              <FontAwesome
                  name="list-alt" 
                  color={globalcolor.PrimaryColor}
                  size={20}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Pickey Booking Page</Text>
              </View>
              <View style={globalstyle.ListSecondIcon}>
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>

              
          </View>
          </ScrollView>
        </SafeAreaView>
       

        
    )
  }

  export default BusinessHome

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
      color:globalcolor.PrimaryColor
      
    },
    coverbackground:{
      marginTop:20,
      borderRadius : 10,
      width: '90%',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderColor: globalcolor.SeconderColor
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