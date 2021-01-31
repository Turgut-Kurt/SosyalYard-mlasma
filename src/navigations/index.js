import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../containers/LoginScreen';
import RegisterScreen from '../containers/RegisterScreen';
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
    activeColor="#f0edf6"
    inactiveColor="#3e2465"
    barStyle={{backgroundColor: '#694fad'}}
    headerMode="screen"
    screenOptions={{
      headerShown: false,
    }}>
    <BottomTab.Screen name="HomeScreen" component={HomeScreen} />
    <BottomTab.Screen name="Post" component={PostScreen} />
    <BottomTab.Screen name="ProfileScreen" component={ProfileScreen} />
  </BottomTab.Navigator>
);
export default Router;
