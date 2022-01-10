import React, { useState, useEffect } from 'react';
import { BackHandler, Alert, View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { globalcolor } from '../style/globalcolor';
import { globalstyle } from '../style/globals.js';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FaildScreen = (probs) => {

    //console.log("phone number=====" + probs.route.params.data);

    // console.log('Successprobs', probs.route.params.data);
    const [loading, setLoading] = useState(false)
    const [OrderStatus, SetOrderStatus] = useState(probs.route.params.data);


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
                    if ((element != 'user') && (element != 'userToken')) {
                        AsyncStorage.removeItem(element);
                    }

                });

            } catch (e) {
                console.log(e);
            }
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
                    source={require('../assets/img/error.png')} //Change your icon image here
                    style={styles.OtpImage}

                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'center', color: globalcolor.PrimaryColor, fontSize: 16 }}>Ohh! Somethings went Wrong</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'center', color: globalcolor.PrimaryColor, fontSize: 16 }}>{OrderStatus.userMessage}</Text>
            </View>
        </SafeAreaView >



    );





}
export default FaildScreen;

const styles = StyleSheet.create({
    container: {
        // flexDirection:'row',
        flex: 1,
        marginTop: 50

    },
    OTPContainer: {
        flex: 1, marginLeft: 20, marginRight: 20, marginTop: 40,
        flexDirection: 'row'
    },

    OtpImage: {
        height: 50,
        width: 50,
        alignSelf: 'center'
    },
    OtpText: {
        // marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: globalcolor.Font,
        color: globalcolor.PrimaryColor
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

