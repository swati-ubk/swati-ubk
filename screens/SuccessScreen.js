import React, { useState, useEffect } from 'react';
import { BackHandler, Alert, View, Text, Button, StyleSheet, Image, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { globalcolor } from '../style/globalcolor';
import { globalstyle } from '../style/globals.js';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SuccessScreen = (probs) => {

    //console.log("phone number=====" + probs.route.params.data.mobile);

    console.log('Successprobs', probs);
    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [value, setValue] = useState('');
    const [Orderdata, SetOrdedata] = useState(probs.route.params.data);
    const [StatusCode, SetStatusCode] = useState('');
    const [StatusColor, SetStatusColor] = useState('');

    useEffect(() => {

        async function fetchMyAPI() {
            try {
                let keys = []
                try {
                    keys = await AsyncStorage.getAllKeys()
                } catch (e) {
                    // read key error
                }
                // console.log('All Keys..', keys);
                keys.forEach(element => {
                    //console.log('key====', element);
                    if ((element != 'user') && (element != 'userToken') && (element != 'SelectedStoreID') && (element != 'Coordinate') && (element != 'address')) {
                        AsyncStorage.removeItem(element);
                    }

                });

            } catch (e) {
                console.log(e);
            }
        }





        let Status = Orderdata.result.status;

        if (Status == 'COMPLETE') {
            SetStatusCode('DELIVERED');
            // SetStatusColor(globalcolor.Successcolor);

        } else if (Status == 'PROCESSING') {
            SetStatusCode('IN PROCESS');
            // SetStatusColor(globalcolor.ProgessColor);
        }
        else {
            SetStatusCode('WAITING TO ACCEPT');
            // SetStatusColor(globalcolor.PrimaryColor);

        }


        fetchMyAPI()



        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();

    }, []);



    const ActivityIndicatorShow = () => {
        return (
            <View >
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color={globalcolor.PrimaryColor}
                        style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}

                    />
                ) : null}
            </View>
        )
    }

    return (

        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    source={require('../assets/img/checkmark.gif')} //Change your icon image here
                    style={styles.OtpImage}

                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'center', color: globalcolor.PrimaryColor, fontSize: 16 }}> Congratulations! Your order is successful</Text>
            </View>
            {/* <View style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'center', color: globalcolor.PrimaryColor, fontSize: 16 }}>USAHSADHAS</Text>
            </View> */}
            <View style={styles.OTPContainer}>
                <View style={{ flex: 0.5 }}>
                    <Text>Order ID</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ textAlign: 'right' }}>{Orderdata.data.orderId}</Text>
                </View>

            </View>
            <View style={styles.OTPContainer}>
                <View style={{ flex: 0.5 }}>
                    <Text>Ordered At</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ textAlign: 'right' }}>{Moment(Orderdata.result.created_at * 1000).format('DD MMM YYYY hh:mm')}</Text>
                </View>

            </View>
            <View style={styles.OTPContainer}>
                <View style={{ flex: 0.5 }}>
                    <Text>Order Amount</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ textAlign: 'right' }}>₹ {Orderdata.result.amount / 100}</Text>
                </View>

            </View>
            <View style={styles.OTPContainer}>
                <View style={{ flex: 0.5 }}>
                    <Text>Order Status</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ textAlign: 'right', color: globalcolor.PrimaryColor }}>{StatusCode}</Text>
                </View>

            </View>
            <View style={styles.OTPContainer}>
                <View style={{ flex: 1 }}>
                    <Button title="Track Order" color={globalcolor.PrimaryColor}
                        onPress={() => probs.navigation.navigate('OrderDetails', { orderId: Orderdata.data.orderId })}
                    />
                </View>

            </View>
            {/* <View style={styles.OTPContainer}>
                <View style={{ flex: 1 }}>
                    <Button title="Home" color={globalcolor.PrimaryColor}
                        onPress={() => probs.navigation.navigate('HomeScreen')}
                    />
                </View>

            </View> */}
        </SafeAreaView >
        // <View style={{ marginTop: 60 }}>
        //     <Image
        //         source={require('../assets/img/checkmark.gif')} //Change your icon image here
        //         style={styles.OtpImage}

        //     />
        //     <Text style={styles.OtpText} >
        //         Congratulations! Your order is successful
        //     </Text>
        //     <View style={styles.OTPContainer}>
        //         <View style={{ flex: 0.5 }}>
        //             <Text>Order ID</Text>
        //         </View>
        //         <View style={{ flex: 0.5 }}>
        //             <Text style={{ textAlign: 'right' }}>{Orderdata.data.orderId}</Text>
        //         </View>

        //     </View>

        //     <TouchableOpacity
        //         onPress={() => { probs.navigation.navigate('OrderDetails', { orderId: item.orderId }) }}
        //     >
        //         <View style={styles.OTPContainer}>
        //             <View style={{ flex: 1 }}>
        //                 <Text style={{ textAlign: 'center', color: globalcolor.PrimaryColor }}>Track Order</Text>
        //             </View>

        //         </View>
        //     </TouchableOpacity>


        // </View>



    );





}
export default SuccessScreen;

const styles = StyleSheet.create({
    container: {
        // flexDirection:'row',
        flex: 1,
        marginTop: 50

    },
    OTPContainer: {
        padding: 10,
        flexDirection: 'row'
    },

    OtpImage: {
        height: 100,
        width: 250,
        alignSelf: 'center'
    },
    OtpText: {
        // marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: globalcolor.Font,
        color: globalcolor.Successcolor
    },
    OTPtextInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: 40,
        textAlign: 'center',
        fontSize: 20,

    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    signIn: {
        marginTop: 70,
        width: '100%',
        height: 40,
        //paddingLeft:40,
        //paddingRight:40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontFamily: globalcolor.Font
        // fontWeight: 'bold'
    },
});

