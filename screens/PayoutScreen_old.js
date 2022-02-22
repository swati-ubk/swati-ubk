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

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.profile}>
        <View style={{flex:0.2}}>
        <FontAwesome
              name="arrow-left"
              color={globalcolor.PrimaryColor}
              size={20}
            />
        </View>
        <View style={{flex:0.7}}>
          <Text>Payout page</Text>
        </View>

     </View>
     
    </SafeAreaView>
  )
 
};

export default PayoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50
  },
  profile: {
    flex: 1,
    flexDirection:'row'
   
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
