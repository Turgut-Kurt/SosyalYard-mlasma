import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../containers/LoginScreen';
import RegisterScreen from '../containers/RegisterScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../containers/HomeScreen';
import PostScreen from '../containers/PostScreen';
import ProfileScreen from '../containers/ProfileScreen';
const RouteStack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();
const Router = () => (
  <RouteStack.Navigator
    iinitialRouteName="Bottom"
    headerMode="screen"
    screenOptions={{
      headerShown: false,
    }}>
    {/*<RouteStack.Screen name="Loading" component={RegisterScreen} />*/}
    {/*<RouteStack.Screen name="Login" component={LoginScreen} />*/}
    <RouteStack.Screen name="Bottom" component={BottomTabNav} />
  </RouteStack.Navigator>
);

const BottomTabNav = () => (
  <BottomTab.Navigator
    initialRouteName="HomeScreen"
    activeColor="#fff"
    barStyle={{backgroundColor: '#456BFF'}}>
    <BottomTab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Anasayfa',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <BottomTab.Screen
      name="PostScreen"
      component={PostScreen}
      options={{
        tabBarLabel: 'Gönderi Ekle',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons
            name="plus-circle-outline"
            color={color}
            size={26}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profil',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
  </BottomTab.Navigator>
);
export default Router;
