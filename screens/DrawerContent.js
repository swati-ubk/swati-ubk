import React from 'react';
import {
  View,
  StyleSheet,
  LogBox,
  Image,
  Share,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalcolor} from '../style/globalcolor';
import { ConfigFile } from '../service/ConfigFile';
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
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {AuthContext} from '../components/context';
import {resolvePlugin} from '@babel/core';

//import { useReducer } from 'react';

export function DrawerContent(props) {
  // console.log('Userdata Drawer', props);

  const paperTheme = useTheme();
  ////
  ///const { user } = this.props;
  ///  console.warn("dadasd......",props.userData.firstName);

  const {signOut, toggleTheme} = React.useContext(AuthContext);

  const onShare = async referCode => {
    try {
      const result = await Share.share({
        message: `Diskounto brings you a great platform to explore your business and save your pocket. Here is my invite link http://beta.diskounto.com/invite/${referCode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  let userType = 'Free';
  // console.log('membership length===', props.userData.memberships.length);
  if (props.userData.memberships.length > 0) {
    if (props.userData.memberships[0].hasOwnProperty('plan')) {
      console.log('i am  Premium...');
      if (
        props.userData.memberships[0].plan === 'USER_PREMIUM' &&
        props.userData.memberships[0].active == true
      ) {
        userType = 'Premium';
      }
    }
  }

  // if (premiumPlan.hasOwnProperty('plan')) {
  // }
  // console.log('premiumPlan...', premiumPlan);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                  ConfigFile.ImageBaseUrl + props.userData.profilePic.path,
                }}
                size={70}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 8,
                  justifyContent: 'center',
                }}>
                <Title style={styles.title}>
                  {props.userData.firstName} {props.userData.lastName}
                </Title>
                {/* <Caption style={styles.caption}>{ props.userData.email }</Caption> */}
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <View style={styles.CoinContainer}>
              <LinearGradient
                colors={[
                  globalcolor.PrimaryColor,
                  globalcolor.GradientSeconder,
                ]}
                style={styles.Coindata}>
                <Text style={styles.cardbody}>Diskounto Coin</Text>
                {/* <Text style={styles.CoinTxt}>
                  {props.userData.promoCoins.toFixed(2)}
                </Text> */}
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{paddingTop: 5}}>
                    <Image
                      source={require('../assets/img/rewardcoin.png')} //Change your icon image here
                      style={styles.Iconclass}
                    />
                  </View>
                  <View>
                    <Text style={styles.CoinTxtright}>
                      {props.userData.promoCoins.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
              <LinearGradient
                colors={[
                  globalcolor.PrimaryColor,
                  globalcolor.GradientSeconder,
                ]}
                style={styles.Coindata}>
                <Text style={styles.cardbody}>Diskounto Cash</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{paddingTop: 5}}>
                    <Image
                      source={require('../assets/img/rupeeicon.png')} //Change your icon image here
                      style={styles.Iconclass}
                    />
                  </View>
                  <View>
                    <Text style={styles.CoinTxtright}>
                      {props.userData.cashBalance.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.CoinContainer2}>
              <LinearGradient
                colors={[
                  globalcolor.PrimaryColor,
                  globalcolor.GradientSeconder,
                ]}
                style={styles.Coindata}>
                <Text style={styles.cardbody}>Membership</Text>
                <Text style={styles.CoinTxt}>{userType}</Text>
              </LinearGradient>
              <TouchableOpacity
                onPress={() => onShare(props.userData.referCode)}
                style={{width: '100%'}}>
                <LinearGradient
                  colors={[
                    globalcolor.PrimaryColor,
                    globalcolor.GradientSeconder,
                  ]}
                  style={styles.Coindata}>
                  <Text style={styles.cardbody}>Refer Code</Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View>
                      <Text style={styles.CoinTxt}>
                        {props.userData.referCode}
                      </Text>
                    </View>
                    <View style={{paddingTop: 8}}>
                      <Image
                        source={require('../assets/img/share.png')} //Change your icon image here
                        style={styles.Iconclass}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
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
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome
                  name="user"
                  color={globalcolor.PrimaryColor}
                  size={size}
                />
              )}
              label=" Profile"
              onPress={() => {
                props.navigation.navigate('ProfileScreen');
              }}
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
              onPress={() => {
                props.navigation.navigate('RewardCategory');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="truck"
                  color={globalcolor.PrimaryColor}
                  size={size}
                />
              )}
              label="My Orders"
              onPress={() => {
                props.navigation.navigate('OrderPage');
              }}
            />
            {/* <DrawerItem 
                        
                            icon={({color, size}) => (
                                <FontAwesome 
                                name="briefcase"
                                color={globalcolor.PrimaryColor}
                                size={size}
                                />
                            )}
                            label="My Business"
                            
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        /> */}
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome
                  name="cog"
                  color={globalcolor.PrimaryColor}
                  size={size}
                />
              )}
              label=" Account Settings"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
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
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: -5,
  },
  userInfoSection: {
    paddingLeft: 15,
    backgroundColor: globalcolor.PrimaryColor,
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
  column: {
    marginBottom: 20,
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
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  CoinContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  CoinContainer2: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 11,
  },
  Coindata: {
    width: '42%',
    height: 80,
    marginLeft: 15,
    backgroundColor: globalcolor.PrimaryColor,
    padding: 1,
    borderRadius: 8,
  },
  Iconclass: {
    padding: 8,
    margin: 5,
    height: 10,
    width: 10,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  cardbody: {
    fontFamily: 'Lato-Black',
    textAlign: 'left',
    color: globalcolor.Textcolor,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 12,
  },
  CoinTxt: {
    fontFamily: 'Lato-Black',
    paddingLeft: 10,
    color: globalcolor.Textcolor,
    paddingTop: 10,
  },
  CoinTxtright: {
    fontFamily: 'Lato-Black',
    color: globalcolor.Textcolor,
    paddingTop: 10,
  },
});
