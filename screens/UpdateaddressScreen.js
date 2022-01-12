import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {globalcolor} from '../style/globalcolor';
import {Avatar} from 'react-native-paper';
import {ConfigFile} from '../service/ConfigFile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from 'react-native-paper';
import WebService from '../service/WebService';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Picker} from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
const UpdateaddressScreen = probs => {
  const {colors} = useTheme();
  console.log('Address Update..', probs);
  const [UserData, SetUserData] = useState('');
  //   const [latitude, Setlatitude] = useState(22.78825);
  //   const [longitude, Setlongitude] = useState(88.4324);
  const [coordinate, Setcoordinate] = useState({
    latitude: 22.78825,
    longitude: 88.4324,
  });
  const [Token, SetToken] = useState('');
  const [AddressType, SetAddressType] = useState('');
  const [selectedState, setStateCode] = useState(
    probs.route.params.data.stateCode,
  );
  const [AllStates, setAllState] = useState([]);
  const [Addressdata, setAddressData] = useState(probs.route.params.data);

  const [data, setData] = React.useState({
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
    country_short: 'IN',
    country_long: 'India',
    INVALID_NAME: false,
    INVALID_MOBILE: false,
    INVALID_POSTAL_CODE: false,
    INVALID_LOCALITY: false,
    INVALID_CITY: false,
    INVALID_STATE: false,
    INVALID_LANDMARK: false,
  });
  var radio_props = [
    {label: 'HOME ', value: 'HOME'},
    {label: 'OFFICE ', value: 'OFFICE'},
  ];

  const getcurrentPogition = () => {
    Geocoder.init('AIzaSyBCszp5-Zs8ICl6hczTUjJ6CVbjwj581-Q');
    Geolocation.getCurrentPosition(
      position => {
        console.log(position, 'sasasasasasasasa');
        Setcoordinate({
          ...coordinate,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // this.gtaddress();
        // latitude: parseFloat(position.coords.latitude),
        //longitude: parseFloat(position.coords.longitude),
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message, '15');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    console.log('calling me again....', probs.route.params.data.stateCode);
    setStateCode(probs.route.params.data.stateCode);
    setData({
      ...data,
      FirstName: probs.route.params.data.name,
      MobileNo: probs.route.params.data.mobileNo,
      PinCode: probs.route.params.data.pin,
      Area: probs.route.params.data.mobileNo,
      City: probs.route.params.data.mobileNo,
      State: probs.route.params.data.state,
      LandMark: probs.route.params.data.landmark,
      AlterNativeNumber: probs.route.params.data.alternateMobileNo,
      formatted_address: probs.route.params.data.address,
      state_short: probs.route.params.data.stateCode,

      //country_short: probs.route.params.data.data.country_short,
      // country_long: probs.route.params.data.country_long,
    });
    async function fetchMyAPI() {
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        SetToken(userToken);
        getcurrentPogition();
        GetAllState();
      } catch (e) {
        console.log(e);
      }
    }

    fetchMyAPI();
  }, [probs.route.params.AddressId]);

  const GetAllState = async () => {
    WebService.GetDataJSon(`state`).then(response => {
      // this.setState({data: response.data.banners});
      setAllState(response);
      //console.log('all state...', response);
    });
  };

  const gtaddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        //  console.log('Google Map Adreess...', JSON.stringify(json.results[0]));

        let city = json.results[0].address_components[1].long_name;
        let State = json.results[0].address_components[2].long_name;
        let state_short = json.results[0].address_components[2].short_name;
        let Country = json.results[0].address_components[3].long_name;
        let country_short = json.results[0].address_components[3].short_name;
        // let Pincode = json.results[0].address_components[4].long_name;
        let addressComponent = json.results[0].formatted_address;

        setData({
          ...data,
          City: city,
          State: State,
          formatted_address: addressComponent,
          state_short: state_short,
          country_short: country_short,
          country_long: Country,
        });
      })
      .catch(error => console.warn(error));
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const UpdatePassword = () => {
    console.log('Password Update.......');
  };

  const handalFirstname = val => {
    setData({
      ...data,
      FirstName: val,
    });
  };
  const handalLastname = val => {
    setData({
      ...data,
      LastName: val,
    });
  };
  const handalMobileNumber = val => {
    setData({
      ...data,
      MobileNo: val,
    });
  };
  const handalPincode = val => {
    setData({
      ...data,
      PinCode: val,
    });
  };
  const handleArea = val => {
    setData({
      ...data,
      Area: val,
    });
  };
  const handleCity = val => {
    setData({
      ...data,
      City: val,
    });
  };
  const handleState = val => {
    setData({
      ...data,
      State: val,
    });
  };
  const handlelandamark = val => {
    setData({
      ...data,
      LandMark: val,
    });
  };
  const handleAlternativeNumber = val => {
    setData({
      ...data,
      AlterNativeNumber: val,
    });
    //AlterNativeNumber
  };
  const AddNewAdrees = async () => {
    console.log('user data..', data);

    let Bodydata = {
      location: {
        type: 'Point',
        coordinates: [coordinate.latitude, coordinate.longitude],
        data: {
          id: probs.route.params.AddressId,
          lat: coordinate.latitude,
          lng: coordinate.longitude,
          formattedAddress: data.formatted_address,
          city: data.City,
          state_short: data.state_short,
          state_long: data.State,
          zipcode: data.PinCode,
          country_short: data.country_short,
          country_long: 'India',
        },
      },
      addressType: AddressType,
      name: data.FirstName,
      mobileNo: data.MobileNo,
      pin: data.PinCode,
      locality: data.Area,
      address: data.formatted_address,
      city: data.City,
      stateCode: selectedState,
      landmark: data.LandMark,
      alternateMobileNo: data.AlterNativeNumber,
    };
    // console.log('Bodydata...', Bodydata);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Token,
      },
      body: JSON.stringify(Bodydata),
    };
    const response = await WebService.PostData(
      'address/' + probs.route.params.AddressId,
      requestOptions,
    );
    const resJson = await response.json();
    console.log('Response Data..', resJson);

    if (resJson.hasOwnProperty('errors')) {
      // console.log('update address...', resJson);
      resJson.errors.forEach(element => {
        //   console.log('element....', element);
        if (element.code == 'INVALID_NAME') {
          console.log('Invalid name....');
          setData({
            ...data,
            INVALID_NAME: true,
          });
        }

        if (element.code == 'INVALID_MOBILE') {
          setData({
            ...data,
            INVALID_MOBILE: true,
          });
        }
        if (element.code == 'INVALID_POSTAL_CODE') {
          setData({
            ...data,
            INVALID_POSTAL_CODE: true,
          });
        }
        if (element.code == 'INVALID_LOCALITY') {
          setData({
            ...data,
            INVALID_LOCALITY: true,
          });
        }
        if (element.code == 'INVALID_CITY') {
          setData({
            ...data,
            INVALID_CITY: true,
          });
        }
        if (element.code == 'INVALID_STATE') {
          setData({
            ...data,
            INVALID_STATE: true,
          });
        }
        if (element.code == 'INVALID_LANDMARK') {
          setData({
            ...data,
            INVALID_LANDMARK: true,
          });
        }
      });
    } else {
      setData({
        ...data,
        INVALID_NAME: false,
        INVALID_MOBILE: false,
        INVALID_POSTAL_CODE: false,
        INVALID_LOCALITY: false,
        INVALID_CITY: false,
        INVALID_STATE: false,
        INVALID_LANDMARK: false,
      });
      Alert.alert('success!', 'Address Has been  Updated successfully', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => probs.navigation.goBack()},
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={[styles.map]}
            region={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
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
              //   console.log('coordinate...', region);
              // Setcoordinate({coordinate: region});

              Setcoordinate({
                ...coordinate,
                latitude: region.latitude,
                longitude: region.longitude,
              });
              gtaddress(region.latitude, region.longitude);
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
            onPress={() => getcurrentPogition()}
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
          <RadioForm
            radio_props={radio_props}
            formHorizontal={true}
            initial={0}
            onPress={value => {
              SetAddressType(value);
            }}
            selectedButtonColor={globalcolor.PrimaryColor}
            buttonColor={globalcolor.PrimaryColor}
            style={{marginBottom: 20, marginLeft: 20}}
          />
          <Text style={globalstyle.LableText}>
            Full name (First and Last name)
          </Text>
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
              onChangeText={val => handalFirstname(val)}
              value={data.FirstName}
            />
          </View>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_NAME ? null : {display: 'none'},
            ]}>
            Please enter a valid name
          </Text>
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
              onChangeText={val => handalMobileNumber(val)}
              value={data.MobileNo}
            />
          </View>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_MOBILE ? null : {display: 'none'},
            ]}>
            Please enter a valid mobile no
          </Text>
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
              onChangeText={val => handalPincode(val)}
              value={data.PinCode}
            />
          </View>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_POSTAL_CODE ? null : {display: 'none'},
            ]}>
            Please enter a valid PIN code
          </Text>
        </View>

        <View style={styles.Listheight}>
          <Text style={globalstyle.LableText}>Area,Colony,Street,Village</Text>
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
              onChangeText={val => handleArea(val)}
              value={data.Area}
            />
          </View>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_LOCALITY ? null : {display: 'none'},
            ]}>
            Please enter a valid locality name
          </Text>
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
              onChangeText={val => handleCity(val)}
              value={data.City}
            />
          </View>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_CITY ? null : {display: 'none'},
            ]}>
            Please enter a valid City
          </Text>
        </View>
        <View style={styles.Listheight}>
          <Text style={globalstyle.LableText}>State</Text>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue, itemIndex) => setStateCode(itemValue)}>
            {AllStates.map((value, index) => (
              <Picker.Item
                label={value.state}
                value={value.stateCode}
                key={index}
              />
            ))}
          </Picker>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_STATE ? null : {display: 'none'},
            ]}>
            Please select a state
          </Text>
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
              onChangeText={val => handlelandamark(val)}
              value={data.LandMark}
            />
          </View>
          <Text
            style={[
              styles.errorMsg,
              data.INVALID_LANDMARK ? null : {display: 'none'},
            ]}>
            Please enter a valid landmark
          </Text>
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
              onChangeText={val => handleAlternativeNumber(val)}
              keyboardType="number-pad"
              value={data.AlterNativeNumber}
              // value={UserData.address[0].alternateMobileNo}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          AddNewAdrees();
        }}>
        <View style={globalstyle.FooterTabButton}>
          <Text style={globalstyle.FooterTabText}> Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateaddressScreen;

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
  errorMsg: {
    marginLeft: 10,
    color: globalcolor.Errorcolor,
  },
});
