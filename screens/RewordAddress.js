import React, {Component} from 'react';
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
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {globalcolor} from '../style/globalcolor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebService from '../service/WebService';
///import Option from './components/Option';
//import Moment from 'moment';
import {globalstyle} from '../style/globals.js';

export default class RewordAddress extends Component {
  constructor(props) {
    super(props);
    console.log('CheckOutProbs...', this.props);
    this.state = {
      value: 1,
      // data: this.props.route.params.localcart,
      //  StoreID:this.props.route.params.StoreID,
      ApplicableBal: this.props.route.params.total,
      isLoading: true,
      count: 0,
      totalPrice: 0,
      deliveryType: 'DELIVERY',
      paymentType: 'PREPAID',
      addressType: '',
      dateTimeType: '',
      selectedAddress: '',
      selectedDateTime: '',
      userToken: null,
      data: [],
      userNmae: '',
      userPhone: '',
      UserEmail: '',
      userAddress: [],
      address: [],
      timeslote: [],
      datetime: [],
      isDeliverable: false,
      DeliverablePaymentDeatils: [],
      PickUpaddress: '',
      AvailableBalange: 0,
      localcartReword: [],
    };
  }

  componentDidMount() {
    // console.log( this.state.userToken,"1111111111111111111")
    // this.fetchData();
    this.importData();
  }

  importData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token, 'tokenn');

      this.setState({userToken: token});
      this.fetchData(token);

      const RewordCart = await AsyncStorage.getItem('RewordCart');
      let dattt = JSON.parse(RewordCart);

      console.log('-========dddddd=======', RewordCart);

      this.setState(state => ({
        localcartReword: dattt,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  fetchData = async token => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    WebService.PostData('me', requestOptions)
      .then(response => response.json())
      .then(response => {
        //   console.log("address",response)

        //const json = await response.json();
        console.log(
          '=================amount===============',
          response.user.promoCoins,
        );
        this.setState({AvailableBalange: response.user.promoCoins});

        this.setState({userAddress: response.user.address});
        this.setState({data: response});
        this.setState({addressType: response.user.address[0].id});
        this.setState({selectedAddress: this.state.userAddress[0]});
        this.setState({
          userNmae: response.user.firstName + ' ' + response.user.lastName,
        });
        this.setState({UserEmail: response.user.email});
        this.setState({userPhone: response.user.mobile});
        console.log('selectedAddress..', this.state.userAddress[0]);
        {
          response.user.address.map((item, key) =>
            this.setState({
              address: [
                ...this.state.address,
                {
                  label:
                    item.addressType +
                    '\n' +
                    item.address +
                    ', ' +
                    item.locality +
                    ', ' +
                    item.city +
                    ', ' +
                    item.state +
                    ', ' +
                    item.pin,
                  value: item.id,
                },
              ],
            }),
          );
        }

        // this.DeliveryCheck(this.state.userAddress[0]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  DeliveryCard() {
    return (
      <View style={styles.card}>
        <View style={styles.padingBottom}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.textHeader}>1. Select Delivery Address</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  '';
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: globalcolor.PrimaryColor,
                      paddingRight: 3,
                    }}>
                    Add New
                  </Text>
                  <FontAwesome
                    name="plus"
                    color={globalcolor.PrimaryColor}
                    size={20}
                    style={{paddingLeft: 3}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <RadioForm
          radio_props={this.state.address}
          initial={0}
          animation={true}
          selectedButtonColor={globalcolor.PrimaryColor}
          buttonColor={globalcolor.PrimaryColor}
          onPress={value => {
            this.setState({addressType: value});

            for (let j = 0; j < this.state.userAddress.length; j++) {
              console.log(
                '6666666666666666.....',
                this.state.userAddress[j].id,
              );
              if (this.state.userAddress[j].id === value) {
                console.log('xxxxxxxxxxxx.....', this.state.userAddress[j]);
                this.setState({selectedAddress: this.state.userAddress[j]});
                //this.DeliveryCheck(this.state.userAddress[j])
              }
            }
          }}></RadioForm>
      </View>
    );
  }

  render() {
    console.log('---DELIVERY----', this.state.deliveryType);
    console.log('----PAYMENT-----', this.state.paymentType);
    console.log('----ADDRESS-----', this.state.addressType);
    console.log('----dateTimeType-----', this.state.selectedDateTime);

    ///console.log("----ADDRESS1-----", this.state.selectedAddress)

    let promoCoins = this.state.ApplicableBal;
    let data = {
      addressId: this.state.addressType,
      applicable: {promoCoins},
      token: this.state.userToken,
      cart: this.state.localcartReword,
      props: this.props,
    };
    console.log('----ADDRESS1-----', data);

    // console.log("sdsdsdsdsdss-4r------->",this.state.timeslote)

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={([styles.container], {flex: 1, padding: 1, marginTop: 50})}>
            <View>
              {this.DeliveryCard()}

              <View>
                <View style={styles.card}>
                  <View style={styles.padingBottom}>
                    <View style={{width: '100%', flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text style={styles.textHeader}>2. PAYMENT</Text>
                      </View>

                      <View></View>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.textHeader}>Diskounto Coin</Text>

                    <View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        <View style={{flex: 1}}>
                          <Text>Available Balance</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            textAlign: 'left',
                            fontSize: 15,
                          }}>
                          <Image
                            source={{
                              uri: 'https://diskounto.com/common/reward-coin.png',
                            }}
                            style={{width: 25, height: 25, borderRadius: 70}}
                          />
                          <Text style={{alignSelf: 'center'}}>
                            {' '}
                            {this.state.AvailableBalange}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        <View style={{flex: 1}}>
                          <Text>Applicable</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            textAlign: 'left',
                            fontSize: 15,
                          }}>
                          <Image
                            source={{
                              uri: 'https://diskounto.com/common/reward-coin.png',
                            }}
                            style={{width: 25, height: 25, borderRadius: 70}}
                          />
                          <Text style={{alignSelf: 'center'}}>
                            {' '}
                            {this.state.ApplicableBal}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* {this.ConfirmOrder(data)} */}
        <Footer data={data} />
      </SafeAreaView>
    );
  }
}

const paymentDatails = async data => {
  console.log('payment Deatils', data.data.token);
  /// console.log('payment Deatils', JSON.stringify(data));

  // let orderData=JSON.stringify(data)

  //this.fetchData2(data.data)
  ///console.log('payment Deatils', data.data);
  //data.data.prop.navigation.navigate('Payment',{data:data})
  //http://api.beta.diskounto.com/store/order

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + data.data.token,
    },
    body: JSON.stringify(data.data),
  };
  console.log('Reward Items Details1122...', requestOptions);

  WebService.PostData('store/order', requestOptions)
    .then(response => response.json())
    .then(response => {
      //   console.log("address",response)

      //const json = await response.json();
      console.log('RewardsOrder....', JSON.stringify(response));
      if (response.orders[0].orderState == 'CREATED') {
        data.data.props.navigation.navigate('RewardsSuccessScreen', {
          OrderData: response,
          OrderID: response.orders[0].orderId,
        });
      } else {
      }

      // this.DeliveryCheck(this.state.userAddress[0]);
    })
    .catch(error => {
      console.error(error);
    });
};

//data.data.prop.navigation.navigate('Payment')
const Footer = data => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          paymentDatails(data);
        }}>
        <View style={globalstyle.FooterTabButton}>
          <Text style={globalstyle.FooterTabText}> CONFIRM ORDER</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    marginTop: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  textHeader: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  padingBottom: {
    paddingBottom: 7,
  },
  PaymentDetailsRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
});
///export default CheckOutAdderss;
