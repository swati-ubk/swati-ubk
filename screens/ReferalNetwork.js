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
import {ConfigFile} from '../service/ConfigFile';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
//import {List} from 'react-native-paper';
//import ExpandableComponent from './components/ExpandableComponent'

const ExpandableComponent = ({item, onClickFunction}) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);
  console.log('asdasdadsadasda...', item);
  useEffect(() => {
    if (item.isExpanded) {
      console.log('saasdasdas', 'okk');
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
      console.log('saasdasdas', '00000');
    }
  }, [item.isExpanded]);

  const IsPremiumUser = Status => {
    let StatusCode = '';
    let ColorBorder = '';
    let Colortext = '';
    if (Status == true) {
      StatusCode = 'ACTIVE';
      ColorBorder = globalcolor.SuccessLight;
      Colortext = globalcolor.Successcolor;
    } else {
      StatusCode = 'INACTIVE';
      ColorBorder = globalcolor.LightError;
      Colortext = globalcolor.Errorcolor;
    }
    return (
      <View style={{padding: 1, borderWidth: 1, borderColor: ColorBorder}}>
        <Text
          style={{
            fontFamily: globalcolor.Font,
            color: Colortext,
            textAlign: 'center',
          }}>
          {StatusCode}
        </Text>
      </View>
    );
  };
  const TillDate = data => {
    if (data.hasOwnProperty('endDate')) {
      return (
        <Text style={{padding: 1, textAlign: 'right'}}>
          {Moment(data.endDate).format('DD MMM YYYY')}{' '}
        </Text>
      );
    }
  };

  return (
    <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <View style={styles.ListCategoryrow}>
          <View style={styles.ListFirstCategoryIcon}>
            <View style={{flexDirection: 'row'}}>
              {item.hasOwnProperty('children') ? (
                item.isExpanded ? (
                  <Image
                    source={require('../assets/img/remove.png')} //Change your icon image here
                    style={styles.Iconclass}
                  />
                ) : (
                  <Image
                    source={require('../assets/img/add.png')} //Change your icon image here
                    style={styles.Iconclass}
                  />
                )
              ) : null}
              <View>
                <Text style={{textAlign: 'left'}}>{item.name}</Text>
                <Text style={{color: '#808080'}}>
                  {item.email}/{item.mobile}
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 0.3, alignSelf: 'center'}}>
            {IsPremiumUser(item.isPremiumUser)}
          </View>
          <View style={{flex: 0.4, alignSelf: 'center', marginEnd: 15}}>
            {TillDate(item.membership)}
          </View>
        </View>
        {/* <Text style={styles.headerText}>
            {item.name}
          </Text> */}
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {item.hasOwnProperty('children')
          ? item.children.map((item, key) => (
              <View key={key}>
                <View style={styles.ListCategoryrow}>
                  <View
                    style={[styles.ListFirstCategoryIcon, {marginLeft: 30}]}>
                    <Text style={{textAlign: 'left'}}>{item.name}</Text>
                    <Text style={{color: '#808080'}}>
                      {item.email}/{item.mobile}
                    </Text>
                  </View>
                  <View style={{flex: 0.3, alignSelf: 'center'}}>
                    {IsPremiumUser(item.isPremiumUser)}
                  </View>
                  <View style={{flex: 0.4, alignSelf: 'center', marginEnd: 15}}>
                    {TillDate(item.membership)}
                  </View>
                </View>
              </View>
            ))
          : null}
      </View>
    </View>
  );
};

const ReferalNetwork = probs => {
  //console.log("==========All category==========");
  // console.log(probs.navigation.navigate);
  const [loading, setLoading] = useState(false);
  const [Token, SetToken] = useState('');
  const [data, setData] = useState([]);
  //const [listDataSource, setListDataSource] = useState(data);
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
    console.log('requestOptions..', requestOptions);
    WebService.PostData('referral-network', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        setData(resJson);
        setLoading(false);
        //console.log('referralnetwork data', JSON.stringify(resJson));
      })
      .catch(e => console.log(e));
  };
  const handleBackButtonClick = () => {
    console.log('Back buttton............', probs.navigation);
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
  const IsPremiumUser = Status => {
    let StatusCode = '';
    let ColorBorder = '';
    let Colortext = '';
    if (Status == true) {
      StatusCode = 'ACTIVE';
      ColorBorder = globalcolor.SuccessLight;
      Colortext = globalcolor.Successcolor;
    } else {
      StatusCode = 'INACTIVE';
      ColorBorder = globalcolor.LightError;
      Colortext = globalcolor.Errorcolor;
    }
    return (
      <View style={{padding: 2, borderWidth: 1, borderColor: ColorBorder}}>
        <Text
          style={{
            fontFamily: globalcolor.Font,
            color: Colortext,
            textAlign: 'center',
          }}>
          {StatusCode}
        </Text>
      </View>
    );
  };
  const TillDate = data => {
    if (data.hasOwnProperty('endDate')) {
      return (
        <Text style={{padding: 2, textAlign: 'right'}}>
          {Moment(data.endDate).format('DD MMM YYYY')}{' '}
        </Text>
      );
    }
  };

  const updateLayout = index => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...data];
    // if (multiSelect) {
    //   // If multiple select is enabled
    //   array[index]['isExpanded'] = !array[index]['isExpanded'];
    // } else {
    // If single select is enabled
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false),
    );
    //}
    //setListDataSource(array);
    setData(array);
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
            Referral Network
          </Text>
        </View>
      </View>
      {/*------------BACK BUTTON END------------------*/}
      <View>
        <View style={styles.ListCategoryrow}>
          <View style={styles.ListFirstCategoryIcon}>
            <Text style={{textAlign: 'left'}}>Name</Text>
          </View>

          <View style={{flex: 0.3, alignSelf: 'center'}}>
            <Text style={styles.ListText}>Membership</Text>
          </View>
          <View style={{flex: 0.3, alignSelf: 'center'}}>
            <Text style={styles.ListText}>Active till</Text>
          </View>
        </View>

        <View>
          <ScrollView>
            {data.map((value, index) => (
              <ExpandableComponent
                key={value.key}
                onClickFunction={() => {
                  updateLayout(index);
                }}
                item={value}
              />
            ))}
          </ScrollView>
        </View>
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

export default ReferalNetwork;

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
    flex: 0.4,
    marginLeft: 10,
    // backgroundColor: globalcolor.Separator,
    shadowColor: '#fff',
    padding: 5,
  },
  ListSecondIcon: {
    alignSelf: 'flex-end',
    flex: 0.3,
    padding: 20,
  },
  ListCategoryrow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: globalcolor.Separator,
  },
  ListText: {
    fontFamily: globalcolor.Font,
    color: '#000',
    textAlign: 'center',

    //  color: globalcolor.SeconderFontColor
  },
  Iconclass: {
    padding: 8,
    margin: 5,
    height: 10,
    width: 10,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
