import React from 'react';
import { View, Text, Button, StyleSheet,SafeAreaView,Image,TextInput,ScrollView } from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import { Avatar } from 'react-native-paper';

const BookmarkScreen = () => {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
        <View style={styles.profile}> 
             <Avatar.Image
                  source={require('../assets/img/avtar.png')} //Change your icon image here
                  style={[globalstyle.avaterImage,globalstyle.BorderRadius50]}
              />
               <Text style={{color:globalcolor.SeconderColor,fontFamily:globalcolor.Font}}>Rohit kumar</Text>
          </View>
          <View style={globalstyle.ListCategoryrow}>
                    <View style={globalstyle.ListFirstCategoryIcon}>
                    <Image
                     source={require('../assets/img/edit.png')} //Change your icon image here
                     style={[globalstyle.ListImage]}
                    />
                    </View>
                     <View style={globalstyle.ListBody}>
                          <Text style={globalstyle.ListText}>Edit profile</Text>
                     </View>
                     <View style={globalstyle.ListSecondIcon}>
                     <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={20} />
                     </View>
          </View>
          <View style={globalstyle.ListCategoryrow}>
                    <View style={globalstyle.ListFirstCategoryIcon}>
                      <Image
                      source={require('../assets/img/padlock.png')} //Change your icon image here
                      style={[globalstyle.ListImage]}
                      />
                    </View>
                     <View style={globalstyle.ListBody}>
                          <Text style={globalstyle.ListText}>Change Password</Text>
                     </View>
                     <View style={globalstyle.ListSecondIcon}>
                     <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={20} />
                     </View>
          </View>
          <View style={globalstyle.ListCategoryrow}>
                    <View style={globalstyle.ListFirstCategoryIcon}>
                      <Image
                      source={require('../assets/img/pin.png')} //Change your icon image here
                      style={[globalstyle.ListImage]}
                      />
                    </View>
                     <View style={globalstyle.ListBody}>
                          <Text style={globalstyle.ListText}>Address</Text>
                     </View>
                     <View style={globalstyle.ListSecondIcon}>
                     <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={20} />
                     </View>
          </View>
          <View style={globalstyle.ListCategoryrow}>
                    <View style={globalstyle.ListFirstCategoryIcon}>
                      <Image
                      source={require('../assets/img/museum.png')} //Change your icon image here
                      style={[globalstyle.ListImage]}
                      />
                    </View>
                     <View style={globalstyle.ListBody}>
                          <Text style={globalstyle.ListText}>Bank Account</Text>
                     </View>
                     <View style={globalstyle.ListSecondIcon}>
                     <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={20} />
                     </View>
          </View>
          <View style={globalstyle.ListCategoryrow}>
                    <View style={globalstyle.ListFirstCategoryIcon}>
                        <Image
                        source={require('../assets/img/card.png')} //Change your icon image here
                        style={[globalstyle.ListImage]}
                        />
                    </View>
                     <View style={globalstyle.ListBody}>
                          <Text style={globalstyle.ListText}>payout</Text>
                     </View>
                     <View style={globalstyle.ListSecondIcon}>
                        <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={20} />
                     </View>
          </View>
          <View style={globalstyle.ListCategoryrow}>
                    <View style={globalstyle.ListFirstCategoryIcon}>
                      <Image
                      source={require('../assets/img/passbook.png')} //Change your icon image here
                      style={[globalstyle.ListImage]}
                      />
                    </View>
                     <View style={globalstyle.ListBody}>
                          <Text style={globalstyle.ListText}>Passbook</Text>
                     </View>
                     <View style={globalstyle.ListSecondIcon}>
                     <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={20} />
                     </View>
          </View>
          <View style={globalstyle.ListCategoryrow}>
                    <View style={globalstyle.ListFirstCategoryIcon}>
                       <FontAwesome name="share-alt" color={globalcolor.PrimaryColor} size={20} />
                    </View>
                     <View style={globalstyle.ListBody}>
                          <Text style={globalstyle.ListText}>Referal Network</Text>
                     </View>
                     <View style={globalstyle.ListSecondIcon}>
                     <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={20} />
                     </View>
          </View>
          <View style={globalstyle.ListCategoryrow}>
                    <View style={globalstyle.ListFirstCategoryIcon}>
                       <FontAwesome name="briefcase" color={globalcolor.PrimaryColor} size={20} />
                    </View>
                     <View style={globalstyle.ListBody}>
                          <Text style={globalstyle.ListText}>Join as Marchent</Text>
                     </View>
                     <View style={globalstyle.ListSecondIcon}>
                     <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={26} />
                     </View>
          </View>
         
         
          
         
          
          
          
        </SafeAreaView>
         
      </ScrollView>
    );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop:30,
  },
  profile: {
    flex: 1, 
     alignItems: 'center', 
     textAlignVertical:'center',
     marginBottom:10
   },
});
