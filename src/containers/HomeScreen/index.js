import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
// import {connect} from 'react-redux';
// import {SignIn} from '../../store/Actions/Auth/SignIn';
// import AuthControl from '../../utils/AuthControl';
import {Formik, Field} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import {
  CustomLoginInput,
  CustomPasswordInput,
  SafeStatusView,
} from '../../components';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeStatusView
        statusBackColor={'#fff'}
        statusBarStyle={'dark-content'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          <KeyboardAwareScrollView style={[styles.container]}>
            <View style={styles.TopViewStyle}>
              <Image
                source={require('../../assets/loginlogo.png')}
                style={styles.imageStyle}
              />
            </View>
            <Text style={styles.welcomeText}>HomeScreen</Text>
          </KeyboardAwareScrollView>
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  goSignup: {
    width: calcWidth(100) - 60,
    alignItems: 'center',
    paddingVertical: 4,
  },
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  TopViewStyle: {
    marginTop: calcHeight(4),
    width: calcWidth(100),
    height: calcHeight(31),
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    width: calcWidth(100),
    height: calcHeight(10),
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
// const mapStateToProps = (state) => {
//   return {
//     SignInReducer: state.SignInReducer,
//   };
// };
//
// const mapDispatchToProps = {
//   SignIn,
// };
//
// HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default HomeScreen;
