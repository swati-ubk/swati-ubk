import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import {ConfigFile} from '../service/ConfigFile';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingsScreen = probs => {
  console.log('settings.........', probs);
  const [image, setImage] = useState(
    'data:image/png;base64,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',
  );
  const [UserData, SetUserData] = useState('');

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        let userdata = await AsyncStorage.getItem('user');

        // SetToken(userToken);
        SetUserData(...UserData, JSON.parse(userdata));
        let alldata = JSON.parse(userdata);
        console.log('All data......', alldata);

        setImage(ConfigFile.ImageBaseUrl + alldata.profilePic.path);
        // SetCoverImage(ConfigFile.ImageBaseUrl+alldata.coverPic.path);

        // setImage(ConfigFile.ImageBaseUrl+alldata.profilePic.path);
        console.log(
          'profilePic.....',
          ConfigFile.ImageBaseUrl + alldata.profilePic.path,
        );
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, []);

  return (
    <View style={[styles.profile, {marginTop: 20}]}>
      {/* <View style={globalstyle.BackButton}>
        <TouchableOpacity
          onPress={() => handleBackButtonClick()}
        >
          <View style={{ flex: 0.2, marginRight: 20 }}>
            <FontAwesome name="arrow-left" color={globalcolor.PrimaryColor} size={20} />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 0.8 }}>
          <Text style={{ color: globalcolor.PrimaryColor, fontFamily: globalcolor.Font, fontSize: 20 }}>
            Account Setting
          </Text>
        </View>

      </View> */}
      <ScrollView style={styles.container}>
        <View style={styles.profile}>
          <Image
            source={{uri: image}} //Change your icon image here
            style={[globalstyle.avaterProfileImage]}
          />
          <Text
            style={{
              color: globalcolor.SeconderColor,
              fontFamily: globalcolor.Font,
            }}>
            {UserData.firstName} {UserData.lastName}
          </Text>
        </View>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('ProfileScreen')}>
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
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('ChangePasswordScreen')}>
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
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('AddressListScreen')}>
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
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('BankAccountScreen')}>
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
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('PayoutScreen')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
                <Image
                  source={require('../assets/img/card.png')} //Change your icon image here
                  style={[globalstyle.ListImage]}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Payout</Text>
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
            onPress={() => probs.navigation.navigate('Passbook')}>
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
                <FontAwesome
                  name="chevron-right"
                  color={globalcolor.SeconderFontColor}
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => probs.navigation.navigate('ReferalNetwork')}>
            <View style={globalstyle.ListCategoryrow}>
              <View style={globalstyle.ListFirstCategoryIcon}>
                <FontAwesome
                  name="share-alt"
                  color={globalcolor.PrimaryColor}
                  size={18}
                />
              </View>
              <View style={globalstyle.ListBody}>
                <Text style={globalstyle.ListText}>Referal Network</Text>
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
          {/* <TouchableOpacity 
           onPress={() => probs.navigation.navigate('AddressScreen')}
           >
          <View style={globalstyle.ListCategoryrow}>
                    <View style={globalstyle.ListFirstCategoryIcon}>
                       <FontAwesome name="briefcase" color={globalcolor.PrimaryColor} size={18} />
                    </View>
                     <View style={globalstyle.ListBody}>
                          <Text style={globalstyle.ListText}>Join as Marchent</Text>
                     </View>
                     <View style={globalstyle.ListSecondIcon}>
                     <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={18} />
                     </View>
          </View>
          </TouchableOpacity> */}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
  },
});
