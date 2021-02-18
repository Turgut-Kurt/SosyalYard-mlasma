import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AuthControl from '../../utils/AuthControl';
import LottieView from 'lottie-react-native';
class AuthLoading extends Component {
  componentDidMount = async () => {
    setTimeout(async () => {
      await AuthControl.setupAuth();
    }, 5000);
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <LottieView
          source={require('../../assets/lottie/animation')}
          autoPlay
          loop
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AuthLoading;
