import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import {Badge} from 'react-native-paper';
import WebService from '../service/WebService';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RewardCategory = ({navigation}) => {
  //console.log("==========All category==========");
  // console.log(probs.navigation.navigate);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [Coin, setCoin] = useState(0);
  const [cartCount, setcartCount] = useState(0);
  const [TotalCartCoin, setTotalCartCoin] = useState(0);
  //useEffect(() => getCategories(), []);

  useEffect(() => {
    //  console.log('props...', JSON.stringify(props));
    async function fetchMyAPI() {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('userToken');
        console.log(token, 'tokenn');
        setToken(token);
        WebService.GetData('store-sub-category')
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.length > 0) {
              setLoading(false);
              // console.log('all Rewards category...');
              // console.log(responseJson);
              setData(responseJson);
            }
          })
          .catch(error => {
            console.error(error);
          });
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        };
        WebService.PostData('me', requestOptions)
          .then(response => response.json())
          .then(response => {
            console.log('Me data..', JSON.stringify(response.user.promoCoins));
            setCoin(response.user.promoCoins);
          });

        const keys = await AsyncStorage.getAllKeys();
        const itemsArray = await AsyncStorage.multiGet(keys);
        let object = {};
        itemsArray.map(item => {
          console.log('-------222----------', `${item[0]}`); //count
          if (`${item[0]}` == 'RewordCart') {
            // console.log("llllllllllllllllllllllllllllllll",item[1])
            object = JSON.parse(item[1]);

            //console.log("llllllllllllllllllllllllllllllll",object)
          }
        });
        //  console.log('RewardsCart Count=====', object.length);
        //;
        if (object.length > 0) {
          let TotalCointIncart = 0;
          object.forEach(element => {
            TotalCointIncart += element.priceInCoins;
          });
          setcartCount(object.length);
          setTotalCartCoin(TotalCointIncart);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, []);

  const getCategories = () => {
    setLoading(true);
    WebService.GetData('store-sub-category')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          setLoading(false);
          console.log('all Rewards category...');
          console.log(responseJson);
          setData(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  function handleBackButtonClick() {
    console.log(navigation);
    navigation.goBack();
    return true;
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

  return (
    <View style={styles.container}>
      {/*------------BACK BUTTON START------------------*/}
      <View style={[globalstyle.RewordBackButton, {marginTop: 30}]}>
        <Icon.Button
          name="ios-menu"
          size={45}
          color="#FD7729"
          backgroundColor="transparent"
          onPress={() => navigation.openDrawer()}></Icon.Button>

        <View style={{flex: 0.6, alignSelf: 'center'}}>
          <Text style={globalstyle.BackButtonText}>Rewards</Text>
        </View>
        <View
          style={{
            flex: 0.4,
            alignSelf: 'center',
            alignContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: 'https://diskounto.com/common/reward-coin.png'}}
            style={globalstyle.CoinIcon}
          />
          <View style={{alignSelf: 'center'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                fontFamily: globalcolor.Font,
              }}>
              {Coin}
            </Text>
          </View>
        </View>

        {/* <View style={{flex: 0.6, alignItems: 'center', alignSelf: 'center'}}>
          <Icon.Button
            name="cart"
            size={30}
            color={globalcolor.PrimaryColor}
            backgroundColor="transparent"
            onPress={() =>
              navigation.navigate('RewordAddToCart', {
                CartCount: cartCount,
                TotalCartCoin: TotalCartCoin,
              })
            }>
            <Badge
              style={{
                position: 'absolute',
                marginLeft: 30,
                alignSelf: 'flex-start',
              }}>
              {cartCount}
            </Badge>
          </Icon.Button>
        </View> */}
      </View>
      {/*------------BACK BUTTON END------------------*/}

      <View
        style={{marginBottom: 15, marginTop: 15, width: '100%', height: 120}}>
        <Image
          source={require('../assets/img/RewardsBanner.png')}
          style={styles.itemPhoto}
        />
      </View>

      <ScrollView>
        <SafeAreaView>
          {data.map((value, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RewardsProductListScreen', {
                  Catvalue: value.subCategoryCode,
                  Coin: Coin,
                });
              }}
              key={index}>
              <View style={globalstyle.ListCategoryrow}>
                <View style={globalstyle.ListFirstCategoryIcon}>
                  <Image
                    source={{
                      uri: globalcolor.ImageBaseUrl + value.photos[0].path,
                    }} //Change your icon image here
                    style={[globalstyle.ListImage]}
                  />
                </View>
                <View style={globalstyle.ListBody}>
                  <Text style={globalstyle.ListText}>
                    {value.subCategoryName}{' '}
                  </Text>
                </View>
                <View style={globalstyle.ListSecondIcon}>
                  <FontAwesome
                    name="chevron-right"
                    color={globalcolor.SeconderFontColor}
                    size={20}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default RewardCategory;

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
});
