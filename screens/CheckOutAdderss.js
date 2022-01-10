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
import Option from './components/Option';
import Moment from 'moment';
import {globalstyle} from '../style/globals.js';

export default class CheckOutAdderss extends Component {
  constructor(props) {
    super(props);
    console.log('CheckOutProbs...', this.props);
    this.state = {
      value: 1,
      // data: this.props.route.params.localcart,
      //  StoreID:this.props.route.params.StoreID,
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
      StoreID: this.props.route.params.StoreID,
      localcart: this.props.route.params.localcart,
      acceptsCOD: this.props.route.params.acceptsCOD,
      requireSlot: this.props.route.params.requireSlot,
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
    };
    this.radio_props = [
      {label: 'Home Delivery   ', value: 'DELIVERY'},
      {label: 'Self Pickup   ', value: 'PICKUP'},
    ];
    if (this.state.acceptsCOD == 'YES') {
      this.payment_type = [
        {label: 'Pay Online   ', value: 'PREPAID'},
        {label: 'Cash on Delivery   ', value: 'COD'},
      ];
    }
    // else if (this.state.deliveryType == 'PICKUP') {
    //   this.payment_type = [

    //     { label: 'Pay Online   ', value: 'PREPAID' }
    //   ]
    // }
    else {
      this.payment_type = [{label: 'Pay Online   ', value: 'PREPAID'}];
    }
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
      if (this.state.requireSlot == 'YES') {
        this.fetchData2();
      }
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
    //  console.log('me data', requestOptions);

    WebService.PostData('me', requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log('usersdata', response);

        //const json = await response.json();
        console.log(
          '=================amount===============',
          response.user.firstName,
        );

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

        this.DeliveryCheck(this.state.userAddress[0]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchData2 = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    WebService.PostData(`delivery-slot/${this.state.StoreID}`, requestOptions)
      .then(response => response.json())
      .then(response => {
        this.setState({datetime: response});
        //const json = await response.json();
        // console.log("----------000000---------",response);
        // this.setState({ selectedDateTime: response[0] })
        for (let i = 0; i < response.length; i++) {
          this.setState({
            timeslote: [
              ...this.state.timeslote,
              {
                label: Moment(response[i].date).format('DD MMM YYYY'),
                value: response[i].id,
              },
            ],
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  DeliveryCheck(Address) {
    console.log('Address..', this.state.StoreID);

    let requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        businessId: this.state.StoreID,
        items: this.state.localcart,
        address: Address,
        checkoutOption: this.state.deliveryType,
      }),
    };
    console.log(
      'Address requestOptions..',
      JSON.stringify({
        businessId: this.state.StoreID,
        items: this.state.localcart,
        address: Address,
        checkoutOption: this.state.deliveryType,
      }),
    );

    WebService.PostData('cart-details', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        console.log('AddressCheck...', resJson);
        this.setState({
          isDeliverable: resJson.isDeliverable,
          DeliverablePaymentDeatils: resJson.pricing,
        });
      })
      .catch(e => console.log(e));
  }
  CheckdeliveryType(Option) {
    this.setState({deliveryType: Option});
    if (Option == 'PICKUP') {
      let requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          businessId: this.state.StoreID,
          items: this.state.localcart,
          address: null,
          checkoutOption: this.state.deliveryType,
        }),
      };
      console.log('requestOptions 222', {
        businessId: this.state.StoreID,
        items: this.state.localcart,
        address: null,
        checkoutOption: this.state.deliveryType,
      });
      WebService.PostData('cart-details', requestOptions)
        .then(res => res.json())
        .then(resJson => {
          console.log('Check Delivey...', resJson);
          this.setState({
            isDeliverable: resJson.isDeliverable,
            DeliverablePaymentDeatils: resJson.pricing,
            PickUpaddress: resJson.pickUpDetails.address,
          });
        })
        .catch(e => console.log(e));
    }
  }

  isDeliverable() {
    if (this.state.deliveryType == 'DELIVERY') {
      return this.state.isDeliverable ? null : (
        <View
          style={{
            borderWidth: 0.5,
            padding: 5,
            borderColor: globalcolor.PrimaryColor,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: globalcolor.Font,
              color: globalcolor.Errorcolor,
            }}>
            This address is not serviceable. Please select a different address.
          </Text>
        </View>
      );
    }
  }
  ConfirmOrder(data) {
    console.log('Confirm Order...', JSON.stringify(data));
    let OrderText = '';
    if (data.payment == 'PREPAID') {
      OrderText =
        'PAY NOW ( ₹' +
        this.state.DeliverablePaymentDeatils.customerToPay +
        ' )';
    } else {
      OrderText =
        'PLACE ORDER ( ₹' +
        this.state.DeliverablePaymentDeatils.customerToPay +
        ' )';
    }

    if (data.requireSlot == 'YES' && data.dateTime != '') {
      if (data.delivery == 'DELIVERY') {
        return this.state.isDeliverable ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Payment', {data: data});
            }}>
            <View style={globalstyle.FooterTabButton}>
              <Text style={globalstyle.FooterTabText}> {OrderText}</Text>
            </View>
          </TouchableOpacity>
        ) : null;
      } else {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Payment', {data: data});
            }}>
            <View style={globalstyle.FooterTabButton}>
              <Text style={globalstyle.FooterTabText}> {OrderText}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    } else {
      if (data.delivery == 'DELIVERY') {
        return this.state.isDeliverable ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Payment', {data: data});
            }}>
            <View style={globalstyle.FooterTabButton}>
              <Text style={globalstyle.FooterTabText}> {OrderText}</Text>
            </View>
          </TouchableOpacity>
        ) : null;
      } else {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Payment', {data: data});
            }}>
            <View style={globalstyle.FooterTabButton}>
              <Text style={globalstyle.FooterTabText}> {OrderText}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    }
  }
  DeliverySolt() {
    return this.state.requireSlot == 'YES' ? (
      <View style={styles.card}>
        <View style={{flex: 1}}>
          <Text style={styles.textHeader}>Delivery Slot </Text>
        </View>

        <Option
          options={this.state.timeslote}
          onChange={option => {
            console.log(option, 'ddddddddddddddd');
            //this.setState({ dateTimeType: option })

            for (let j = 0; j < this.state.datetime.length; j++) {
              //console.log("6666666666666666.....    ",this.state.userAddress[j].id)
              if (this.state.datetime[j].id === option) {
                // console.log("xxxxxxxxxxxx.....    ",this.state.userAddress[j])
                this.setState({selectedDateTime: this.state.datetime[j]});
              }
            }
          }}
        />
      </View>
    ) : null;
  }
  DeliveryCard() {
    return this.state.deliveryType == 'DELIVERY' ? (
      <View style={styles.card}>
        <View style={styles.padingBottom}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.textHeader}>Select Delivery Address</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AddressScreen');
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

          {this.isDeliverable()}
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
                this.DeliveryCheck(this.state.userAddress[j]);
              }
            }
          }}></RadioForm>
      </View>
    ) : (
      <View style={styles.card}>
        <View style={{flex: 1}}>
          <Text style={styles.textHeader}>Pickup Location</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 0.2}}>
            <Image
              source={require('../assets/img/marker.png')} //Change your icon image here
              style={globalstyle.ImageStyle}
            />
          </View>
          <View style={{flex: 0.8}}>
            <Text>{this.state.PickUpaddress}</Text>
          </View>
        </View>
      </View>
    );
  }
  PaymentDetails() {
    if (this.state.deliveryType == 'DELIVERY') {
      return this.state.isDeliverable ? (
        <View style={styles.card}>
          <View style={{flex: 1}}>
            <Text style={styles.textHeader}>Payment Details </Text>
          </View>
          <View style={styles.PaymentDetailsRow}>
            <View style={{flex: 0.5}}>
              <Text>Total Price</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>
                ₹ {this.state.DeliverablePaymentDeatils.totalPrice}
              </Text>
            </View>
          </View>
          <View style={styles.PaymentDetailsRow}>
            <View style={{flex: 0.5}}>
              <Text>Delivery Charge</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>
                ₹{' '}
                {this.state.DeliverablePaymentDeatils.deliveryCharge.amount +
                  this.state.DeliverablePaymentDeatils.deliveryCharge.gst}
              </Text>
            </View>
          </View>
          <View style={styles.PaymentDetailsRow}>
            <View style={{flex: 0.5}}>
              <Text>Transaction Charge</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>
                ₹{' '}
                {this.state.DeliverablePaymentDeatils.transactionCharge.amount +
                  this.state.DeliverablePaymentDeatils.transactionCharge.gst}
              </Text>
            </View>
          </View>
          <View style={[styles.PaymentDetailsRow]}>
            <View style={{flex: 0.5}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Amount to Pay
              </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
                ₹ {this.state.DeliverablePaymentDeatils.customerToPay}{' '}
              </Text>
            </View>
          </View>
        </View>
      ) : null;
    } else {
      return (
        <View style={styles.card}>
          <View style={{flex: 1}}>
            <Text style={styles.textHeader}>Payment Details </Text>
          </View>
          <View style={styles.PaymentDetailsRow}>
            <View style={{flex: 0.5}}>
              <Text>Total Price</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>
                ₹ {this.state.DeliverablePaymentDeatils.totalPrice}
              </Text>
            </View>
          </View>
          {/* <View style={styles.PaymentDetailsRow}>
              <View style={{ flex: 0.5 }}>
                <Text>Delivery Charge</Text>
              </View>
              <View style={{ flex: 0.5 }}>
                <Text style={{ textAlign: 'right' }}>₹ {this.state.DeliverablePaymentDeatils.deliveryCharge.amount + this.state.DeliverablePaymentDeatils.deliveryCharge.gst}</Text>
              </View>
            </View> */}
          <View style={styles.PaymentDetailsRow}>
            <View style={{flex: 0.5}}>
              <Text>Transaction Charge</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right'}}>
                ₹{' '}
                {this.state.DeliverablePaymentDeatils.transactionCharge.amount +
                  this.state.DeliverablePaymentDeatils.transactionCharge.gst}
              </Text>
            </View>
          </View>
          <View style={[styles.PaymentDetailsRow]}>
            <View style={{flex: 0.5}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Amount to Pay
              </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
                ₹ {this.state.DeliverablePaymentDeatils.customerToPay}{' '}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
  render() {
    console.log('---DELIVERY----', this.state.deliveryType);
    console.log('----PAYMENT-----', this.state.paymentType);
    console.log('----ADDRESS-----', this.state.addressType);
    console.log('----dateTimeType-----', this.state.selectedDateTime);

    console.log('----ADDRESS1-----', this.state.selectedAddress);

    if (this.state.deliveryType == 'PICKUP') {
      // this.setState({ paymentType: 'PREPAID' })
      this.payment_type = [{label: 'Pay Online   ', value: 'PREPAID'}];
    } else {
      this.payment_type = [
        {id: 'PREPAID', label: 'Pay Online   ', value: 'PREPAID'},
        {id: 'COD', label: 'Cash on Delivery   ', value: 'COD'},
      ];
    }
    let data = {
      payment: this.state.paymentType,
      dateTime: this.state.selectedDateTime,
      delivery: this.state.deliveryType,
      address: this.state.selectedAddress,
      token: this.state.userToken,
      userNmae: this.state.userNmae,
      UserEmail: this.state.UserEmail,
      userPhone: this.state.userPhone,
      localcart: this.state.localcart,
      isDeliverable: this.state.isDeliverable,
      requireSlot: this.state.requireSlot,
      StoreID: this.state.StoreID,
    };

    // console.log("sdsdsdsdsdss-4r------->",this.state.timeslote)

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={([styles.container], {flex: 1, padding: 1, marginTop: 50})}>
            <View>
              <View style={styles.card}>
                <View style={styles.padingBottom}>
                  <Text style={styles.textHeader}>
                    How do you want this order?
                  </Text>
                </View>

                <RadioForm
                  radio_props={this.radio_props}
                  initial={0}
                  animation={true}
                  formHorizontal={true}
                  selectedButtonColor={globalcolor.PrimaryColor}
                  buttonColor={globalcolor.PrimaryColor}
                  onPress={value => {
                    this.CheckdeliveryType(value);

                    // this.setState({ deliveryType: value })
                  }}
                />
              </View>

              <View style={styles.card}>
                <View style={styles.padingBottom}>
                  <Text style={styles.textHeader}>How do you like to pay?</Text>
                </View>

                <RadioForm
                  radio_props={this.payment_type}
                  initial={0}
                  animation={true}
                  formHorizontal={true}
                  selectedButtonColor={globalcolor.PrimaryColor}
                  buttonColor={globalcolor.PrimaryColor}
                  onPress={value => {
                    this.setState({paymentType: value});
                  }}
                />
              </View>

              {this.DeliveryCard()}
              {this.DeliverySolt()}
              {this.PaymentDetails()}
            </View>
          </View>
        </ScrollView>

        {this.ConfirmOrder(data)}

        {/* <Footer data={data1}  /> */}
      </SafeAreaView>
    );
  }
}

const paymentDatails = data => {
  console.log('payment Deatils', JSON.stringify(data));

  //data.data.prop.navigation.navigate('Payment',{data:data})
};

//data.data.prop.navigation.navigate('Payment')
const Footer = data => {
  return data.data.isDeliverable ? (
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
  ) : null;
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
