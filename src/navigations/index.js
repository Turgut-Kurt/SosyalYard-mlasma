import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../containers/LoginScreen';
import RegisterScreen from '../containers/RegisterScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../containers/HomeScreen';
import {DrawerActions} from '@react-navigation/native';
import PostScreen from '../containers/PostScreen';
import ProfileScreen from '../containers/ProfileScreen';
import AuthLoadingScreen from '../containers/AuthLoadingScreen';
import ProfileUpdateScreen from '../containers/ProfileUpdateScreen';
import PostSettingsScreen from '../containers/PostSettingsScreen';
import CommentScreen from '../containers/CommentScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AuthControl from '../utils/AuthControl';
const RouteStack = createStackNavigator();
const HomeStack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Çıkış Yap"
        onPress={() => {
          logout();
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}
      />
    </DrawerContentScrollView>
  );
}
const logout = () => {
  AuthControl.removeToken();
};
const Router = () => (
  <RouteStack.Navigator
    iinitialRouteName={'AuthLoadingScreen'}
    headerMode="screen"
    screenOptions={{
      headerShown: false,
    }}>
    <RouteStack.Screen
      name={'AuthLoadingScreen'}
      component={AuthLoadingScreen}
    />
    <RouteStack.Screen name={'RegisterScreen'} component={RegisterScreen} />
    <RouteStack.Screen name={'LoginScreen'} component={LoginScreen} />
    <RouteStack.Screen name={'BottomTabNav'} component={BottomTabNav} />
    <RouteStack.Screen name={'CommentScreen'} component={CommentScreen} />
  </RouteStack.Navigator>
);
const Home = () => (
  <HomeStack.Navigator
    iinitialRouteName={'HomeScreen'}
    headerMode="screen"
    screenOptions={{
      headerShown: false,
    }}>
    <HomeStack.Screen name={'HomeScreen'} component={HomeScreen} />
    <HomeStack.Screen name={'CommentScreen'} component={CommentScreen} />
  </HomeStack.Navigator>
);
const DrawerNav = () => (
  <Drawer.Navigator
    drawerPosition="right"
    iinitialRouteName={'ProfileUpdateScreen'}
    headerMode="screen"
    screenOptions={{
      headerShown: false,
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen
      name={'ProfileScreen'}
      component={ProfileScreen}
      options={{drawerLabel: 'Profilim'}}
    />
    <Drawer.Screen
      name={'ProfileUpdateScreen'}
      component={ProfileUpdateScreen}
      options={{drawerLabel: 'Bilgilerimi Güncelle'}}
    />
    <Drawer.Screen
      name={'PostSettingsScreen'}
      component={PostSettingsScreen}
      options={{drawerLabel: 'Gönderi Ayarları'}}
    />
  </Drawer.Navigator>
);
const BottomTabNav = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{backgroundColor: '#456BFF'}}>
    <BottomTab.Screen
      name="Home"
      component={Home}
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
      name="DrawerNav"
      component={DrawerNav}
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
