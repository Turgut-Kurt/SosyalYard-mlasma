import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService from './src/services/NavigationService';
import Router from './src/navigations';
import {Provider} from 'react-redux';
import store from './src/store';
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer ref={NavigationService.navigationRef}>
          <Router />
        </NavigationContainer>
      </Provider>
    );
  }
}
