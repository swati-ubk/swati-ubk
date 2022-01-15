import React, {useState, useEffect} from 'react';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import {ConfigFile} from '../service/ConfigFile';
//import {WebService} from '../service/WebService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebService from '../service/WebService';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const SearchScreen = props => {
  //console.log(props.route.params.Catvalue);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [Coordinate, setCoordinate] = useState([]);

  useEffect(() => {
    console.log('Search props...', JSON.stringify(props));
    async function fetchMyAPI() {
      let Coordinate = await AsyncStorage.getItem('Coordinate');
      setCoordinate(JSON.parse(Coordinate));
    }
    fetchMyAPI();
    const backAction = () => {
      setDataSource([]);
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  /**************************Start Here Search Product*******************************/
  const SearchStore = seatchText => {
    setLoading(true);
    if (seatchText.length > 0) {
      console.log('Coordinate...', Coordinate.latitude);
      console.log('Coordinate...', Coordinate.longitude);

      // console.log('StoreID............', this.state.StoreID);
      WebService.GetDataJSon(
        `search/business?searchText=${seatchText}&lat=${Coordinate.latitude}&lng=${Coordinate.longitude}&limit=100&skip=0`,
      ).then(response => {
        if (response.length > 0) {
          //  console.log(JSON.stringify(response))
          setDataSource(response);
          setLoading(false);
        } else {
          setDataSource([]);
          // setIsListEnd(true);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
      setDataSource([]);
    }
  };

  const handleBackButtonClick = () => {
    setDataSource([]);
    props.navigation.goBack();
    return true;
  };

  /**************************End  Here Search Product*******************************/

  const renderFooter = () => {
    return (
      // Footer View with Loader
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

  const ItemView = ({item}) => {
    console.log("============7777======",item);
    let status = 'Close';
    item.isOpen ? (status = 'Open') : 'Close';
    return (
      <TouchableOpacity
        style={styles.ProductListrow}
        onPress={() => {
          props.navigation.navigate('StoreDetailsScreen', {StoreId: item.id});
        }}>
        <View style={styles.ProductlistFirstItem}>
          <Image
            source={{uri: ConfigFile.ImageBaseUrl + item.photos[0].path}} //Change your icon image here
            style={[styles.ProductImage]}
          />
        </View>
        <View style={styles.ListBody}>
          <Text style={globalstyle.ListPrimaryText}>{item.name}</Text>
          <Text style={styles.SlugListText}>{item.slug}</Text>
          <Text style={styles.Productdesc}>
            {item.address}
          </Text>
          <Text
            style={
              item.isOpen
                ? {color: globalcolor.Successcolor}
                : {color: globalcolor.Errorcolor}
            }>
            {' '}
            {status}{' '}
          </Text>
        </View>
        <View style={styles.ListSecondIcon}>
          <Text style={globalstyle.Ratingbutton}>{item.rating}</Text>
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

  const getItem = item => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*------------BACK BUTTON START------------------*/}
      <View style={[globalstyle.RewordBackButton, {marginTop: 30}]}>
        <Icon.Button
          name="ios-menu"
          size={45}
          color="#FD7729"
          backgroundColor="transparent"
          onPress={() => props.navigation.openDrawer()}></Icon.Button>

        <View style={{flex: 0.6, alignSelf: 'center'}}>
          <Text style={globalstyle.BackButtonText}>Search anything</Text>
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
      <View style={[globalstyle.serachBar, globalstyle.BorderSearchbar]}>
        <View>
          <Image
            source={require('../assets/img/SearchIcon.png')} //Change your icon image here
            style={globalstyle.SearchIcon}
          />
        </View>
        <TextInput
          placeholder="Search store"
          autoFocus={true}
          style={globalstyle.SearchBox}
          onChangeText={val => SearchStore(val)}
        />
      </View>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        // onEndReached={getData}
        // onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ProductlistFirstItem: {
    width: '30%',
  },
  ListBody: {
    marginLeft: 10,
    // margin:10,
    width: '70%',
    padding: 10,
  },
  ListSecondIcon: {
    width: '20%',
  },
  ProductListrow: {
    marginLeft: 10,
    marginRight: 40,
    flexDirection: 'row',
    //marginTop:20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    //borderColor:globalcolor.Separator,
    //borderWidth:1,
  },
  ProductImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  SlugListText: {
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
    marginTop: 2,
    fontWeight: 'bold',
  },
  Productdesc: {
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
  },
});

export default SearchScreen;
