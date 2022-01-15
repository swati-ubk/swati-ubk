import React, {useState, useEffect} from 'react';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import {ConfigFile} from '../service/ConfigFile';
//import {WebService} from '../service/WebService.js';
import WebService from '../service/WebService';
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
} from 'react-native';
import {Button} from 'react-native-paper';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const StoreListScreen = props => {
  //console.log(props.route.params.Catvalue);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => {
    console.log('props...', JSON.stringify(props));
    console.log('props.22..', props.route.params.Catvalue);
    console.log('props.23..', props.route.params.catNamee);
    async function fetchMyAPI() {
      try {
        WebService.GetData(
          'search/business?category=' +
            props.route.params.Catvalue +
            `&lat=${props.route.params.location.lat}&lng=${props.route.params.location.lng}&limit=20&skip=0`,
        )
          .then(response => response.json())
          .then(responseJson => {
            console.log("----------",responseJson);
            console.log('length=' + responseJson.length);
            if (responseJson.length > 0) {
              //  setOffset(offset + 1);
              setDataSource(responseJson);
              setLoading(false);
            } else {
              setDataSource([]);
              setIsListEnd(true);
              setLoading(false);
            }
          })
          .catch(error => {
            console.error(error);
          });
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, [props.route.params.Catvalue, props.route.params.location.lat]);

  /**************************Start Here Search Product*******************************/
  const SearchStore = seatchText => {
    //console.log('seatchText........', seatchText);
    // console.log('seatchText length........', seatchText.length);
    // this.setState({ refreshing: true, nodata: false });
    setLoading(true);
    if (seatchText.length > 0) {
      // console.log('StoreID............', this.state.StoreID);
      WebService.GetDataJSon(
        `search/business?searchText=${seatchText}&lat=${props.route.params.location.lat}&lng=${props.route.params.location.lng}&limit=60&skip=0`,
      ).then(response => {
        if (response.length > 0) {
          //  console.log(JSON.stringify(response))
          setDataSource(response);
          setLoading(false);
        } else {
          setDataSource([]);
          setIsListEnd(true);
          setLoading(false);
        }
      });
    } else {
      console.log('text leneth 00000000000000000');
      ///  this.setState({ nodata: false });
      fetchWithoutSearchData();
    }
  };
  const fetchWithoutSearchData = () => {
    setLoading(true);
    try {
      WebService.GetData(
        'search/business?category=' +
          props.route.params.Catvalue +
          `&lat=${props.route.params.location.lat}&lng=${props.route.params.location.lng}&limit=20&skip=0`,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          console.log('length=' + responseJson.length);
          if (responseJson.length > 0) {
            //  setOffset(offset + 1);
            setDataSource(responseJson);
            setLoading(false);
          } else {
            setDataSource([]);
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const handleBackButtonClick = () => {
    console.log('Back buttton............', props.navigation);
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
    //console.log(globalcolor.ImageBaseUrl+item.photos[0].path);
    let status = 'Closed';
    item.isOpen ? (status = 'Open') : 'Closed';
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
          <Text style={styles.SlugListText}>{props.route.params.catNamee}</Text>
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
            Store List
          </Text>
        </View>
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
    textTransform: 'capitalize'
  },
  Productdesc: {
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
  },
});

export default StoreListScreen;
