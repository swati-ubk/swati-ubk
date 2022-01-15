import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  AppState,
  BackHandler,
  NavigationEvents,
  Alert,
  LogBox,
  PermissionsAndroid,
  //YellowBox
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from '../components/StarRating';
import {globalcolor} from '../style/globalcolor';
import StoreListScreen from './StoreListScreen_NEW';
import WebService from '../service/WebService';
import Categories from './components/Categories';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConfigFile} from '../service/ConfigFile';
import {SafeAreaView} from 'react-native-safe-area-context';

class HomeScreen extends Component {
  constructor(props) {
    console.log('=========111======', props);
    //constructor to set default state
    super(props);
    this.state = {
      username: '',
      addresss: '',
      appState: AppState.currentState,
      data: [],
      popularCategories: [],
      lat: '',
      lng: '',
      PopularCat1: [],
      PopularCat2: [],
      
    };
  }

  componentDidMount() {

    // const myObjArray = [
      // {id: 1, name: "Dharmik" },
      // {id: 2, name: "Bhavesh" },
      // {id: 3, name: "Piyush" }
 //   ];

 //if(WebService.myProductArray.length>0)
 //{
  //const index = WebService.myProductArray.map(function(x) {return x.id; }).indexOf('institute');
  //console.log("=========33========",WebService.myProductArray[index].name);
  //console.log("-----------44444------------",WebService.myProductArray);
 //}

    this.request_location_runtime_permission();
    WebService.GetDataJSon(`site-data/mobile-app-settings`).then(response => {
      this.setState({data: response.data.banners});
    });

    this.getcurrentPogition();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // Alert.alert('Refreshed')
      //   console.log("=========111======");

      this.getChangeAddress();
    });
  }











  request_location_runtime_permission = async () => {
    //async request_location_runtime_permission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'ReactNativeCode Location Permission',
          message: 'ReactNativeCode App needs access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //Alert.alert("Location Permission Granted jhgqjwwf.");
        this.getcurrentPogition();
      } else {
        Alert.alert('Location Permission Not Granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  getChangeAddress = async () => {
    console.log('Getchange Address.....');
    try {
      //  console.log("=========22222======");
      const value = await AsyncStorage.getItem('address');
      const Coordinate = await AsyncStorage.getItem('Coordinate');
      const FinalCoordinate = JSON.parse(Coordinate);

      console.log('Coordinate latitude..', FinalCoordinate.latitude);
      console.log('Coordinate longitude..', FinalCoordinate.longitude);
      if (value !== null) {
        // value previously stored

        // console.log("================1==========================", value)

        this.setState({
          addresss: value,
          lat: FinalCoordinate.latitude,
          lng: FinalCoordinate.longitude,
        });
      } else {
        //   console.log("=================2========================", value)
      }
      this.GetPopularStores();
    } catch (e) {
      // error reading value
    }
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  getcurrentPogition() {
    console.log('Current posssion ....');
    Geocoder.init('AIzaSyBCszp5-Zs8ICl6hczTUjJ6CVbjwj581-Q');
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position, "sasasasasasasasa");

        //})

        this.gtaddress(position.coords.latitude, position.coords.longitude);

        // })
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  async gtaddress(latitude, longitude) {
    const latlong = JSON.stringify({latitude: latitude, longitude: longitude});

    try {
      //  await AsyncStorage.setItem('address', this.state.address);
      await AsyncStorage.setItem('Coordinate', latlong);
    } catch (e) {
      // saving error
    }
    Geocoder.from(latitude, longitude)
      .then(json => {
        //   console.log(json, "20");

        let addressComponent = json.results[0].formatted_address;
        this.setState({
          addresss: addressComponent,
          lat: latitude,
          lng: longitude,
        });
        this.GetPopularStores();
      })
      .catch(error => console.warn(error));
  }

  async GetPopularStores() {
    console.log(this.state);
    WebService.GetDataJSon(`site-data/homepage`).then(response => {
      console.log('Home page Settings....', response.data.popularCategories);
      this.setState({popularCategories: response.data.popularCategories});
      WebService.GetDataJSon(
        `search/business?category=grocery&lat=${this.state.lat}&lng=${this.state.lng}&limit=5&skip=0`,
      ).then(response => {
        console.log('grocery Data..', response);
        if (response.length > 0) {
          this.setState({PopularCat1: response});
        } else {
          this.setState({PopularCat1: []});
        }
      });
      WebService.GetDataJSon(
        `search/business?category=resturant&lat=${this.state.lat}&lng=${this.state.lng}&limit=5&skip=0`,
      ).then(response => {
        console.log('resturant Data..', response);
        //this.setState({ PopularCat2: response });
        if (response.length > 0) {
          this.setState({PopularCat2: response});
        } else {
          this.setState({PopularCat2: []});
        }
      });
    });
  }

  proFum(address) {
    ///alert('ok');
    //text="1212121212"
    // this.setState(c);
    this.setState.addresss = address;
    console.log('okkkkkkkkkkk' + address);
    console.log(this.state, '21');
  }
  OpenStatus(status) {
    return status ? (
      <View>
        <Text style={{textAlign: 'right', color: globalcolor.Successcolor}}>
          Open
        </Text>
      </View>
    ) : (
      <View>
        <Text style={{textAlign: 'right', color: globalcolor.Errorcolor}}>
          Closed
        </Text>
      </View>
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    const text = this.state.addresss;
    let CategoryData = {
      props: this.props,
      location: {
        lat: this.state.lat,
        lng: this.state.lng,
        formatted_address: this.state.addresss,
      },
    };

    console.log("asssssss-----",this.state.PopularCat1);
    return (
      <SafeAreaView style={[styles.container, {marginTop: 50}]}>
        {/* ,{ callHome: this.proFum.bind(this)} */}
        {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DrahDropMap');
          }}>
          <View style={[styles.serachBar, styles.center_image]}>
            <View style={styles.center_image}>
              <Image
                source={require('../assets/img/marker.png')} //Change your icon image here
                style={styles.ImageStyle}
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  color: globalcolor.SeconderColor,
                  fontSize: 14,
                  fontFamily: globalcolor.Font,
                }}>
                {text}
              </Text>
            </View>
          </View>
        </TouchableOpacity> */}
        <ScrollView style={styles.container} >
          <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {this.state.data.map((value, index) => (
                <View style={styles.container} key={index}>
                  <View style={styles.item}>
                    <Image
                      source={{uri: ConfigFile.ImageBaseUrl + value.image.path}}
                      style={styles.itemPhoto}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.CategoryContainer}>
              <View style={styles.top}>
                <Categories data={CategoryData} />
              </View>
              <View style={styles.middle}>
                <View style={styles.categoryTitleContainer}>
                  <View style={styles.categoryName}>
                    <Text style={styles.categorytitle}>
                      Popular in {this.state.popularCategories[0]}
                    </Text>
                  </View>
                  <View style={styles.categoryName}>
                    {/* <Text
                      style={styles.showall}
                      onPress={() => {
                        this.props.navigation.navigate('StoreListScreen', {
                          Catvalue: this.state.popularCategories[0],
                          location: {lat: this.state.lat, lng: this.state.lng},
                        });
                      }}>
                      View all
                    </Text> */}
                  </View>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {this.state.PopularCat1.map((value, index) => (
                    
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.props.navigation.navigate('StoreDetailsScreen', {
                          StoreId: value.id,
                         
                        });
                      }}>
                      <View
                        style={
                          ([styles.container],
                          {
                            borderWidth: 1,
                            marginLeft: 5,
                            marginRight: 5,
                            borderRadius: 5,
                            borderColor: globalcolor.Separator,
                          })
                        }>
                        <View style={styles.item}>
                          <Image
                            source={{
                              uri:
                                ConfigFile.ImageBaseUrl + value.photos[0].path,
                            }}
                            style={styles.itemPhoto}
                          />
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 0.5, marginTop: 5}}>
                              <Text
                                style={{
                                  fontFamily: globalcolor.Font,
                                  fontSize: 16,
                                  color: globalcolor.PrimaryColor,
                                }}>
                                {value.name}
                              </Text>
                            </View>
                            <View style={{flex: 0.5}}>
                              {this.OpenStatus(value.isOpen)}
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.bottom}>
                <View style={styles.categoryTitleContainer}>
                  <View style={styles.categoryName}>
                    <Text style={styles.categorytitle}>
                      Popular in {this.state.popularCategories[1]} 
                    </Text>
                  </View>
                  <View style={styles.categoryName}>
                    {/* <Text
                      style={styles.showall}
                      onPress={() => {
                        this.props.navigation.navigate('StoreListScreen', {
                          Catvalue: this.state.popularCategories[1],
                          location: {lat: this.state.lat, lng: this.state.lng},
                        });
                      }}>
                      View all
                    </Text> */}
                  </View>
                </View>
                <ScrollView horizontal={true}>
                  {this.state.PopularCat2.map((value, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.props.navigation.navigate('StoreDetailsScreen', {
                          StoreId: value.id,
                         
                        });
                      }}>
                      <View
                        style={
                          ([styles.container],
                          {
                            borderWidth: 1,
                            marginLeft: 5,
                            marginRight: 5,
                            borderRadius: 5,
                            borderColor: globalcolor.Separator,
                          })
                        }>
                        <View style={styles.item}>
                          <Image
                            source={{
                              uri:
                                ConfigFile.ImageBaseUrl + value.photos[0].path,
                            }}
                            style={styles.itemPhoto}
                          />
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 0.5, marginTop: 5}}>
                              <Text
                                style={{
                                  fontFamily: globalcolor.Font,
                                  fontSize: 16,
                                  color: globalcolor.PrimaryColor,
                                }}>
                                {value.name}
                              </Text>
                            </View>
                            <View style={{flex: 0.5}}>
                              {this.OpenStatus(value.isOpen)}
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    //  alignSelf: 'center',
    // justifyContent: "space-between",
    //  backgroundColor: "#FFF5EA",
    // padding: 20,
    //  margin: 10,
  },
  sliderContainer: {
    height: 200,
    width: '100%',
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
  },

  categoryBtn: {
    flex: 1,
    width: '20%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: globalcolor.Textcolor /* '#FF6347' */,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: globalcolor.SeconderColor,
  },
  categoryBtnTxt: {
    fontFamily: globalcolor.Font,
    alignSelf: 'center',
    marginTop: 5,
    color: globalcolor.SeconderColor,
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: globalcolor.Textcolor,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },

  serachBar: {
    flexDirection: 'row',
    width: '90%',
    height: 50,
    marginTop: 70,
    marginLeft: 2,
  },
  ImageStyle: {
    // padding: 8,
    // margin: 5,

    height: 30,
    width: 30,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  center_image: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BannerImg: {
    width: '92%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  CategoryContainer: {
    flex: 1,
    justifyContent: 'space-between',
    //backgroundColor: "#FFF5EA",
    padding: 8,
    margin: 2,
  },
  top: {
    flex: 0.3,
    backgroundColor: globalcolor.Textcolor,
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 25,
    borderColor: globalcolor.Textcolor,
  },
  middle: {
    flex: 0.3,
    backgroundColor: globalcolor.Textcolor,
    borderWidth: 1,
    marginTop: 5,
    borderColor: globalcolor.Textcolor,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: globalcolor.Textcolor,
    borderWidth: 1,
    marginTop: 5,
    borderColor: globalcolor.Textcolor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  categoryName: {
    flex: 1,
    marginBottom: 20,
    borderBottomWidth: 3,
    borderColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    width: '50%',
  },
  categorytitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: globalcolor.SeconderColor,
    fontFamily: globalcolor.Font,
    marginLeft: 25,
    fontSize: 15,
    textTransform: 'capitalize'
  },
  showall: {
    textAlign: 'right',
    marginRight: 25,
    fontSize: 15,
    fontFamily: globalcolor.Font,
    color: globalcolor.PrimaryColor,
  },
  /*-----------Horizantail scroll------------------*/
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    //marginTop: 20,
    marginBottom: 0,
  },
  item: {
    margin: 8,
  },
  itemPhoto: {
    width: 280,
    height: 110,
    borderRadius: 5,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    // marginTop: 5,
  },
});
