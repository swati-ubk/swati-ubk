import React from 'react';
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
} from 'react-native';
import {ConfigFile} from '../service/ConfigFile';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import WebService from '../service/WebService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class ProductListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      //   StoreID:this.props.route.params.StoreId,
      CatId: '',
      loading: false,
      offset: 0,
      loadmore: false,
      nodata: false,
      cartegorydata: [],
      noserachItem: true,
    };
  }

  async componentDidMount() {
    this.setState({data: []});
    this.setState({loading: true});
    setTimeout(() => {
      this.fetchCats('didcall');
    }, 1000);
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     let a =prevState.StoreID;
  //     let b =  this.props.route.params.StoreId;
  //    if(a!=b)
  //    {
  //        this.setState({data:[]});
  //        this.setState({loading:true});
  //        this.setState({StoreID:this.props.route.params.StoreId})
  //         setTimeout(() => {
  //          this.fetchCats('didupdate');
  //         }, 1000);
  //    }else{

  //    }
  //  }

  // and don't forget to remove the listener

  fetchCats = callType => {
    console.log('ok data');

    //}
  };

  /**************************Start Here Search Product*******************************/
  SearchProduct = seatchText => {
    console.log('seatchText........', seatchText.length);
    this.setState({refreshing: true});
    if (seatchText.length > 0) {
      console.log('StoreID............', this.state.StoreID);
      WebService.GetDataJSon(
        `business-details/${this.state.StoreID}/products?searchText=${seatchText}&limit=10&skip=0`,
      ).then(response => {
        if (response.length > 0) {
          console.log(JSON.stringify(response));
          this.setState({data: response, refreshing: false});
        } else {
          this.setState({data: [], refreshing: false, noserachItem: false});
        }
      });
    } else {
      this.getproductlist(this.state.StoreID, this.state.CatId);
    }
  };
  /**************************End  Here Search Product*******************************/

  renderItemComponent = data => {
    return (
      <View>
        <Text>Ok Order page</Text>
      </View>
    );
  };

  ItemSeparator = () => (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
      }}
    />
  );
  renderFooter = () => {
    return (
      <View style={styles.footer}>
        {this.state.loading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{margin: 15}}
          />
        ) : null}
      </View>
    );
  };
  ActivityIndicatorShow() {
    return (
      <View>
        {this.state.loading ? (
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
  }
  handleRefresh = () => {
    this.setState({refreshing: false}, () => {
      this.fetchCats('pullRefresh');
    }); // call fetchCats after setting the state
  };
  handleBackButtonClick() {
    console.log('Back buttton............', this.props.navigation);
    this.props.navigation.goBack();
    return true;
  }

  render() {
    //  console.log("length==="+this.state.cartegorydata.length);
    // if(this.state.cartegorydata.length>1){

    return (
      // this.state.noserachItem?
      <SafeAreaView style={{flex: 1, marginLeft: 10, marginRight: 10}}>
        {/*------------BACK BUTTON START------------------*/}
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderRadius: 10,
            marginRight: 15,
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={() => this.handleBackButtonClick()}>
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
              Product List
            </Text>
          </View>
        </View>
        {/*------------BACK BUTTON END------------------*/}
        <View>
          {/* <View style={[globalstyle.serachBar,globalstyle.BorderSearchbar]}>
            <View>
                <Image
                      source={require('../assets/img/SearchIcon.png')} //Change your icon image here
                      style={globalstyle.SearchIcon}
                  />
            </View>
              <TextInput 
                placeholder='Search Product'
                style={globalstyle.SearchBox}
                onChangeText={(val) => this.SearchProduct(val)}
              />
              
          </View> */}
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.5}}>
              <Text style={{alignSelf: 'center', borderBottomWidth: 1}}>
                Bussiness Order
              </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{alignSelf: 'center'}}>Rewards Order</Text>
            </View>
          </View>

          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.ItemSeparator}
            renderItem={item => this.renderItemComponent(item)}
            //  ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            // onEndReached={this.fetchCats('endcall')}
            onEndReachedThreshold={0.5}
          />
        </View>
      </SafeAreaView>
    );
    //  }else{

    //    return(
    //     <View style={globalstyle.ActivityContainer}>
    //     {this.ActivityIndicatorShow()}
    //     <Text style={globalstyle.ActivityIndicator}>Loading please wait....</Text>

    //     </View>
    //    )

    //  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    //  backgroundColor: "#FFF5EA",
    // padding: 20,
    //  margin: 10,
  },
});
