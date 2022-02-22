import React, {useEffect} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {DrawerContent} from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import StoreListScreen from './screens/StoreListScreen';
import ProductListScreen from './screens/ProductListScreen';
import RewardsProductListScreen from './screens/RewardsProductListScreen';
import {AuthContext} from './components/context';
import StoreDetailsScreen from './screens/StoreDetailsScreen';
import RootStackScreen from './screens/RootStackScreen';
import ProfileScreen from './screens/ProfileScreen';
import AllCategories from './screens/AllCategories';
import DrahDropMap from './screens/DrahDropMap';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import AddressScreen from './screens/AddressScreen';
import BankAccountScreen from './screens/BankAccountScreen';
import Passbook from './screens/Passbook';
import RewardCategory from './screens/RewardCategory';
import RewardsDetails from './screens/RewardsDetails';
import OrderPage from './screens/OrderPage';
import OrderDetails from './screens/OrderDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartScreen from './screens/CartScreen';
import AddToCart from './screens/AddToCart';
import CheckAdrees from './screens/CheckAdrees';
import CheckOutAdderss from './screens/CheckOutAdderss';
import Payment from './screens/Payment';
import SuccessScreen from './screens/SuccessScreen';
import RewordAddToCart from './screens/RewordAddToCart';
import RewordAddress from './screens/RewordAddress';
import FaildScreen from './screens/FaildScreen';
import RewardsSuccessScreen from './screens/RewardsSuccessScreen';
import ReferalNetwork from './screens/ReferalNetwork';
import PayoutScreen from './screens/PayoutScreen';
import SearchScreen from './screens/SearchScreen';
import RequestPayout from './screens/RequestPayout';
import NotificationScreen from './screens/NotificationScreen';
import TabaddToCart from './screens/TabaddToCart';
import AddressListScreen from './screens/AddressListScreen';
import UpdateaddressScreen from './screens/UpdateaddressScreen';
import PayoutDetailsScreen from './screens/PayoutDetailsScreen';
import BusinessHome from './screens/Business/BusinessHome';
import VendorHome from './screens/Business/VendorHome';
import OrderList from './screens/Business/OrderList';
import Transaction from './screens/Business/Transaction';
import Balance from './screens/Business/Balance';
import settlement from './screens/Business/Settlement';
import Itemlist from './screens/Business/ItemList';
import TaxInvoice from './screens/Business/TaxInvoice';
import BusinessPage from './screens/Business/BusinessPage';
import ItemDetails from './screens/Business/ItemDetails';
import AddBusiness from './screens/Business/AddBusiness';
import AddBusinessPhoto from './screens/Business/AddBusinessPhoto';
import AddBusinessLocation from './screens/Business/AddBusinessLocation';
import AddBusinessDetails from './screens/Business/AddBusinessDetails';
import Succesfulmsg from './screens/Business/Successfulmsg';
import PickeyHome from './screens/Pickey/PickeyHome';
import BookingPage from './screens/Pickey/BookingPage';
import CheckoutInvoice from './screens/Pickey/CheckoutInvoice';
import VerifyPage from './screens/Pickey/VerifyPage';
import PreBooking from './screens/Pickey/PreBooking';

const Drawer = createDrawerNavigator();

let name = null;
const YourApp = () => {
  ///  const [setting1value, setSetting1value] = React.useState('initialValue1');
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: false,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    console.log('sdsdsd11111' + action.type);
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // setUserToken('fgkj');

        console.log('asdfasdasdasd....' + foundUser.auth_token);
        // setIsLoading(false);
        const userToken = String(foundUser.auth_token);
        const userName = foundUser.user.firstName;

        const userData = JSON.stringify(foundUser.user);

        console.log('asdfasdasdasd...' + foundUser.user.firstName);
        name = foundUser.user.firstName;
        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('user', userData);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({type: 'LOGIN', id: userData, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);

        console.log('LOGOUT');
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('user');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
      // userName: async() => {
      //   let userToken;
      //   userToken = null;
      //   try {
      //     userToken = await AsyncStorage.getItem('userToken');
      //   } catch(e) {
      //     console.log(e);
      //   }
      //   return 'sa';

      // }
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      let userdata;

      userToken = null;
      userdata = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userdata = await AsyncStorage.getItem('user');

        // console.log("asadasd...4",userToken);
        // console.log("asadasd...4",userdata);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', id: userdata, token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //var coche = JSON.parse(jsonTexto);
  ///console.warn("sssssss..1"+ JSON.parse(loginState.userName).firstName);

  //console.warn("dadasd", authContext.userName());

  let userdata = JSON.parse(loginState.userName);

  passProps = {
    userData: userdata,
  };

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              drawerContent={props => (
                <DrawerContent {...props} {...passProps} />
              )}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="BusinessHome" component={BusinessHome} />
              <Drawer.Screen name="SupportScreen" component={SupportScreen} />
              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
              <Drawer.Screen name="OrderList" component={OrderList} />
              <Drawer.Screen name="Transaction" component={Transaction} />
              <Drawer.Screen name="Balance" component={Balance} />
              <Drawer.Screen name="settlement" component={settlement} />
              <Drawer.Screen name="ItemList" component={Itemlist} />
              <Drawer.Screen name="TaxInvoice" component={TaxInvoice} />
              <Drawer.Screen name="ItemDetails" component={ItemDetails} />
              <Drawer.Screen name="AddBusiness" component={AddBusiness} />
              <Drawer.Screen name="AddBusinessPhoto" component={AddBusinessPhoto} />
              <Drawer.Screen name="AddBusinessLocation" component={AddBusinessLocation} />
              <Drawer.Screen name="AddBusinessDetails" component={AddBusinessDetails} />
              <Drawer.Screen name="PickeyHome" component={PickeyHome} />
              <Drawer.Screen name="BookingPage" component={BookingPage} />
              <Drawer.Screen name="CheckoutInvoice" component={CheckoutInvoice} />
              <Drawer.Screen name="VerifyPage" component={VerifyPage} />
              <Drawer.Screen
                name="StoreListScreen"
                component={StoreListScreen}
              />
              <Drawer.Screen
                name="ProductListScreen"
                component={ProductListScreen}
              />
              <Drawer.Screen
                name="StoreDetailsScreen"
                component={StoreDetailsScreen}
              />
              <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
              <Drawer.Screen name="CartScreen" component={CartScreen} />
              <Drawer.Screen name="AllCategories" component={AllCategories} />
              <Drawer.Screen name="DrahDropMap" component={DrahDropMap} />
              <Drawer.Screen
                name="ChangePasswordScreen"
                component={ChangePasswordScreen}
              />
              <Drawer.Screen name="AddressScreen" component={AddressScreen} />
              <Drawer.Screen
                name="BankAccountScreen"
                component={BankAccountScreen}
              />
              <Drawer.Screen name="Passbook" component={Passbook} />
              <Drawer.Screen name="RewardCategory" component={RewardCategory} />
              <Drawer.Screen
                name="RewardsProductListScreen"
                component={RewardsProductListScreen}
              />
              <Drawer.Screen name="RewardsDetails" component={RewardsDetails} />
              <Drawer.Screen name="OrderPage" component={OrderPage} />
              <Drawer.Screen name="OrderDetails" component={OrderDetails} />
              <Drawer.Screen name="AddToCart" component={AddToCart} />
              <Drawer.Screen name="CheckAdrees" component={CheckAdrees} />
              <Drawer.Screen
                name="CheckOutAdderss"
                component={CheckOutAdderss}
              />
              <Drawer.Screen name="Payment" component={Payment} />
              <Drawer.Screen name="SuccessScreen" component={SuccessScreen} />
              <Drawer.Screen
                name="RewordAddToCart"
                component={RewordAddToCart}
              />
              <Drawer.Screen name="RewordAddress" component={RewordAddress} />
              <Drawer.Screen name="FaildScreen" component={FaildScreen} />
              <Drawer.Screen
                name="RewardsSuccessScreen"
                component={RewardsSuccessScreen}
              />
              <Drawer.Screen name="ReferalNetwork" component={ReferalNetwork} />
              <Drawer.Screen name="PayoutScreen" component={PayoutScreen} />
              <Drawer.Screen name="SearchScreen" component={SearchScreen} />
              <Drawer.Screen name="RequestPayout" component={RequestPayout} />
              <Drawer.Screen name="VendorHome" component={VendorHome} />
              <Drawer.Screen name="BusinessPage" component={BusinessPage} />
              <Drawer.Screen name="Succesfulmsg" component={Succesfulmsg} />
              <Drawer.Screen name="PreBooking" component={PreBooking} />
              <Drawer.Screen
                name="AddressListScreen"
                component={AddressListScreen}
              />
              <Drawer.Screen
                name="NotificationScreen"
                component={NotificationScreen}
              />
              <Drawer.Screen
                name="PayoutDetailsScreen"
                component={PayoutDetailsScreen}
              />
              <Drawer.Screen name="TabaddToCart" component={TabaddToCart} />
              <Drawer.Screen
                name="UpdateaddressScreen"
                component={UpdateaddressScreen}
              />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#FD7729"
          translucent={true}
        />
      </AuthContext.Provider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default YourApp;
