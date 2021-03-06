import React, {useState, useEffect} from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
export default function TabViewExample({navigation}) {
  const layout = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = React.useState(0);
  const [Token, SetToken] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceReward, setDataSourceReward] = useState([]);
  const [routes] = React.useState([
    {key: 'first', title: 'Bussiness Order'},
    {key: 'second', title: 'Rewards Order'},
  ]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setLoading(true);
        let userToken = await AsyncStorage.getItem('userToken');
        console.log('userToken.....', userToken);
        SetToken(userToken);
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
          // body: JSON.stringify({ })
        };
        WebService.PostData('me', requestOptions)
          .then(res => res.json())
          .then(resJson => {
            // return resJson;
            // console.log('My Adrees ...............', resJson.user.address);
            setLoading(false);
            setDataSource(resJson.user.address);
          })
          .catch(e => console.log(e));
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMyAPI();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const DeleteAddress = AddressId => {
    Alert.alert(
      'Remove Address!',
      'Are you sure! Do you want to remove the address ?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => removeAddress(AddressId)},
      ],
    );
  };
  const removeAddress = async AddressId => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },
      // body: JSON.stringify(Bodydata),
    };
    const response = await WebService.PostData(
      'address/' + AddressId,
      requestOptions,
    );
    const resJson = await response.json();
    setDataSource(resJson.user.address);
    // console.log('delete response Data..', resJson);
  };
  const ItemView = ({item}) => {
    console.log('Items..', item.id);
    let AddressType = '';
    if (item.addressType == 'HOME') {
      AddressType = 'home';
    } else {
      AddressType = 'building';
    }
    //console.log(globalcolor.ImageBaseUrl+item.photos[0].path);
    return (
      <View key={index}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingBottom: 5,
            paddingTop: 5,
          }}>
          <View style={{flex: 0.1, alignSelf: 'center', padding: 5}}>
            <FontAwesome
              name={AddressType}
              color={globalcolor.PrimaryColor}
              size={30}
            />
          </View>
          <View style={{flex: 0.7}}>
            <Text>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text>{item.locality + ' ' + item.pin}</Text>
          </View>
          <View style={{flex: 0.2, alignSelf: 'center', flexDirection: 'row'}}>
            <FontAwesome
              style={{padding: 2}}
              name="edit"
              color={globalcolor.PrimaryColor}
              size={30}
              onPress={() =>
                navigation.navigate('UpdateaddressScreen', {
                  data: item,
                  AddressId: item.id,
                })
              }
            />

            <FontAwesome
              style={{padding: 2}}
              name="trash-o"
              color={globalcolor.PrimaryColor}
              size={30}
              onPress={() => DeleteAddress(item.id)}
            />
          </View>
        </View>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
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
  //   const renderScene = SceneMap({
  //     first: FirstRoute,
  //     // second: SecondRoute,
  //   });
  function handleBackButtonClick() {
    console.log(navigation);
    navigation.goBack();
    return true;
  }

  return (
    <View style={styles.container}>
      {/*------------BACK BUTTON START------------------*/}
      <View style={[globalstyle.BackButton, {marginTop: 30}]}>
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
            My Address
          </Text>
        </View>
      </View>
      {/*------------BACK BUTTON END------------------*/}
      {dataSource.length > 0 ? (
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          //  ListFooterComponent={renderFooter}
          //  onEndReached={getData}
          //  onEndReachedThreshold={0.5}
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

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddressScreen')}
        style={styles.touchableOpacityStyle}>
        <Image
          source={require('../assets/img/add.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:80,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
  },
  itemPhoto: {
    width: '96%',
    alignSelf: 'center',
    height: '100%',
    borderRadius: 5,
  },
  OrderText: {
    fontFamily: globalcolor.Font,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 50,
    //backgroundColor: globalcolor.SeconderFontColor,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //padding: 20,
  },
});
