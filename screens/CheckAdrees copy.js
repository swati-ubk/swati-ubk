import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { globalcolor } from '../style/globalcolor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebService from '../service/WebService';
import Option from './components/Option';
import Moment from 'moment';
import { globalstyle } from '../style/globals.js';

var radio_props = [
  { label: 'Home Delivery   ', value: 'DELIVERY' },
  { label: 'Self Pickup   ', value: 'PICKUP' }
];

var payment_type = [
  { label: 'Cash on Delivery   ', value: 'COD' },
  { label: 'Pay Online   ', value: 'PREPAID' }
];


export default class CheckOutAdderss extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      // data: this.props.route.params.localcart,
      //  StoreID:this.props.route.params.StoreID,

      isLoading: true,
      count: 0,
      totalPrice: 0,
      deliveryType: 'DELIVERY',
      paymentType: 'COD',
      addressType: '',
      dateTimeType: '',
      dateTimeType: '',
      selectedAddress: '',
      selectedDateTime: '',
      userToken: null,
      data: [],
      StoreID: this.props.route.params.StoreID,
      localcart: this.props.route.params.localcart,
      userNmae: '',
      userPhone: '',
      UserEmail: '',
      userAddress: [],
      address: [],
      timeslote: [],
      datetime: [],
      isDeliverable: false
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
      console.log(token, "tokenn")

      this.setState({ userToken: token });
      this.fetchData(token);
      this.fetchData2()

    } catch (error) {
      console.error(error)
    }


  }



  fetchData = async (token) => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    };
    WebService.PostData('me', requestOptions)
      .then((response) => response.json())
      .then((response) => {
        //   console.log("address",response)

        //const json = await response.json();
        console.log("=================amount===============", response.user.firstName);


        this.setState({ userAddress: response.user.address });
        this.setState({ data: response });
        this.setState({ addressType: response.user.address[0].id });
        this.setState({ selectedAddress: this.state.userAddress[0] })
        this.setState({ userNmae: response.user.firstName + ' ' + response.user.lastName })
        this.setState({ UserEmail: response.user.email })
        this.setState({ userPhone: response.user.mobile })
        console.log("selectedAddress..", this.state.userAddress[0]);
        {
          response.user.address.map((item, key) => (

            this.setState({ address: [...this.state.address, { "label": item.addressType + "\n" + item.address + ", " + item.locality + ", " + item.city + ", " + item.state + ", " + item.pin, "value": item.id }] })

          )
          )
        }

        this.DeliveryCheck(this.state.userAddress[0]);

      })
      .catch((error) => {
        console.error(error);
      });



  };

  fetchData2 = async () => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    WebService.PostData('delivery-slot/605a0d38c98f1137023019dc', requestOptions)
      .then((response) => response.json())
      .then((response) => {

        this.setState({ datetime: response })
        //const json = await response.json();
        // console.log("----------000000---------",response);
        this.setState({ selectedDateTime: response[0] })



        for (let i = 0; i < response.length; i++) {

          this.setState({ timeslote: [...this.state.timeslote, { label: Moment(response[i].date).format('DD MMM YYYY'), value: response[i].id },] })

        }




      })
      .catch((error) => {
        console.error(error);
      });



  };

  DeliveryCheck(Address) {
    console.log("Address..", Address);
    //data.data.setState({isDeliverable:false})

    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessId: "605a0d38c98f1137023019dc", items: this.state.localcart, address: Address, checkoutOption: "DELIVERY" })
    };
    //  console.log("requestOptions",{businessId: "605a0d38c98f1137023019dc",items:data.data.localcart,address:address,checkoutOption:"DELIVERY"});
    WebService.PostData('cart-details', requestOptions)
      .then(res => res.json())
      .then(resJson => {
        console.log('AddressCheck...', resJson.isDeliverable);
        this.setState({ isDeliverable: resJson.isDeliverable });
      }).catch(e => console.log(e));


  }





  isDeliverable() {
    return (
      this.state.isDeliverable ?
        null
        : <View style={{ borderWidth: 0.5, padding: 5, borderColor: globalcolor.PrimaryColor, marginTop: 20 }}>
          <Text style={{ fontFamily: globalcolor.Font, color: globalcolor.Errorcolor }}>This address is not serviceable. Please select a different address.</Text>
        </View>
    )
  }
  ConfirmOrder(data) {
    return (
      this.state.isDeliverable ?
        <TouchableOpacity
          onPress={() => { this.props.navigation.navigate('Payment', { data: data }) }}
        >
          <View style={globalstyle.FooterTabButton}>
            <Text style={globalstyle.FooterTabText}> CONFIRM ORDER</Text>
          </View>
        </TouchableOpacity>
        : null
    )
  }

  render() {
    console.log("---DELIVERY----", this.state.deliveryType)
    console.log("----PAYMENT-----", this.state.paymentType)
    console.log("----ADDRESS-----", this.state.addressType)
    console.log("----dateTimeType-----", this.state.selectedDateTime)

    console.log("----ADDRESS1-----", this.state.selectedAddress)


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
      isDeliverable: this.state.isDeliverable
    }


    // console.log("sdsdsdsdsdss-4r------->",this.state.timeslote)

    return (
      <SafeAreaView style={styles.container}>

        <View style={{ flex: 1, padding: 1, marginTop: 50 }}>

          <View>
            <View style={styles.card}>
              <View style={styles.padingBottom}>
                <Text style={styles.textHeader}>How do you want this order?</Text>
              </View>

              <RadioForm
                radio_props={radio_props}
                initial={0}
                animation={true}
                formHorizontal={true}
                selectedButtonColor={globalcolor.PrimaryColor}
                buttonColor={globalcolor.PrimaryColor}
                onPress={(value) => { this.setState({ deliveryType: value }) }}
              />

            </View>

            <View style={styles.card}>
              <View style={styles.padingBottom}>
                <Text style={styles.textHeader}>How do you like to pay?</Text>
              </View>

              <RadioForm
                radio_props={payment_type}
                initial={0}
                animation={true}

                formHorizontal={true}
                selectedButtonColor={globalcolor.PrimaryColor}
                buttonColor={globalcolor.PrimaryColor}
                onPress={(value) => { this.setState({ paymentType: value }) }}
              />

            </View>

            <View style={styles.card}>
              <View style={styles.padingBottom}>
                <View style={{ width: '100%', flexDirection: 'row', }} >


                  <View style={{ flex: 1 }} >

                    <Text style={styles.textHeader}>Select Delivery Address</Text>
                  </View>
                  <View >


                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate('AddressScreen') }}>
                      <View style={{ flexDirection: 'row' }}>

                        <Text style={{ textAlign: "right", color: globalcolor.PrimaryColor, paddingRight: 3 }} >
                          Add New

                        </Text>
                        <FontAwesome name="plus" color={globalcolor.PrimaryColor} size={20} style={{ paddingLeft: 3 }} />
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
                onPress={(value) => {
                  this.setState({ addressType: value })

                  for (let j = 0; j < this.state.userAddress.length; j++) {

                    console.log("6666666666666666.....", this.state.userAddress[j].id)
                    if (this.state.userAddress[j].id === value) {
                      console.log("xxxxxxxxxxxx.....", this.state.userAddress[j]);
                      this.setState({ selectedAddress: this.state.userAddress[j] })
                      this.DeliveryCheck(this.state.userAddress[j])
                    }

                  }
                }
                }
              >


              </RadioForm>


            </View>

            <View style={styles.card}>

              <View style={{ flex: 1 }} >

                <Text style={styles.textHeader}>Delivery Slot </Text>
              </View>

              <Option
                options={this.state.timeslote}

                onChange={(option) => {
                  console.log(option, "ddddddddddddddd");
                  this.setState({ dateTimeType: option })

                  for (let j = 0; j < this.state.datetime.length; j++) {

                    //console.log("6666666666666666.....    ",this.state.userAddress[j].id)
                    if (this.state.datetime[j].id === option) {
                      // console.log("xxxxxxxxxxxx.....    ",this.state.userAddress[j])
                      this.setState({ selectedDateTime: this.state.datetime[j] })
                    }

                  }
                }}
              />
            </View>

          </View>



        </View>
        {this.ConfirmOrder(data)}

        {/* <Footer data={data1}  /> */}
      </SafeAreaView>
    );
  }
}

const paymentDatails = (data) => {

  console.log('payment Deatils', JSON.stringify(data));

  //data.data.prop.navigation.navigate('Payment',{data:data})






}

//data.data.prop.navigation.navigate('Payment')
const Footer = (data) => {


  return (
    data.data.isDeliverable ?
      <View>
        <TouchableOpacity
          onPress={() => { paymentDatails(data) }}>
          <View style={globalstyle.FooterTabButton}>
            <Text style={globalstyle.FooterTabText}> CONFIRM ORDER</Text>

          </View>
        </TouchableOpacity>
      </View>
      : null
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    marginTop: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10
  },
  textHeader: {
    fontSize: 15,
    fontWeight: "bold"

  },
  padingBottom: {
    paddingBottom: 7
  }

});
///export default CheckOutAdderss;