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
  const [MyOrderloading, setMyOrderLoading] = useState(false);
  const [Rewardloading, setRewardLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [offset1, setoffset1] = useState(0);
  const [offset2, setoffset2] = useState(0);
  const [index, setIndex] = React.useState(0);
  const [Token, SetToken] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceReward, setDataSourceReward] = useState([]);
  const [
    onEndReachedCalledDuringMomentum1,
    setonEndReachedCalledDuringMomentum1,
  ] = useState(true);
  const [
    onEndReachedCalledDuringMomentum2,
    setonEndReachedCalledDuringMomentum2,
  ] = useState(true);
  const [routes] = React.useState([
    {key: 'first', title: 'Bussiness Order'},
    {key: 'second', title: 'Rewards Order'},
  ]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setMyOrderLoading(true);
        setRewardLoading(true);

        let userToken = await AsyncStorage.getItem('userToken');
        //  console.log('userToken.....', userToken);
        SetToken(userToken);
        getOrderData(userToken);
        getOrderRewards(userToken);
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, []);

  /*===========================Load More Function Start Here ==========================*/
  const onEndReached1 = ({distanceFromEnd}) => {
    if (!onEndReachedCalledDuringMomentum1) {
      getOrderData(Token);
      setonEndReachedCalledDuringMomentum1(true);
    }
  };
  const onEndReached2 = ({distanceFromEnd}) => {
    if (!onEndReachedCalledDuringMomentum2) {
      getOrderRewards(Token);
      setonEndReachedCalledDuringMomentum2(true);
    }
  };
  /*===========================Load More Function END  Here ==========================*/

  const getOrderData = Token => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },
    };
    WebService.PostData(`my-orders?limit=100&skip=${offset1}`, requestOptions)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.length > 0) {
          resJson.forEach(element => {
            //console.log('data...', element);
            dataSource.push(element);
          });
          setonEndReachedCalledDuringMomentum1(false);
          setMyOrderLoading(false);
          setoffset1(offset1 + 1);
        }

        // setDataSource(resJson);
        // setMyOrderLoading(false);
      })
      .catch(e => console.log(e));
  };
  const getOrderRewards = Token => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },
    };
    WebService.PostData(
      `store/my-orders?limit=20&skip=${offset2}`,
      requestOptions,
    )
      .then(res => res.json())
      .then(resJson => {
        if (resJson.length > 0) {
          resJson.forEach(element => {
            // console.log('data...', element);
            dataSourceReward.push(element);
          });
          setonEndReachedCalledDuringMomentum2(false);
          setRewardLoading(false);
          setoffset2(offset2 + 1);
        }

        // setDataSourceReward(resJson);
        // setRewardLoading(false);
      })
      .catch(e => console.log(e));
  };
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {MyOrderloading || Rewardloading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{margin: 15}}
          />
        ) : null}
      </View>
    );
  };

  const ActivityIndicatorShow = () => {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color={globalcolor.PrimaryColor}
          style={{
            marginTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    );
  };
  const FirstRoute = () => (
    <View>
      {dataSource.length > 0 ? (
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) =>
            index.toString() + Math.floor(Math.random() * 10000000000000)
          }
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          refreshing={MyOrderloading}
          ListFooterComponent={renderFooter()}
          // onRefresh={handleRefresh()}
          onEndReached={onEndReached1.bind(this)}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            setonEndReachedCalledDuringMomentum1(false);
          }}
        />
      ) : (
        <View style={[globalstyle.ActivityContainer, {marginTop: 50}]}>
          {MyOrderloading ? (
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
  );
  const SecondRoute = () => (
    <View>
      {dataSourceReward.length > 0 ? (
        <FlatList
          data={dataSourceReward}
          keyExtractor={(item, index) =>
            index.toString() + Math.floor(Math.random() * 10000000000000)
          }
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemViewRewards}
          refreshing={Rewardloading}
          ListFooterComponent={renderFooter()}
          // onRefresh={handleRefresh()}
          onEndReached={onEndReached2.bind(this)}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            setonEndReachedCalledDuringMomentum2(false);
          }}
        />
      ) : (
        <View style={[globalstyle.ActivityContainer, {marginTop: 50}]}>
          {Rewardloading ? (
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
  );

  const OrderStatus = Status => {
    let StatusCode = '';
    let ColorBorder = '';
    let Colortext = '';
    if (Status == 'COMPLETE') {
      StatusCode = 'DELIVERED';
      ColorBorder = globalcolor.SuccessLight;
      Colortext = globalcolor.Successcolor;
    } else if (Status == 'PROCESSING') {
      StatusCode = 'IN PROCESS';
      ColorBorder = globalcolor.ProgessColorLight;
      Colortext = globalcolor.ProgessColor;
    } else {
      StatusCode = 'WAITING';
      ColorBorder = globalcolor.PrimaryColorLight;
      Colortext = globalcolor.PrimaryColor;
    }
    return (
      <View
        style={{
          alignSelf: 'center',
          borderWidth: 1,
          padding: 5,
          borderColor: ColorBorder,
        }}>
        <Text style={{fontFamily: globalcolor.Font, color: Colortext}}>
          {StatusCode}
        </Text>
      </View>
    );
  };

  const ItemView = ({item}) => {
    // console.log('Items', item);
    //console.log(globalcolor.ImageBaseUrl+item.photos[0].path);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OrderDetails', {orderId: item.orderId});
        }}
        key={index}>
        <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
          <View style={{flex: 0.6}}>
            <Text>{Moment(item.createdAt).format('DD MMM YYYY')}</Text>
            <Text
              style={[styles.OrderText, {fontSize: 15, fontWeight: 'bold'}]}>
              {' '}
              {item.orderId}
            </Text>
            <Text style={[styles.OrderText, {fontSize: 13}]}>
              {' '}
              ₹ {item.pricing.customerToPay}
            </Text>
          </View>
          <View style={{flex: 0.3}}>{OrderStatus(item.orderState)}</View>
          <View style={{flex: 0.1}}>
            <FontAwesome
              style={{alignSelf: 'flex-end'}}
              name="chevron-right"
              color={globalcolor.SeconderFontColor}
              size={20}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const ItemViewRewards = ({item}) => {
    //console.log(globalcolor.ImageBaseUrl+item.photos[0].path);
    return (
      <TouchableOpacity
        //onPress={() => {navigation.navigate('RewardsProductListScreen') }}
        key={index}>
        <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
          <View style={{flex: 0.6}}>
            <Text>{Moment(item.createdAt).format('DD MMM YYYY')}</Text>
            <Text
              style={[styles.OrderText, {fontSize: 14, fontWeight: 'bold'}]}>
              {' '}
              {item.orderId}
            </Text>
            <Text style={[styles.OrderText, {fontSize: 14}]}>
              <Image
                source={require('../assets/img/coin.png')} //Change your icon image here
                style={globalstyle.CoinIcon}
              />{' '}
              {item.totalPriceInCoins}
            </Text>
          </View>
          <View style={{flex: 0.3}}>{OrderStatus(item.orderState)}</View>
          <View style={{flex: 0.1}}>
            <FontAwesome
              style={{alignSelf: 'flex-end'}}
              name="chevron-right"
              color={globalcolor.SeconderFontColor}
              size={20}
            />
          </View>
        </View>
      </TouchableOpacity>
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

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  function handleBackButtonClick() {
    console.log(navigation);
    navigation.goBack();
    return true;
  }
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: globalcolor.Textcolor}}
      style={{backgroundColor: globalcolor.PrimaryColor}}
    />
  );
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
            My Order
          </Text>
        </View>
      </View>
      {/*------------BACK BUTTON END------------------*/}

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
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
});
