import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ConfigFile} from '../service/ConfigFile';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
const PayoutScreen = probs => {
  //console.log("==========All category==========");
  // console.log(probs.navigation.navigate);
  const [loading, setLoading] = useState(false);
  const [Token, SetToken] = useState('');
  const [data, setData] = useState([]);
  const [UserData, setUserData] = useState(0);
  const [offset, setoffset] = useState(0);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  // let onEndReachedCalledDuringMomentum = true;
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        SetToken(userToken);
        FetachReferalNetwork(userToken);
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, []);

  const FetachReferalNetwork = userToken => {
    setLoading(true);
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    };

    WebService.PostData('me', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        setUserData(resJson.user.cashBalance.toFixed(2));
        //console.log('Payout data..', JSON.stringify(resJson));
      })
      .catch(e => console.log(e));

    // console.log('requestOptions..', requestOptions);
    WebService.PostData(
      `customer/settlement?limit=60&skip=${offset}`,
      requestOptions,
    )
      .then(res => res.json())
      .then(resJson => {
        if (resJson.length > 0) {
          setData([...data,...resJson ]);    
          setonEndReachedCalledDuringMomentum(false);
          setLoading(false);
          setoffset(offset + 1);
        } else {
          setLoading(false);
        }
      })
      .catch(e => console.log(e));
  };
  const handleBackButtonClick = () => {
    //   console.log('Back buttton............', probs.navigation);
    probs.navigation.goBack();
    return true;
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
  const getSettlementStatusText = state => {
    switch (state) {
      case 'PENDING':
        return 'Approved';
      case 'INITIATED':
        return 'Sent to Bank';
      case 'PROCESSED':
        return 'Transferred';
      case 'FAILED':
        return 'Rejected by Bank';
      case 'REFUNDED':
        return 'Refunded';
      default:
        return '';
    }
  };
  const IsPremiumUser = Status => {
    let StatusCode = '';
    let ColorBorder = '';
    let Colortext = '';
    if (Status == 'PROCESSED') {
      StatusCode = Status;
      ColorBorder = globalcolor.SuccessLight;
      Colortext = globalcolor.Successcolor;
    } else if (Status == 'INITIATED') {
      StatusCode = Status;
      ColorBorder = globalcolor.ProgessColorLight;
      Colortext = globalcolor.ProgessColor;
    } else if (Status == 'PENDING') {
      StatusCode = Status;
      ColorBorder = globalcolor.ProgessColorLight;
      Colortext = globalcolor.ProgessColor;
    } else if (Status == 'REFUNDED') {
      StatusCode = Status;
      ColorBorder = globalcolor.LightError;
      Colortext = globalcolor.Errorcolor;
    } else {
    }

    return (
      <View style={{padding: 1, borderWidth: 1, borderColor: ColorBorder}}>
        <Text
          style={{
            fontFamily: globalcolor.Font,
            color: Colortext,
            textAlign: 'center',
          }}>
          {getSettlementStatusText(StatusCode)}
        </Text>
      </View>
    );
  };
  const TillDate = data => {
    if (data.hasOwnProperty('endDate')) {
      return (
        <Text style={{padding: 2, textAlign: 'center'}}>
          {Moment(data.endDate).format('DD MMM YYYY')}{' '}
        </Text>
      );
    }
    // return (
    //     data.length > 0 ?

    //         <Text >56456445</Text>

    //         : null
    // )
  };

  const ItemSeparator = () => (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
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
  // const handleRefresh = () => {
  //   if (!onEndReachedCalledDuringMomentum) {
  //     FetachReferalNetwork(Token);
  //     setonEndReachedCalledDuringMomentum(true);
  //   }
  // };
  const onEndReached = ({distanceFromEnd}) => {
    if (!onEndReachedCalledDuringMomentum) {
      FetachReferalNetwork(Token);
      setonEndReachedCalledDuringMomentum(true);
    }
  };

  const renderItemComponent = data => {
    //console.log('payout Items..', JSON.stringify(data));

    return (
      <TouchableOpacity
        onPress={() =>
          probs.navigation.navigate('PayoutDetailsScreen', {
            referencedata: data.item,
            referenceId: data.item.referenceId,
          })
        }>
        <View style={styles.ListCategoryrow}>
          <View style={styles.ListFirstCategoryIcon}>
            <Text style={{textAlign: 'left', fontWeight: 'bold'}}>
              {' '}
              {data.item.referenceId}
            </Text>
            <Text style={{textAlign: 'left'}}>
              {' '}
              ₹ {data.item.requestedAmount}
            </Text>
            <Text style={{color: globalcolor.SeconderFontColor}}>
              {' '}
              {Moment(data.item.createdAt).format('DD MMM YYYY')}
            </Text>
          </View>

          <View style={{flex: 0.3, alignSelf: 'center'}}>
            {IsPremiumUser(data.item.status)}
          </View>
          <View style={{flex: 0.1, alignSelf: 'center'}}>
            <Text style={{textAlign: 'right'}}>
              {' '}
              <FontAwesome
                style={{alignSelf: 'flex-end'}}
                name="chevron-right"
                color={globalcolor.SeconderFontColor}
                size={20}
              />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return data.length > 0 ? (
    <SafeAreaView style={styles.container}>
      {/*------------BACK BUTTON START------------------*/}
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          borderRadius: 10,
          marginRight: 15,
          marginTop: 30,
        }}>
        <TouchableOpacity onPress={() => handleBackButtonClick()}>
          <View style={{flex: 0.2, marginRight: 20}}>
            <FontAwesome
              name="arrow-left"
              color={globalcolor.PrimaryColor}
              size={20}
            />
          </View>
        </TouchableOpacity>
        <View style={{flex: 0.8}}>
          <Text
            style={{
              color: globalcolor.PrimaryColor,
              fontFamily: globalcolor.Font,
              fontSize: 20,
            }}>
            Payout
          </Text>
        </View>
      </View>
      {/*------------BACK BUTTON END------------------*/}
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 10,
            borderColor: globalcolor.PrimaryColor,
          }}>
          <View style={{flex: 0.5, padding: 20}}>
            <Text style={{fontFamily: globalcolor.Font}}>
              Available Balance
            </Text>
            <Text
              style={{
                fontFamily: globalcolor.Font,
                marginTop: 10,
                fontWeight: 'bold',
              }}>
              ₹ {UserData}
            </Text>
          </View>
          <View style={{flex: 0.5, padding: 20}}>
            <Button
              title="Request Payout"
              color={globalcolor.PrimaryColor}
              onPress={() => probs.navigation.navigate('RequestPayout')}
            />
          </View>
        </View>

        {/* <View style={styles.ListCategoryrow}>
          <View style={styles.ListFirstCategoryIcon}>
            <Text style={{textAlign: 'left'}}>Amount</Text>
          </View>

          <View style={{flex: 0.3, alignSelf: 'center'}}>
            <Text style={[styles.ListText, {textAlign: 'left'}]}>Date</Text>
          </View>
          <View style={{flex: 0.3, alignSelf: 'center'}}>
            <Text style={styles.ListText}>Satus</Text>
          </View>
        </View> */}
        <FlatList
          data={data}
          keyExtractor={item =>
            item.id.toString() + Math.floor(Math.random() * 10000000000000)
          }
          ItemSeparatorComponent={ItemSeparator}
          renderItem={item => renderItemComponent(item)}
          ListFooterComponent={renderFooter()}
          refreshing={loading}
          // onRefresh={handleRefresh()}
          onEndReached={onEndReached.bind(this)}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            setonEndReachedCalledDuringMomentum(false);
          }}
        />
      </View>
    </SafeAreaView>
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
  );
};

export default PayoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
  },

  ListBodyCategory: {
    flex: 0.3,
    alignSelf: 'center',
    textAlignVertical: 'center',
    padding: 20,
  },
  ListFirstCategoryIcon: {
    flex: 0.6,
    marginLeft: 10,
    // backgroundColor: globalcolor.Separator,
    shadowColor: '#fff',
  },
  ListSecondIcon: {
    alignSelf: 'flex-end',
    flex: 0.3,
  },
  ListCategoryrow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: globalcolor.Separator,
    padding: 10,
  },
  ListText: {
    fontFamily: globalcolor.Font,
    color: '#000',
    textAlign: 'center',

    //  color: globalcolor.SeconderFontColor
  },
});
