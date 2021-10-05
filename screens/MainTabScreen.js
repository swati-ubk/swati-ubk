import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import SettingsScreen from './SettingsScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      barStyle={{ borderRadius:10,
        backgroundColor:'#FD7729',
       // borderTopColor:'#000',
       // position:'absolute',
        borderRadius:10,
        padding:5,
        marginLeft:10,
        marginRight:10,
        borderTopColor:'#000'
        

        }}
        

      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#000"
      
     // tabBarOptions={{ showLabel: true }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
     //  tabBarColor: '#fff',
          color:'#000',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Search',
         // tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'cart',
          //tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="cart" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Rewards',
        //  tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gift" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'More',
        //  tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="th-list" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  
<HomeStack.Navigator screenOptions={{
  
        headerStyle: {
        //backgroundColor: '#0000',
        
        },
        headerTintColor: 'transparent',
        headerTitleStyle: {
        fontWeight: 'bold',
     
        },
        headerTransparent: true,

    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'home',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={45} color='#FD7729' backgroundColor="transparent" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        headerRight: ()=>(
          <Icon.Button name="notifications-circle-outline" size={45} color='#FD7729' backgroundColor="transparent" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        
        
        }} />
</HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        //backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        headerTransparent: true,
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
          
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={45} color='#FD7729' backgroundColor="transparent" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</DetailsStack.Navigator>
);
const styles = StyleSheet.create({
  style:{
    borderTopColor:'#000'
  }
});