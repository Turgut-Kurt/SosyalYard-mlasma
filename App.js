import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService from './src/services';
import Router from './src/navigations';
export default class App extends Component {
  render() {
    return (
      <NavigationContainer ref={NavigationService.navigationRef}>
        <Router />
      </NavigationContainer>
    );
  }
}
