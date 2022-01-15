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
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOjMyOTBjNTNjLWI1NmEtNGU0OC05YzIwLTRmNzYzZDU4N2Q3MjwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmNlMDA3MDk5LWVkYjYtNGRkYi1hNTFmLTY2NzMzZDM0MWQwZDwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/8AACwgA8ADwAQERAP/EABwAAQACAwEBAQAAAAAAAAAAAAAHCAEFBgIEA//EADkQAAEDAgIFCAkEAwEAAAAAAAABAgMEBQYRByExQVESFDZxdIGRshMiJENicqGxwRYjYdEyU4Iz/9oACAEBAAA/ALNgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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',
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
        if (alldata.profilePic.hasOwnProperty('path')) {
          setImage(ConfigFile.ImageBaseUrl + alldata.profilePic.path);
        }

        // SetCoverImage(ConfigFile.ImageBaseUrl+alldata.coverPic.path);

        // setImage(ConfigFile.ImageBaseUrl+alldata.profilePic.path);
        // console.log(
        //   'profilePic.....',
        //   ConfigFile.ImageBaseUrl + alldata.profilePic.path,
        // );
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
