import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import { ConfigFile } from '../service/ConfigFile';
import { globalcolor } from '../style/globalcolor';
import { globalstyle } from '../style/globals.js';
import WebService from '../service/WebService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class StoreDetailsScreen extends React.Component {

  constructor(props) {

    console.log("StoreId...", props.route.params.StoreId);
   // console.log("StoreId334...", props.route.params.Storename);
    
    super(props);
    this.state = {
      data: [],
      StoreID: this.props.route.params.StoreId,
     // StoreName:this.props.route.params.Storename,
      loading: false,
      WindowWIDTH: Dimensions.get('window').width,
      WindowHeight: Dimensions.get('window').height,
      imgActive: 0,


    }
  }


  async componentDidMount() {


    //const index = WebService.myProductArray.map(function(x) {return x.id; }).indexOf(this.state.StoreID);
    //console.log("=========33========",WebService.myProductArray[index].name);
   // console.log("-----------44444------------",);



    this.setState({ loading: true });
    this.setState({ data: [] })
    setTimeout(() => {
      this.fetchCats();
    }, 1000);


  }

  componentDidUpdate(prevProps, prevState) {
    let a = prevState.StoreID;
    let b = this.props.route.params.StoreId;
    if (a != b) {
      this.setState({ loading: true });
      this.setState({ data: [] })
      this.setState({ StoreID: this.props.route.params.StoreId })
     // this.setState({ StoreName: this.props.route.params.Storename })
      setTimeout(() => {
        this.fetchCats();
      }, 1000);

    } else {

    }
  }

  // and don't forget to remove the listener

  fetchCats = () => {

    //this.setState({loading:true});
    WebService.GetData('business-details/' + this.props.route.params.StoreId)
      .then((response) => response.json())
      .then((responseJson) => {
         console.log("eeeee......",responseJson);
        // console.log('length='+responseJson.length)
        if (responseJson.length > 0) {
          console.log('acceptsCOD..', JSON.stringify(responseJson[0].acceptsCOD));
          console.log('requireSlot..', JSON.stringify(responseJson[0].requireSlot));
          this.setState({ data: responseJson, loading: false })
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }

  onchange = (nativeEvent) => {
    //console.log(nativeEvent);
    if (nativeEvent) {
      // console.log("contentOffset X===="+nativeEvent.contentOffset.x);
      //console.log("contentOffset Y===="+nativeEvent.layoutMeasurement.width)
      const ratio = nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width;
      const slide = Math.ceil(ratio);
      if (slide != this.state.imgActive) {
        this.setState({ imgActive: slide })
        //SetimgActive(slide);
      }
    }
  }

  async productListPage(acceptsCOD, requireSlot) {
    console.log("-------------1-----",acceptsCOD,requireSlot)

    await AsyncStorage.setItem('SelectedStoreID', this.props.route.params.StoreId);
    this.props.navigation.navigate('ProductListScreen', { StoreId: this.props.route.params.StoreId, acceptsCOD: acceptsCOD, requireSlot: requireSlot })
  }

  shopNow(status, acceptsCOD, requireSlot) {




    return (
      status == true ?
        <TouchableOpacity
          onPress={() => { this.productListPage(acceptsCOD, requireSlot) }}
        >
          <View style={globalstyle.FooterTabButton}>
            <Text style={globalstyle.FooterTabText}> Shop now</Text>
          </View>
        </TouchableOpacity>
        : null
    )
  }
  ActivityIndicatorShow() {
    return (
      <View >
        {this.state.loading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}

          />
        ) : null}
      </View>
    )
  }
  handleBackButtonClick() {

    console.log('Back buttton............', this.props.navigation);
    this.props.navigation.goBack();
    return true;
  }

  getStorename(idd)
       {

        console.log("------99992-",WebService.myProductArray)
      
      
        const indexx= WebService.myProductArray.findIndex(obj => obj.id === idd)
      console.log("--====55555==",indexx)
      
    //const index = WebService.myProductArray.map(function(x) {return x.id; }).indexOf('grocery');
    console.log("=========33========",WebService.myProductArray[indexx].name);
   // console.log("-----------44444------------",);

    return WebService.myProductArray[indexx].name;
    }

  render() {
    // console.log(this.props.route.params.Catvalue);
    //console.log("=========gagsgas=========");

    if (this.state.data.length > 0) {
      // this.state.data.isBoomPartner?this.shopNow('Active'):''

      return (
        <SafeAreaView style={styles.container}>
          {/*------------BACK BUTTON START------------------*/}
          {/* <View style={{flexDirection:'row',padding:10,borderRadius:10,marginRight:15}}>
              <TouchableOpacity 
                onPress={() => this.handleBackButtonClick()}
                >
                <View style={{flex:0.2,marginRight:20}}>
                    <FontAwesome name="arrow-left"color={globalcolor.PrimaryColor} size={20}  />
                </View>
               </TouchableOpacity> 
                <View style={{flex:0.8}}> 
                   <Text style={{color:globalcolor.PrimaryColor,fontFamily:globalcolor.Font,fontSize:20}}>
                     Store List
                   </Text>
                </View>
            </View> */}
          {/*------------BACK BUTTON END------------------*/}
          {this.ActivityIndicatorShow()}
          <ScrollView>
            <View style={{ width: this.state.WindowWIDTH, height: this.state.WindowHeight * 0.25 }}>
              <ScrollView
                onScroll={({ nativeEvent }) => this.onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={{ width: this.state.WindowWIDTH, height: this.state.WindowHeight * 0.25 }}
              >
                {this.state.data[0].photos.map((value, index) => (
                  <View key={index}>
                    {/* <TouchableOpacity 
                  onPress={() => this.handleBackButtonClick()}
                  > */}
                    <View style={{ position: 'absolute', zIndex: 1, marginLeft: 15, marginTop: 10 }}>
                      <FontAwesome name="arrow-left" color={globalcolor.Textcolor} size={20} onPress={() => this.handleBackButtonClick()} />
                    </View>
                    {/* </TouchableOpacity>  */}
                    <Image

                      resizeMode='stretch'
                      style={{ width: this.state.WindowWIDTH, height: this.state.WindowHeight * 0.25 }}
                      source={{ uri: ConfigFile.ImageBaseUrl + value.path }}

                    />
                  </View>

                ))}
              </ScrollView>
              <View style={styles.wrapdot}>
                {this.state.data[0].photos.map((value, index) => (
                  <Text
                    key={index}
                    style={this.state.imgActive == index ? styles.dotActive : styles.dot}
                  >
                    ●
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.DocumnetContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.ShopTitle}>{this.state.data[0].name}</Text>
                  <Text style={styles.Shopsulg}>{this.getStorename(this.state.data[0].category)}</Text>
                  <Text style={styles.ShopAddress}>
                    {this.state.data[0].address}

                  </Text>
                </View>

                {/* <View style={styles.ShopNowButton}>
                  <Text style={styles.ShopNowButtonText}>Shop Now</Text> 
              </View> */}

              </View>
              <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                <View style={{ marginLeft: 20, width: '11%' }}>
                  <Text style={globalstyle.Ratingbutton}>{this.state.data[0].rating}</Text>
                </View>
                <View style={{ marginLeft: 10, width: '20%' }}>
                  <Rating
                    type='custom'
                    ratingColor={globalcolor.PrimaryColor}
                    startingValue={this.state.data[0].rating}
                    ratingBackgroundColor='#c8c7c8'
                    ratingCount={5}
                    imageSize={15}
                    readonly={true}
                    //onFinishRating={this.ratingCompleted}
                    style={{ marginLeft: 5, marginTop: 5 }}
                  />
                </View>
                {/* <View style={styles.ReviewContainer}>
                    <Text style={styles.ReviewText}>Write a Revice</Text>
                </View> */}
              </View>
              <View style={{ marginTop: 20, borderTopWidth: 0.5, borderTopColor: globalcolor.SeconderFontColor }}>
                <Text style={[styles.ShopTitle, { marginTop: 20 }]}>Shop deatils</Text>
                <Text style={{ padding: 20, textAlign: 'justify' }}>
                  {this.state.data[0].description}
                </Text>

              </View>
            </View>

          </ScrollView>

          {this.shopNow(this.state.data[0].isBoomPartner, this.state.data[0].acceptsCOD, this.state.data[0].requireSlot)}


        </SafeAreaView>
      );
    } else {
      return (
        <View style={globalstyle.ActivityContainer}>
          {this.ActivityIndicatorShow()}
          <Text style={globalstyle.ActivityIndicator}>Loading please wait....</Text>

        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 28

  },
  DocumnetContainer: {
    marginTop: 10,
  },

  wrapdot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dotActive: {
    margin: 3,
    color: 'black',

  },
  dot: {
    margin: 3,
    color: 'white'
  },
  ShopNowButton:
  {
    width: '25%',
    height: 42,
    backgroundColor: globalcolor.PrimaryColor,
    padding: 10,
    borderRadius: 20
  },
  ShopNowButtonText: {
    color: '#fff',
    fontFamily: globalcolor.Font,
    fontWeight: '700'

  },
  ReviewText: {
    color: '#fff',
    fontFamily: globalcolor.Font

  },
  ShopTitle: {
    marginLeft: 20,
    fontFamily: globalcolor.Font,
    fontSize: 20,
    fontWeight: '400',
    color: globalcolor.SeconderFontColor
  },
  Shopsulg: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 20,
    fontFamily: globalcolor.Font,
    fontWeight: '300',
    color: globalcolor.SeconderFontColor
  },
  ShopAddress: {
    marginTop: 5,
    marginLeft: 20,
    fontFamily: globalcolor.Font,

    color: globalcolor.SeconderFontColor
  },
  ReviewContainer: {
    marginLeft: 20,
    backgroundColor: globalcolor.PrimaryColor,
    padding: 7,
    borderRadius: 20
  }
});