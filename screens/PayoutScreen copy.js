
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { globalstyle } from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ConfigFile } from '../service/ConfigFile';
import { globalcolor } from '../style/globalcolor';
import { Avatar } from 'react-native-paper';
import WebService from '../service/WebService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
const PayoutScreen = (probs) => {
    //console.log("==========All category==========");
    // console.log(probs.navigation.navigate);
    const [loading, setLoading] = useState(false)
    const [Token, SetToken] = useState('');
    const [data, setData] = useState([]);
    useEffect(() => {

        async function fetchMyAPI() {

            try {
                let userToken = await AsyncStorage.getItem('userToken');
                SetToken(userToken);

                FetachReferalNetwork(userToken);




            } catch (e) {
                console.log(e);
            }
        }

        fetchMyAPI()
    }, [])

    const FetachReferalNetwork = (userToken) => {
        let requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + userToken },
        };
        console.log("requestOptions..", requestOptions);
        WebService.PostData('customer/settlement?limit=60&skip=0', requestOptions)
            .then(res => res.json())
            .then(resJson => {
                setData(resJson);
                //console.log('Payout data..', JSON.stringify(resJson));
            }).catch(e => console.log(e));
    }
    const handleBackButtonClick = () => {

        console.log('Back buttton............', probs.navigation);
        probs.navigation.goBack();
        return true;
    }
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
    const IsPremiumUser = (Status) => {
        let StatusCode = '';
        let ColorBorder = '';
        let Colortext = '';
        if (Status == 'PROCESSED') {
            StatusCode = Status;
            ColorBorder = globalcolor.SuccessLight;
            Colortext = globalcolor.Successcolor;
        } else if (Status == 'INITIATED') {
            StatusCode = Status;
            ColorBorder = globalcolor.ProgessColorLight;
            Colortext = globalcolor.ProgessColor;
        }
        else if (Status == 'PENDING') {
            StatusCode = Status;
            ColorBorder = globalcolor.ProgessColorLight;
            Colortext = globalcolor.ProgessColor;
        }
        else if (Status == 'REFUNDED') {
            StatusCode = Status;
            ColorBorder = globalcolor.LightError;
            Colortext = globalcolor.Errorcolor;
        } else {

        }


        return (
            <View style={{ padding: 1, borderWidth: 1, borderColor: ColorBorder }}>
                <Text style={{ fontFamily: globalcolor.Font, color: Colortext, textAlign: 'center' }}>{StatusCode}</Text>
            </View>
        )

    }
    const TillDate = (data) => {
        if (data.hasOwnProperty('endDate')) {
            return (
                <Text style={{ padding: 2, textAlign: 'center' }}>{Moment(data.endDate).format('DD MMM YYYY')} </Text>
            )
        }
        // return (
        //     data.length > 0 ?

        //         <Text >56456445</Text>

        //         : null
        // )
    }
    return (
        data.length > 0 ?
            <SafeAreaView style={styles.container}>
                {/*------------BACK BUTTON START------------------*/}
                <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, marginRight: 15, marginTop: 30 }}>
                    <TouchableOpacity
                        onPress={() => handleBackButtonClick()}
                    >
                        <View style={{ flex: 0.2, marginRight: 20 }}>
                            <FontAwesome name="arrow-left" color={globalcolor.PrimaryColor} size={20} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ color: globalcolor.PrimaryColor, fontFamily: globalcolor.Font, fontSize: 20 }}>
                            Payout
                        </Text>
                    </View>
                </View>
                {/*------------BACK BUTTON END------------------*/}
                <View >
                    <View style={styles.ListCategoryrow}
                    >
                        <View style={styles.ListFirstCategoryIcon}>
                            <Text style={{ textAlign: 'center' }}>Amount</Text>
                        </View>

                        <View style={{ flex: 0.3, alignSelf: 'center' }}>
                            <Text style={styles.ListText}>Date</Text>
                        </View>
                        <View style={{ flex: 0.3, alignSelf: 'center' }}>
                            <Text style={styles.ListText}>Satus</Text>
                        </View>
                    </View>
                    <ScrollView>
                        {data.map((value, index) => (
                            <TouchableOpacity key={index}
                            >
                                <View style={styles.ListCategoryrow}

                                >
                                    <View style={styles.ListFirstCategoryIcon}>
                                        <Text style={{ textAlign: 'left' }}>{value.requestedAmount}</Text>
                                        {/* <Text>{value.email}</Text> */}
                                    </View>

                                    <View style={{ flex: 0.3, alignSelf: 'center' }}>
                                        <Text> {Moment(value.createdAt).format('DD MMM YYYY')}</Text>
                                    </View>
                                    <View style={{ flex: 0.3, alignSelf: 'center' }}>
                                        {IsPremiumUser(value.status)}

                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}


                    </ScrollView>

                </View>
            </SafeAreaView>
            :
            <View style={globalstyle.ActivityContainer}>
                {ActivityIndicatorShow()}
                <Text style={globalstyle.ActivityIndicator}>Loading please wait....</Text>
            </View>
    );
};

export default PayoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        flex: 1,
        alignItems: 'center',
        textAlignVertical: 'center',
        marginBottom: 10
    },

    ListBodyCategory: {
        flex: 0.3,
        alignSelf: 'center',
        textAlignVertical: 'center',
        padding: 20,
    },
    ListFirstCategoryIcon: {
        flex: 0.3,
        marginLeft: 10,
        // backgroundColor: globalcolor.Separator,
        shadowColor: '#fff',
        padding: 20
    },
    ListSecondIcon:
    {
        alignSelf: 'flex-end',
        flex: 0.3,
        padding: 20
    },
    ListCategoryrow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: globalcolor.Separator

    },
    ListText: {
        fontFamily: globalcolor.Font,
        color: '#000',
        textAlign: 'center'

        //  color: globalcolor.SeconderFontColor
    },
});
