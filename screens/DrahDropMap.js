import React, { Component } from 'react'
import { Text, View, StyleSheet,Image ,Alert,TouchableOpacity, Button} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import Geolocation, { getCurrentPosition } from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

class DrahDropMap extends Component {
    constructor(props) {
      super();
    }


    state ={
        coordinate: {
            latitude: 22.78825,
            longitude: 88.4324,
        },
        oldcoordinate: {
          latitude: 22.78825,
          longitude: 88.4324,
      },
        address:null,
       
    }


    

    componentDidMount() {
      this.getcurrentPogition();
      }


      getcurrentPogition()
      {
   
        Geocoder.init("AIzaSyBCszp5-Zs8ICl6hczTUjJ6CVbjwj581-Q");
        Geolocation.getCurrentPosition(
            (position) => {
              console.log(position,"sasasasasasasasa");
              this.setState({coordinate:{
                latitude: position.coords.latitude,
                 longitude: position.coords.longitude,
              },
            })
            this.setState({oldcoordinate:{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          })
            this.gtaddress();
             // latitude: parseFloat(position.coords.latitude),
                //longitude: parseFloat(position.coords.longitude),
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }



      componentDidUpdate(prevProps, prevState) {
        console.log("==================prevState======================");
        console.log(prevState.coordinate.latitude)
         let a =prevState.coordinate.latitude;
         let b = this.state.coordinate.latitude;
         if(a!=b)
         {
           console.log("-----------------------------")
           this.gtaddress();
         }
      
         }
      
 gtaddress()
{
  Geocoder.from(this.state.coordinate.latitude, this.state.coordinate.longitude)
  .then(json => {
    console.log(json);
  
    let addressComponent = json.results[0].formatted_address;
    this.setState({
    address:addressComponent
    });

    console.log(addressComponent,"888888888888");
  })
  .catch(error => console.warn(error));

}
    
     submitAdderss()
      {
       this.props.navigation.navigate('HomeDrawer',
        {addresss:this.state.address});
       // navigation.navigate('HomeScreen')




      }
    

    render() {
     let {latitude,longitude} =this.state.coordinate;
   //  const { navigate } = this.props.navigation; 
  return (
    <View style={styles.container}>

    
    <MapView
     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={[styles.map]}
     
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      showsPointsOfInterest={true}
      showsScale={true}
      showsTraffic={true}
      showsBuildings={true}
      showsIndoors={true}

    onRegionChangeComplete= {(region)=>{this.setState({
        coordinate:region

    })}
  
  }


   
  

    >

    {/* <MapView.Marker
      style={[styles.map2]}
      coordinate={{
        latitude,
        longitude,
      }}
      image={require('../assets/img/marker.png')}
      title='ubk'
      description='hello'
    /> */}

    </MapView>

    <View style={[styles.map2]}>
              <Image 
                   source={require('../assets/img/marker.png')} //Change your icon image here
                   style={styles.ImageStyle}
                   resizeMode='contain'
               />
        </View>

        <View style={[styles.location]}>
        <TouchableOpacity
                     onPress={() => this.getcurrentPogition()}
                    style={[styles.signIn, {
                        borderColor: '#fd7729',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
              <Image 
                   source={require('../assets/img/location.png')} //Change your icon image here
                   style={styles.ImageStyle}
                   resizeMode='contain'
               />
               </TouchableOpacity>
        </View>

        <View style={[styles.address]}>
             
              <View style={styles.innerContainer}>
                <Text style={styles.fieldName}>
                 {this.state.address}
                </Text>
                
              </View>
              
                <View style={styles.innerContainer2}>
                <TouchableOpacity  style={styles.fieldName2}
                     onPress={() => this.submitAdderss()}
                >
                   <Text style={styles.fieldName}>
                    Submit
                  </Text>
                  </TouchableOpacity>
              </View>
       
        </View>
  </View>
  )
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
    map: {
      height: '100%',
      ...StyleSheet.absoluteFillObject,
    },
    location:{
      position: "absolute",
     top:40,
     right: 15,
     
    },

    innerContainer: {
      flex: 0.7,
      flexDirection: 'row'
    },
    innerContainer2: {
      flex: 0.3,
      height:60,
      borderTopEndRadius:10,
      borderBottomEndRadius:10,
      flexDirection: 'row',
      backgroundColor:'#FF0000',
      alignItems: 'center',
      
    },
    fieldName: {
      flex: 1,
      textAlign:'center',
      color:'#ffffff',
     
    },
    fieldName2: {
      flexDirection: 'row',
    },
    textInputContainer: {
      flex: 3,
    },
    map2: {
      flex: 1,
      alignSelf:'center',
      alignContent: 'center',
      justifyContent:'center',
      },
      address: {
        borderRadius:10,
        height:60,
        marginBottom:8,
        width: '95%',
        backgroundColor:'#fd7729',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf:'center',
        },

        add_submit: {
        flex: 1,
        flexDirection: 'row',
        },

    ImageStyle: {
        height: 50,
        width: 50,
    },
    textSign: {
  
      //  justifyContent: 'center',
      //  alignItems: 'center',
    },
    mapbbb: {
      zIndex:1,
      backgroundColor: "#000000",
      alignSelf:'center',
      alignContent: 'center'
    }
   });