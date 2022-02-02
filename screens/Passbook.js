import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ConfigFile} from '../service/ConfigFile';
import * as Animatable from 'react-native-animatable';
import {BackHandler} from 'react-native';
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Passbook = ({navigation}) => {
  const [image, setImage] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOjMyOTBjNTNjLWI1NmEtNGU0OC05YzIwLTRmNzYzZDU4N2Q3MjwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmNlMDA3MDk5LWVkYjYtNGRkYi1hNTFmLTY2NzMzZDM0MWQwZDwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/8AACwgA8ADwAQERAP/EABwAAQACAwEBAQAAAAAAAAAAAAAHCAEFBgIEA//EADkQAAEDAgIFCAkEAwEAAAAAAAABAgMEBQYRByExQVESFDZxdIGRshMiJENicqGxwRYjYdEyU4Iz/9oACAEBAAA/ALNgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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',
  );
  const [Token, SetToken] = useState('');
  const [UserData, SetUserData] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setoffset] = useState(0);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  useEffect(() => {
    // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    // return () => {
    //   BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    // };
    fetchMyAPI();
    PassbookData();
  }, []);

  async function fetchMyAPI() {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      let userdata = await AsyncStorage.getItem('user');
      SetToken(userToken);
      SetUserData(...UserData, JSON.parse(userdata));
      let alldata = JSON.parse(userdata);
      if (alldata.profilePic.hasOwnProperty('path')) {
        setImage(ConfigFile.ImageBaseUrl + alldata.profilePic.path);
      }
      // setImage(ConfigFile.ImageBaseUrl + alldata.profilePic.path);
    } catch (e) {
      console.log(e);
    }
  }

  async function PassbookData() {
    try {
      setLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
        // body: JSON.stringify({ })
      };
      console.log(requestOptions);
      fetch(
        ConfigFile.BaseUrl + `passbook?limit=40&skip=${offset}`,
        requestOptions,
      )
        .then(res => res.json())
        .then(resJson => {
          if (resJson.length > 0) {
           // setDataSource(resJson);
         //  setDataSource([...dataSource, ...resJson]);
          setDataSource([...dataSource,...resJson ]);
            setonEndReachedCalledDuringMomentum(false);
            setLoading(false);
            setoffset(offset + 1);
          } else {
            setLoading(false);
          }

          // setDataSource(resJson);
          // setLoading(false);
        })
        .catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }
  const ActivityIndicatorShow = () => {
    return (
      <View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{
              marginTop: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        ) : null}
      </View>
    );
  };
  function handleBackButtonClick() {
    console.log(navigation);
    navigation.goBack();
    return true;
  }

  const ItemView = ({item}) => {
    //console.log(globalcolor.ImageBaseUrl+item.photos[0].path);
    console.log('items......', item);
    console.log('metaData......', item.metaData.message);
    return (
      <View>
        <View style={styles.PassBookRow}>
          <View style={{flex: 0.1}}>
            {item.action == 'DEBIT' ? (
              <Image
                source={require('../assets/img/down.png')} //Change your icon image here
                style={styles.Iconclass}
              />
            ) : (
              <Image
                source={require('../assets/img/up.png')} //Change your icon image here
                style={styles.Iconclass}
              />
            )}
          </View>
          <View style={{flex: 0.7}}>
            <Text>{item.metaData.message}</Text>
          </View>
          <View style={{flex: 0.2}}>
            <Text
              style={[
                styles.PassBookRowStatus,
                item.action == 'DEBIT'
                  ? {color: globalcolor.Errorcolor}
                  : {color: globalcolor.Successcolor},
              ]}>
              {' '}
              {item.cashBalance.toFixed(2)}
            </Text>
          </View>

          {/* <View style={{flex:0.9}}>
              <View >
             
          
              </View>
           
            </View> */}
        </View>
      </View>
    );
  };

  /*===========================Load More Function Start Here ==========================*/
  const onEndReached = ({distanceFromEnd}) => {
    if (!onEndReachedCalledDuringMomentum) {
      PassbookData();
      setonEndReachedCalledDuringMomentum(true);
    }
  };
  /*===========================Load More Function END  Here ==========================*/

  //render() {
  const ItemSeparator = () => (
    <View
      style={{
        height: 2,
        width: '100%',
        backgroundColor: globalcolor.Separator,
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  );
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{margin: 15}}
          />
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={globalstyle.container}>
      <View style={styles.PassbookContainer}>
        {/*------------BACK BUTTON START------------------*/}
        <View style={[globalstyle.BackButton, {marginTop: 20}]}>
          <TouchableOpacity onPress={() => handleBackButtonClick()}>
            <View style={{flex: 0.4, marginRight: 20}}>
              <FontAwesome
                name="arrow-left"
                color={globalcolor.PrimaryColor}
                size={20}
              />
            </View>
          </TouchableOpacity>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                color: globalcolor.PrimaryColor,
                fontFamily: globalcolor.Font,
                fontSize: 20,
              }}>
              My Passbook
            </Text>
          </View>
        </View>
        {/*------------BACK BUTTON END------------------*/}
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderRadius: 10,
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: globalcolor.BackgroundColor,
          }}>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
            <Text style={{fontSize: 16, color: globalcolor.PrimaryColor}}>
              {UserData.firstName}
            </Text>
            <Text style={{fontSize: 14, color: globalcolor.PrimaryColor}}>
              {UserData.mobile}
            </Text>
          </View>
          <View style={{flex: 0.2}}>
            <Image
              source={{uri: image}} //Change your icon image here
              style={[globalstyle.ProfilePassbook]}
            />
          </View>
        </View>
        {dataSource.length > 0 ? (
          <FlatList
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={ItemView}
            ListFooterComponent={renderFooter()}
            refreshing={loading}
            // onRefresh={handleRefresh()}
            onEndReached={onEndReached.bind(this)}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              setonEndReachedCalledDuringMomentum(false);
            }}
          />
        ) : (
          <View style={globalstyle.ActivityContainer}>
            {loading ? (
              <View>
                {ActivityIndicatorShow()}
                <Text style={globalstyle.ActivityIndicator}>
                  Loading please wait....
                </Text>
              </View>
            ) : (
              <Text style={globalstyle.ActivityIndicator}>No Data Found</Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
//}

export default Passbook;

const styles = StyleSheet.create({
  PassbookContainer: {
    flex: 1,
    marginTop: 10,
    // justifyContent: 'center'
  },
  TblRow: {
    alignSelf: 'center',
  },
  PassBookRow: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    // marginLeft: 20,
    // marginRight: 20,
    padding: 10,
  },
  PassBookRowStatus: {
    textAlign: 'right',
    marginTop: 12,
  },
  Iconclass: {
    padding: 5,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
