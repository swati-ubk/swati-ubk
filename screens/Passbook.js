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
    'data:image/png;base64,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',
  );
  const [Token, SetToken] = useState('');
  const [UserData, SetUserData] = useState('');
  const [dataSource, setDataSource] = useState([]);

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
      //  console.log('All userToken......',userToken);
      setImage(ConfigFile.ImageBaseUrl + alldata.profilePic.path);
      // PassbookData();

      //  const requestOptions = {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQzYjcwYTI0MDJhODU1NzhlOTFiMmQiLCJlbWFpbCI6Im5pdGlzaGt1bWFyNTM0M0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ3MjQzODUsImV4cCI6MTYzNDgxMDc4NX0.zoBVDKACnhexqjiuTaPIUg06B5VwH8KGOSkq-eEWrR4' },

      // };

      // fetch(ConfigFile.BaseUrl+'passbook?limit=20&skip=0',requestOptions)
      // .then(res => res.json())
      // .then(resJson => {
      //  // return resJson;
      //  console.log('data..................',resJson);
      // }).catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }

  async function PassbookData() {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      // let userdata = await AsyncStorage.getItem('user');

      //SetToken(userToken);
      //    SetUserData(...UserData,JSON.pars e(userdata));
      // let alldata = JSON.parse(userdata);
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
        // body: JSON.stringify({ })
      };
      console.log(requestOptions);
      fetch(ConfigFile.BaseUrl + 'passbook?limit=20&skip=0', requestOptions)
        .then(res => res.json())
        .then(resJson => {
          // return resJson;
          console.log('data set ...............', resJson);
          setDataSource(resJson);
        })
        .catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }

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

        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={ItemView}
          //ListFooterComponent={renderFooter}
          // onEndReached={getData}
          onEndReachedThreshold={0.5}
        />
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
