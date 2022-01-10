import React, { Component } from 'react';
import { Button, StyleSheet, View, NativeModules, NativeEventEmitter } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import WebService from '../service/WebService';
import { globalcolor } from '../style/globalcolor';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Payment extends Component {
  constructor(props) {
    super(props);
    console.log('payamentprobs', this.props.route.params.data);
    this.state = {
      data: [],
      address: this.props.route.params.data.address,
      localcart: [],
      dateTime: this.props.route.params.data.dateTime,
      delivery: this.props.route.params.data.delivery,
      payment: this.props.route.params.data.payment,
      token: this.props.route.params.data.token,
      userNmae: this.props.route.params.data.userNmae,
      UserEmail: this.props.route.params.data.UserEmail,
      userPhone: this.props.route.params.data.userPhone,
      orderStatus: 'qqqqq',

    };
    console.log('66786668686...', JSON.stringify(this.state));
  }

  componentDidMount() {
    this.importData();
    // console.log("Payment....",this.props.route.params.data)
  }






  importData = async () => {
    console.log('importData');
    try {

      this.state.localcart = [];
      const keys = await AsyncStorage.getAllKeys()


      const itemsArray = await AsyncStorage.multiGet(keys)

      let object2 = {}
      itemsArray.map(item => {
        object2[`${item[0]}`] = item[1]
      })
      console.log("=======>", object2);

      itemsArray.map(item => {
        console.log(item[1], "-------222----------", `${item[0]}`)
        if (`${item[0]}` == 'user' || `${item[0]}` == 'userToken' || `${item[0]}` == 'SelectedStoreID' || `${item[0]}` == 'RewordCart' || `${item[0]}` == 'Coordinate' || `${item[0]}` == 'address') {
          //   console.log("llllllllllllllllllllllllllllllll")
        }
        else {

          if (`${item[0]}` == 'count') {
            // console.log("a.....",item[1])
            this.setState({
              count: item[1]
            });
          }
          else if (`${item[0]}` == 'totalPrice') {
            this.setState({
              totalPrice: item[1]
            });
          }
          else {
            // console.log("============")
            const jsondata = JSON.parse(item[1]);
            // console.log(jsondata) 
            let object = {}

            if (jsondata.hasOwnProperty('count')) {
              // let object = {}

              object['productId'] = jsondata.id,
                object['variantId'] = jsondata.variants,
                object['quantity'] = jsondata.count

              this.setState({ localcart: [...this.state.localcart, object] })
            }
            else {
              // console.log("========11111==========")
              // console.log(jsondata.variants)

              for (const [key, value] of Object.entries(jsondata.variants)) {

                // console.log(`${key}: ${value}`);
                //console.log("======22222======")
                object = {}
                object['productId'] = jsondata.id,
                  object['variantId'] = `${key}`,
                  object['quantity'] = `${value}`
                // console.log(object);

                this.setState({ localcart: [...this.state.localcart, object] })
              }

            }


          }
        }

      })

      this.fetchData();


    } catch (error) {
      console.error(error)
    }


  }


  fetchData = async () => {

    let jsonpostdata =

    {
      businessId: "605a0d38c98f1137023019dc",
      items: this.state.localcart,
      address: this.state.address,
      slot: this.state.dateTime,
      checkoutOption: this.state.delivery,
      paymentOption: this.state.payment,
      gateway: "RAZORPAY"
    };
    console.log("=======990=======")
    console.log(jsonpostdata)
    try {
      // setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.state.token },
        body: JSON.stringify(jsonpostdata)

      };
      const response = await WebService.PostData('business/605a0d38c98f1137023019dc/order', requestOptions);
      const json = await response.json();
      // console.log("==============99==================",json);



      this.setState({ data: json });
      this.payment(json.apiKey, json.result.amount)

    } catch (error) {
      // console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }

  };
  payment(key, amount) {
    var options = {
      description: 'Payment to Diskounto',
      image: 'https://diskounto.com/common/logo-full.svg',
      currency: 'INR',
      key: key,
      amount: amount,
      name: 'Diskounto',
      prefill: {
        email: this.state.UserEmail,
        contact: this.state.userPhone,
        name: this.state.userNmae
      },
      theme: { color: globalcolor.PrimaryColor }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
      console.log('Success', data);
      this.setState({ orderStatus: `${data.razorpay_payment_id}` })
    }).catch((error) => {
      // handle failure
      console.log('error', error);
      this.setState({ orderStatus: `${error.code} | ${error.description}` })
      alert(`Error: ${error.code} | ${error.description}`);
    });
    //console.log("---------111111----",options)
  }

  render() {
    console.log("---------111111----", this.state.orderStatus)
    return (

      <View style={styles.container}>
        <View style={styles.buttonContainer}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});