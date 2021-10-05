import React from 'react';
import { View, StyleSheet, LogBox,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalcolor} from '../style/globalcolor';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,

} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import{ AuthContext } from '../components/context';
import { resolvePlugin } from '@babel/core';

//import { useReducer } from 'react';


export function DrawerContent(props) {
    console.log(props);

    const paperTheme = useTheme();
   //// 
   ///const { user } = this.props;
 ///  console.warn("dadasd......",props.userData.firstName);
   
    const { signOut, toggleTheme  } = React.useContext(AuthContext);

  
    
    /////const {loginState} = React.useContext(AuthContext);

    ///console.log( AuthContext.getItem());
   // console.warn("sdsdsds...."+props);
   
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            
                            <Avatar.Image 
                                source={{
                                    uri: 'https://image.flaticon.com/icons/png/512/149/149071.png'
                                }}
                                size={70}
                            />
                               <View style={{flexDirection:'column',marginLeft:5}}>
                                  <Title style={styles.title}>{ props.userData.firstName } {props.userData.lastName}</Title>
                                {/* <Caption style={styles.caption}>{ props.userData.email }</Caption> */}
                            </View>
                           
                        </View>

                        <View style={styles.column}>

                        
                            
                            {/* <View style={styles.row}>

                                <View style={{flexDirection:'column'}}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>Diskounto Coin </Paragraph>

                                    <View style={styles.row2}>
                                    <Avatar.Image style={{ marginRight : 15}}
                                    source={{
                                        uri: 'https://diskounto.com/common/reward-coin.png'
                                    }}
                                    size={20}
                                    />
                                    <Caption style={styles.caption}>{ props.userData.promoCoins }</Caption>
                                    </View>

                                
                                </View>

                                <View style={{flexDirection:'column'}}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>Diskounto Cash</Paragraph>
                                    <Caption style={styles.caption}> ₹ { props.userData.cashBalance }</Caption>
                                </View>
                            </View> */}
                           
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        
                    <View  style={styles.CoinContainer}>
                        <LinearGradient colors={[globalcolor.PrimaryColor, globalcolor.GradientSeconder]}  style={styles.Coindata}>
                            <Text style={styles.cardbody}>Diskounto Coin</Text>
                            <Text style={styles.CoinTxt}>0</Text>
                        </LinearGradient>
                        <LinearGradient colors={[globalcolor.PrimaryColor, globalcolor.GradientSeconder]} style={styles.Coindata}>
                            <Text style={styles.cardbody}>Diskounto Cash</Text>
                             <View style={{flex:1,flexDirection:'row'}}>
                                 <View style={{paddingTop:5}}>
                                    <Image
                                        source={require('../assets/img/rupeeicon.png')} //Change your icon image here
                                        style={styles.Iconclass}
                                    />
                                 </View>
                                 <View>
                                 <Text style={styles.CoinTxtright}>0</Text>
                                 </View>
                                 
                             </View>
                            
                        </LinearGradient>
                        
                                   
                    </View>
                    <View  style={styles.CoinContainer2}>
                        <LinearGradient colors={[globalcolor.PrimaryColor, globalcolor.GradientSeconder]} style={styles.Coindata}>
                            <Text style={styles.cardbody}>Membership</Text>
                            <Text style={styles.CoinTxt}>Free</Text>
                        </LinearGradient>
                        <LinearGradient colors={[globalcolor.PrimaryColor, globalcolor.GradientSeconder]} style={styles.Coindata}>
                            <Text style={styles.cardbody}>Refer Code</Text>
                             <View style={{flex:1,flexDirection:'row'}}>
                                 <View>
                                 <Text style={styles.CoinTxt}>5hyyhh</Text>
                                 </View>
                                 <View style={{paddingTop:8}}>
                                    <Image
                                        source={require('../assets/img/rupeeicon.png')} //Change your icon image here
                                        style={styles.Iconclass}
                                    />
                                 </View>
                                 
                             </View>
                            
                        </LinearGradient>
                        
                                   
                    </View>
                    
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome 
                                name="home"
                                color={globalcolor.PrimaryColor}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome 
                                name="user"
                                color={globalcolor.PrimaryColor}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('ProfileScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome 
                                name="trophy"
                                color={globalcolor.PrimaryColor}
                                size={size}
                                />
                            )}
                            label="Rewards"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                         <DrawerItem 
                         
                            icon={({color, size}) => (
                                <Icon 
                                name="truck" 
                                color={globalcolor.PrimaryColor}
                                size={size}
                            
                                />
                            )}
                            label="My Order"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                         <DrawerItem 
                        
                            icon={({color, size}) => (
                                <FontAwesome 
                                name="briefcase"
                                color={globalcolor.PrimaryColor}
                                size={size}
                                />
                            )}
                            label="My Business"
                            
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome 
                                name="cog"
                                color={globalcolor.PrimaryColor}
                                size={size}
                                />
                            )}
                            label="Account Settings"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                       
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={globalcolor.PrimaryColor}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      marginTop:-5,
      
    },
    userInfoSection: {
      paddingLeft: 15,
      backgroundColor:globalcolor.PrimaryColor,
    },
    title: {
      color: globalcolor.Textcolor,
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      color: '#ffffff',
      fontSize: 14,
      lineHeight: 14,
    },
    column:{
        marginBottom:20,
    },
    row: {
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    row2: {
        
        flexDirection: 'row',
        alignItems: 'center',
      },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: globalcolor.PrimaryColor,
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    CoinContainer:{
        flexDirection: 'row',
        flex:1
    },
    CoinContainer2:{
        flexDirection: 'row',
        flex:1,
        marginTop:11
    },
    Coindata:{
        width:'42%',
        height:80,
        marginLeft:15,
        backgroundColor:globalcolor.PrimaryColor,
        padding:1,
        borderRadius:8
    },
    Iconclass: {
        padding: 8,
        margin: 5,
        height: 10,
        width: 10,
        resizeMode: 'stretch',
        alignItems: 'center',
        
    },
    cardbody:{
        fontFamily:'Lato-Black',
         textAlign:'left',
         color:globalcolor.Textcolor,
         paddingLeft:10,
         paddingTop:10,
         fontSize:12
        },
        CoinTxt:{
            fontFamily:'Lato-Black',
            paddingLeft:10,
            color:globalcolor.Textcolor,
            paddingTop:10
        },
        CoinTxtright:{
            fontFamily:'Lato-Black'
            ,color:globalcolor.Textcolor,
            paddingTop:10
        }


  });
