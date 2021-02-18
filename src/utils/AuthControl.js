import AsyncStorage from '@react-native-community/async-storage';
import store from '../store/index';
import NavigationService from '../services/NavigationService';
const saveToken = async (key, value, isNewUser) => {
  try {
    await AsyncStorage.setItem(
      key,
      key === 'userId' ? JSON.stringify(value) : value,
    );
    await setupAuth(isNewUser);
  } catch (e) {
    console.log(e);
  }
};

const getToken = async (isNewUser) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    const role = await AsyncStorage.getItem('role');
    if (!token && !userId && !role) {
      NavigationService.navigate('LoginScreen');
      return false;
    }
    if (isNewUser) {
      store.getState().SignInReducer.token = token;
      store.getState().SignInReducer.userId = JSON.parse(userId);
      store.getState().SignInReducer.role = role;
      NavigationService.navigate('MainScreen');
    } else {
      console.log('drawernav girdi');
      store.getState().SignInReducer.token = token;
      store.getState().SignInReducer.userId = JSON.parse(userId);
      store.getState().SignInReducer.role = role;
      NavigationService.navigate('BottomTabNav');
    }
  } catch (e) {
    console.log(e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('fireToken');
    await AsyncStorage.removeItem('notifID');
    store.getState().SignInReducer.token = null;
    store.getState().SignInReducer.userId = null;
    store.getState().SignInReducer.role = null;
    await setupAuth();
  } catch (e) {
    console.log(e);
  }
};

const setupAuth = async (isNewUser) => {
  await getToken(isNewUser);
};

export default {
  saveToken,
  getToken,
  removeToken,
  setupAuth,
};
