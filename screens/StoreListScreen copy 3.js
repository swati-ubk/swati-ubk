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
  TextInput
} from "react-native";
import { ConfigFile } from '../service/ConfigFile';
import { globalcolor } from '../style/globalcolor';
import { globalstyle } from '../style/globals.js';
import WebService from '../service/WebService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class StoreList extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      data: [],
      refreshing: false,
      category: this.props.route.params.Catvalue,
      lat: this.props.route.params.location.lat,
      lng: this.props.route.params.location.lng,
      address: '',
      loading: false,
      offset: 0,
      loadmore: false,
      nodata: false,

    }
    console.log('StoreListScreen state..', JSON.stringify(this.state));
  }
  async componentDidMount() {
    this.setState({ data: [] })
    // this.setState({ refreshing: true });
    setTimeout(() => {
      this.fetchCats('didcall');
    }, 1000);

  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prevState..', prevState);
    let a = prevState.category;
    let b = this.props.route.params.Catvalue;
    console.log(this.props.route.params.location.lat + '=============', prevState.lat);
    console.log(a + '======a and b=======', b);

    var latlong = this.props.route.params.location.lat;
    var oldlatlong = prevState.lat;
    if (latlong != oldlatlong || a != b) {
      console.log('Ok lat and lng same...')

      // this.setState({ data: [] })
      // this.setState({ category: this.props.route.params.Catvalue, nodata: false, lat: this.props.route.params.location.lat, lng: this.props.route.params.location.lng })
      setTimeout(() => {
        this.fetchCats('update_call');
      }, 1000);
    }
    // if ((this.props.route.params.location.lat != prevState.lat) || (a != b)) {
    //   console.log('Ok lat and lng same...')
    //   this.setState({ data: [] })
    //   this.setState({ category: this.props.route.params.Catvalue, nodata: false, lat: this.props.route.params.location.lat, lng: this.props.route.params.location.lng })
    //   this.fetchCats('update_call');
    // } else {
    //   console.log('Lat lng is different ......')

    // }


    // if (a != b) {
    //   this.setState({ data: [] })
    //   this.setState({ category: this.props.route.params.Catvalue, nodata: false })
    //   // this.setState({ refreshing: true });
    //   setTimeout(() => {
    //     this.fetchCats('update_call');
    //   }, 1000);
    // } else {

    // }
  }

  // and don't forget to remove the listener

  fetchCats = (callfrom) => {
    console.log('call from.........', callfrom);
    console.log('no data.........', this.state.nodata);
    console.log('no refreshing.........', this.state.refreshing);
    if ((!this.state.nodata) && (!this.state.refreshing)) {

      console.log('call me -------------')
      this.setState({ refreshing: true });
      //  this.setState({ loading: true });
      WebService.GetData('search/business?category=' + this.state.category + `&lat=${this.state.lat}&lng=${this.state.lng}&limit=20&skip=
       `+ this.state.offset)
        // fetch('http://api.beta.diskounto.com/search/business?category='+this.state.category+'&lat=25.5940947&lng=85.1375645&formattedAddress=Patna%2C%20Bihar%2C%20India&city=Patna&state=BR&limit=20&skip='+this.state.offset)
        .then(res => res.json())
        .then(resJson => {
          console.log('StoreList........', resJson)
          if (resJson.length > 0) {
            this.setState({ data: resJson });
            this.setState({ refreshing: false, nodata: true, category: this.props.route.params.Catvalue, lat: this.props.route.params.location.lat, lng: this.props.route.params.location.lng });
          } else {
            this.setState({ refreshing: false });
          }
        }).catch(e => console.log(e));
    }
  }
  /**************************Start Here Search Product*******************************/
  SearchStore = (seatchText) => {
    console.log('seatchText........', seatchText);
    console.log('seatchText length........', seatchText.length);
    this.setState({ refreshing: true, nodata: false });
    if (seatchText.length > 0) {
      // console.log('StoreID............', this.state.StoreID);
      WebService.GetDataJSon(`search/business?searchText=${seatchText}&lat=25.5940947&lng=85.1375645&formattedAddress=Patna%2C%20Bihar%2C%20India&city=Patna&state=BR&limit=60&skip=0`)
        .then(response => {
          if (response.length > 0) {
            //  console.log(JSON.stringify(response))
            this.setState({ data: response, refreshing: false });

          } else {
            this.setState({ data: [], refreshing: false });
          }

        });
    } else {
      console.log('text leneth 00000000000000000');
      this.setState({ nodata: false });
      this.fetchCats('search');
    }
  }
  /**************************End  Here Search Product*******************************/
  renderItemComponent = (data) =>
    <TouchableOpacity style={styles.ProductListrow}
      onPress={() => { this.props.navigation.navigate('StoreDetailsScreen', { StoreId: data.item.id }) }}
    >
      <View style={styles.ProductlistFirstItem}>
        <Image
          source={{ uri: ConfigFile.ImageBaseUrl + data.item.photos[0].path }} //Change your icon image here
          style={[styles.ProductImage]}
        />
      </View>
      <View style={styles.ListBody}>
        <Text style={globalstyle.ListPrimaryText}>{data.item.name}</Text>
        <Text style={styles.SlugListText}>{data.item.slug}</Text>
        <Text style={styles.Productdesc}>{data.item.description.substring(0, 65)}</Text>


      </View>
      <View style={styles.ListSecondIcon}>
        <Text style={globalstyle.Ratingbutton}>{data.item.rating}</Text>
      </View>
    </TouchableOpacity>




  ItemSeparator = () =>

    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
      }}
    />
  renderFooter = () => {
    return (
      <View style={styles.footer}>
        {this.state.loading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };
  handleRefresh = () => {
    this.setState({ refreshing: false }, () => { this.fetchCats('PulltoRefresh') }); // call fetchCats after setting the state
  }
  handleBackButtonClick() {

    console.log('Back buttton............', this.props.navigation);
    this.props.navigation.goBack();
    return true;
  }
  render() {
    // console.log(this.props.route.params.Catvalue);
    return (
      this.state.data.length > 0 ?
        <SafeAreaView style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
          {/*------------BACK BUTTON START------------------*/}
          <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, marginRight: 15, marginTop: 30 }}>
            <TouchableOpacity
              onPress={() => this.handleBackButtonClick()}
            >
              <View style={{ flex: 0.2, marginRight: 20 }}>
                <FontAwesome name="arrow-left" color={globalcolor.PrimaryColor} size={20} />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 0.8 }}>
              <Text style={{ color: globalcolor.PrimaryColor, fontFamily: globalcolor.Font, fontSize: 20 }}>
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
              placeholder='Search store'
              style={globalstyle.SearchBox}
              onChangeText={(val) => this.SearchStore(val)}
            />

          </View>

          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id.toString()}
            //  ItemSeparatorComponent={this.ItemSeparator}
            renderItem={item => this.renderItemComponent(item)}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            // onEndReached={this.fetchCats('endcall')}
            onEndReachedThreshold={0.5}


          />
        </SafeAreaView>
        : <SafeAreaView style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginTop: 50, alignSelf: 'center' }}>
            <Text style={{ textAlign: 'center' }}>No Store Found In this Location</Text>
          </View>

        </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  footer: {
    //  padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ProductlistFirstItem: {
    width: '30%'
  },
  ListBody: {
    marginLeft: 10,
    margin: 10,
    width: '55%',
    //padding:10


  },
  ListSecondIcon: {
    width: '15%',

  },
  ProductListrow: {
    //marginLeft:20,
    //marginRight:20,
    width: '100%',
    flexDirection: 'row',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 0.20,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,

  },
  ProductImage: {
    height: 100,
    width: 100,
    borderRadius: 10
  },
  SlugListText: {
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
    marginTop: 2,
    fontWeight: 'bold'
  },
  Productdesc: {
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor
  }

});