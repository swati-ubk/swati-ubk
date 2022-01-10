import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
//const {colors} = useTheme();
class DrahDropMap extends Component {
  constructor(props) {
    super();
    this.state = {
      coordinate: {
        latitude: 22.78825,
        longitude: 88.4324,
      },
      oldcoordinate: {
        latitude: 22.78825,
        longitude: 88.4324,
      },
      address: null,
      city: null,
      stste: null,
      UserData: '',
      FirstName: '',
      LastName: '',
      MobileNo: '',
      PinCode: '',
      Area: '',
      City: '',
      State: '',
      LandMark: '',
      AlterNativeNumber: '',
      formatted_address: '',
      state_short: '',
      country_short: '',
      country_long: '',
    };
  }

  componentDidMount() {
    console.log('\\\\\\\\\\\\\\\\\\\\\\\\');
    this.getcurrentPogition();
    this.getuserData();
  }

  async getuserData() {
    try {
      // let userToken = await AsyncStorage.getItem('userToken');
      let userdata = await AsyncStorage.getItem('user');

      // SetToken(userToken);
      this.state.UserData = JSON.parse(userdata);
      // SetUserData(...UserData, JSON.parse(userdata));
      let alldata = JSON.parse(userdata);
      console.log('All data Address......', JSON.stringify(alldata));

      console.log('asasdasdasd', this.state.UserData.lastName);

      //setImage(ConfigFile.ImageBaseUrl + alldata.profilePic.path);
      // SetCoverImage(ConfigFile.ImageBaseUrl+alldata.coverPic.path);

      // setImage(ConfigFile.ImageBaseUrl+alldata.profilePic.path);
      // console.log(
      //   'profilePic.....',
      //   ConfigFile.ImageBaseUrl + alldata.profilePic.path,
      // );
    } catch (e) {
      console.log(e);
    }
  }
  AddNewAdrees = (latitude, longitude) => {
    console.log('AddresssData...', latitude);

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: {
    //     location: {
    //       type: 'Point',
    //       coordinates: [latitude, longitude],
    //       data: {
    //         id: 'ChIJA6JRsC4UrjsRdwjdHWeuS9Y',
    //         lat: longitude,
    //         lng: longitude,
    //         formattedAddress: this.state.formatted_address,
    //         city: this.state.City,
    //         state_short: this.state.state_short,
    //         state_long: this.state.State,
    //         zipcode: this.state.PinCode,
    //         country_short: this.state.country_short,
    //         country_long: this.state.country_long,
    //       },
    //     },
    //     addressType: 'HOME',
    //     name: this.state.FirstName,
    //     mobileNo: this.state.MobileNo,
    //     pin: this.state.PinCode,
    //     locality: this.state.Area,
    //     address: this.state.formatted_address,
    //     city: this.state.City,
    //     stateCode: this.state.state_short,
    //     landmark: this.state.landmark,
    //     alternateMobileNo: this.state.AlterNativeNumber,
    //   },
    // };
    //console.log('address data..', requestOptions);
    // console.log('Reward Items Details1122...', requestOptions);
    // WebService.PostData('address', requestOptions)
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log('Add address Response.....', response);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  handalFirstname = val => {
    console.log('First Name Text', val);
    this.setState({FirstName: val});
  };
  handalLastname = val => {
    //  console.log('Last nane,,,', val);
    this.setState({LastName: val});
  };
  handalMobileNumber = val => {
    //  console.log('Mobile Number...', val);
    this.setState({MobileNo: val}); /**/
  };
  handalPincode = val => {
    // console.log('Pincode...', val);
    this.setState({PinCode: val});
  };
  handleArea = val => {
    // console.log('Area...', val);
    this.setState({Area: val});
  };
  handleCity = val => {
    // console.log('City...', val);
    this.setState({City: val});
  };
  handleState = val => {
    this.setState({State: val});
  };
  handlelandamark = val => {
    //console.log('Land mark', val);
    this.setState({LandMark: val});
  };
  handleAlternativeNumber = val => {
    //console.log('Alternate Number', val);
    this.setState({AlterNativeNumber: val});
  };

  getcurrentPogition() {
    Geocoder.init('AIzaSyBCszp5-Zs8ICl6hczTUjJ6CVbjwj581-Q');
    Geolocation.getCurrentPosition(
      position => {
        console.log(position, 'sasasasasasasasa');
        this.setState({
          coordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        this.setState({
          oldcoordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        this.gtaddress();
        // latitude: parseFloat(position.coords.latitude),
        //longitude: parseFloat(position.coords.longitude),
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message, '15');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  componentDidUpdate(prevProps, prevState) {
    //  console.log('==================prevState======================');
    //  console.log(prevState.coordinate.latitude, '16');
    let a = prevState.coordinate.latitude;
    let b = this.state.coordinate.latitude;
    if (a != b) {
      console.log('--------------1---------------');
      this.gtaddress();
    }
  }

  gtaddress() {
    Geocoder.from(
      this.state.coordinate.latitude,
      this.state.coordinate.longitude,
    )
      .then(json => {
        console.log('Google Map Adreess...', JSON.stringify(json.results[0]));

        let city = json.results[0].address_components[1].long_name;
        let State = json.results[0].address_components[2].long_name;
        let state_short = json.results[0].address_components[2].short_name;
        let Country = json.results[0].address_components[3].long_name;
        let country_short = json.results[0].address_components[3].short_name;
        // let Pincode = json.results[0].address_components[4].long_name;
        let addressComponent = json.results[0].formatted_address;
        this.setState({
          AddresssData: {
            City: city,
            State: State,
            formatted_address: addressComponent,
            country_long: Country,
            country_short: country_short,
            state_short: state_short,
          },
        });
      })
      .catch(error => console.warn(error));
  }

  submitAdderss = async () => {
    try {
      console.log('=========22222======', this.state.address);

      const latlong = JSON.stringify(this.state.coordinate);

      console.log('Submit new Address..', latlong);
      await AsyncStorage.setItem('Coordinate', latlong);
      await AsyncStorage.setItem('address', this.state.address);

      this.props.navigation.navigate('HomeDrawer', {
        addresss: this.state.address,
        latlong: latlong,
      });
    } catch (e) {
      // saving error
    }
  };

  render() {
    let {latitude, longitude} = this.state.coordinate;

    // console.log('==========11=============');
    // console.log(this.state.coordinate);
    //  const { query } = this.state;
    // const data = filterData(query);
    //  const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container2}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={[styles.map]}
              region={{
                latitude,
                longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              showsUserLocation={false}
              showsMyLocationButton={false}
              showsCompass={false}
              showsPointsOfInterest={false}
              showsScale={true}
              showsTraffic={true}
              showsBuildings={true}
              showsIndoors={true}
              onRegionChangeComplete={region => {
                this.setState({
                  coordinate: region,
                });
              }}></MapView>

            <View style={[styles.map2]}>
              <Image
                source={require('../assets/img/marker.png')} //Change your icon image here
                style={styles.ImageStyle}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={[styles.location]}>
            <TouchableOpacity
              onPress={() => this.getcurrentPogition()}
              style={[
                styles.signIn,
                {
                  borderColor: '#fd7729',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Image
                source={require('../assets/img/location.png')} //Change your icon image here
                style={styles.ImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.topmap}>
            <Text style={globalstyle.LableText}>First Name</Text>
            <View style={globalstyle.ListrowAccount}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#666666"
                //secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  globalstyle.textInput,
                  {
                    // color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => this.handalFirstname(val)}
              />
            </View>
          </View>
          <View style={styles.Listheight}>
            <Text style={globalstyle.LableText}>Last Name</Text>
            <View style={globalstyle.ListrowAccount}>
              <TextInput
                placeholder="Rahul"
                placeholderTextColor="#666666"
                //secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  globalstyle.textInput,
                  {
                    // color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => this.handalLastname(val)}
              />
            </View>
          </View>
          <View style={styles.Listheight}>
            <Text style={globalstyle.LableText}>Mobile Number</Text>
            <View style={globalstyle.ListrowAccount}>
              <TextInput
                placeholder="+91 6858562565"
                placeholderTextColor="#666666"
                // secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  globalstyle.textInput,
                  {
                    // color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                keyboardType="number-pad"
                onChangeText={val => this.handalMobileNumber(val)}
              />
            </View>
          </View>
          <View style={styles.Listheight}>
            <Text style={globalstyle.LableText}>Pincode</Text>
            <View style={globalstyle.ListrowAccount}>
              <TextInput
                placeholder=""
                placeholderTextColor="#666666"
                // secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  globalstyle.textInput,
                  {
                    // color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => this.handalPincode(val)}
              />
            </View>
          </View>

          <View style={styles.Listheight}>
            <Text style={globalstyle.LableText}>
              Area,Colony,Street,Village
            </Text>
            <View style={globalstyle.ListrowAccount}>
              <TextInput
                placeholder="Kolkata"
                placeholderTextColor="#666666"
                // secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  globalstyle.textInput,
                  {
                    // color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => this.handleArea(val)}
                // value={this.state.address}
              />
            </View>
          </View>

          <View style={styles.Listheight}>
            <Text style={globalstyle.LableText}>Town/City</Text>
            <View style={globalstyle.ListrowAccount}>
              <TextInput
                placeholder=""
                placeholderTextColor="#666666"
                // secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  globalstyle.textInput,
                  {
                    // color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => this.handleCity(val)}
                value={this.state.City}
              />
            </View>
          </View>
          <View style={styles.Listheight}>
            <Text style={globalstyle.LableText}>State</Text>
            <View style={globalstyle.ListrowAccount}>
              <TextInput
                placeholder=""
                placeholderTextColor="#666666"
                // secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  globalstyle.textInput,
                  {
                    // color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => this.handleState(val)}
                value={this.state.State}
              />
            </View>
          </View>
          <View style={styles.Listheight}>
            <Text style={globalstyle.LableText}>Landmark</Text>
            <View style={globalstyle.ListrowAccount}>
              <TextInput
                placeholder=""
                placeholderTextColor="#666666"
                // secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  globalstyle.textInput,
                  {
                    ///color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => this.handlelandamark(val)}
                // value={UserData.address[0].landmark}
              />
            </View>
          </View>
          <View style={styles.Listheight}>
            <Text style={globalstyle.LableText}>Alternative Number</Text>
            <View style={globalstyle.ListrowAccount}>
              <TextInput
                placeholder=""
                placeholderTextColor="#666666"
                // secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  globalstyle.textInput,
                  {
                    // color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => this.handleAlternativeNumber(val)}
                keyboardType="number-pad"
                // value={UserData.address[0].alternateMobileNo}
              />
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            AddNewAdrees(
              this.state.coordinate.latitude,
              this.state.coordinate.longitude,
            );
          }}>
          <View style={globalstyle.FooterTabButton}>
            <Text style={globalstyle.FooterTabText}> Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

// const DrahDropMap = () => {

// }
export default DrahDropMap;
// export default DrahDropMap;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

  container2: {
    ...StyleSheet.absoluteFillObject,
    height: 250,
  },
  map: {
    height: 250,
    ...StyleSheet.absoluteFillObject,
  },
  location: {
    marginTop: 50,
    marginLeft: 10,
    position: 'absolute',
  },

  innerContainer: {
    flex: 0.7,
    flexDirection: 'row',
  },
  innerContainer2: {
    flex: 0.3,
    height: 60,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#FF0000',
    alignItems: 'center',
  },
  fieldName: {
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
  },
  fieldName2: {
    flexDirection: 'row',
  },
  textInputContainer: {
    flex: 3,
  },
  autoTextview: {
    borderWidth: 2,
    borderColor: '#fd7729',
  },

  autofild: {
    top: 50,
    padding: 3,

    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fd7729',
    flexDirection: 'row',
    borderRadius: 10,
  },
  map2: {
    flex: 1,
    height: 250,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  address: {
    borderRadius: 10,
    height: 60,
    marginBottom: 8,
    width: '95%',
    backgroundColor: '#fd7729',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },

  add_submit: {
    flex: 1,
    flexDirection: 'row',
  },

  ImageStyle: {
    height: 30,
    width: 30,
  },
  textSign: {
    //  justifyContent: 'center',
    //  alignItems: 'center',
  },
  mapbbb: {
    zIndex: 1,
    backgroundColor: '#000000',
    alignSelf: 'center',
    alignContent: 'center',
  },
  Listheight: {
    marginTop: 10,
  },

  topmap: {
    marginTop: 260,
  },
});
