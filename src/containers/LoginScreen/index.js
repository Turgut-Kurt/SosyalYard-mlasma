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
import {connect} from 'react-redux';
import {SignIn} from '../../store/Actions/Auth/SignIn';
import AuthControl from '../../utils/AuthControl';
import {Formik, Field} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoginValidationSchema from '../../schema/LoginValidation';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import {
  CustomLoginInput,
  CustomPasswordInput,
  SafeStatusView,
} from '../../components';
import NavigationService from '../../services/NavigationService';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errors: '',
    };
  }
  _handleSubmit = async (values, {resetForm}) => {
    await this.setState({loading: true});
    const {userName, password} = values;
    try {
      await this.props.SignIn(userName, password);
      const {token, userId, role, error} = await this.props.SignInReducer;
      if (token !== null && userId !== null && role !== null) {
        await AuthControl.saveToken('token', token, false);
        await AuthControl.saveToken('userId', userId, false);
        await AuthControl.saveToken('role', role, false);
        resetForm();
      }
      if (error) {
        this.errorRender(error);
      }
      this.setState({loading: false});
    } catch (error) {
      this.setState({loading: false});
    }
  };
  gotoSignup = () => {
    NavigationService.navigate('RegisterScreen');
  };
  errorRender = (error) => {
    this.setState({
      errors: error,
    });
  };
  render() {
    const {loading, errors} = this.state;
    return (
      <SafeStatusView
        statusBackColor={'#fff'}
        statusBarStyle={'dark-content'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          <KeyboardAwareScrollView style={[styles.container]}>
            <View style={styles.TopViewStyle}>
              <Image
                source={require('../../assets/deneme.jpg')}
                style={styles.imageStyle}
              />
            </View>
            <Text style={styles.welcomeText}>Hoşgeldiniz</Text>
            <Formik
              validateOnMount={true}
              validationSchema={LoginValidationSchema}
              initialValues={{
                userName: '',
                password: '',
              }}
              onSubmit={this._handleSubmit}>
              {({handleSubmit, isValid}) => (
                <>
                  <View style={styles.inputViewStyle}>
                    <Field
                      component={CustomLoginInput}
                      name="userName"
                      placeholder="Kullanıcı Adı"
                      placeholderTextColor="#8E9092"
                    />
                  </View>
                  <View style={styles.inputViewStyle}>
                    <Field
                      component={CustomPasswordInput}
                      name="password"
                      placeholder="Şifre"
                      placeholderTextColor="#8E9092"
                      maxLength={12}
                    />
                  </View>
                  <View
                    style={[
                      styles.inputViewStyle,
                      {justifyContent: 'space-between'},
                    ]}>
                    {loading ? (
                      <ActivityIndicator size="large" color="black" />
                    ) : (
                      <>
                        <TouchableOpacity
                          style={
                            !isValid
                              ? styles.DisableButton
                              : styles.ActiveButton
                          }
                          disabled={!isValid}
                          onPress={handleSubmit}>
                          <Text style={styles.ButtonText}>GİRİŞ YAP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.goSignup}
                          onPress={this.gotoSignup}>
                          <Text>Hesabın yok mu ? O halde kayıt ol.</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </>
              )}
            </Formik>
            <View style={styles.freeStyle2}>
              <View style={styles.errorWrapper}>
                {errors && errors['errorDescription'] ? (
                  <Text style={styles.errorText}>
                    {errors['errorDescription']}
                  </Text>
                ) : null}
              </View>
              <View style={styles.lineStyle} />
            </View>
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
    resizeMode: 'center',
    borderWidth: 1,
  },

  welcomeText: {
    width: calcWidth(100),
    height: calcHeight(10),
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputViewStyle: {
    width: calcWidth(100),
    height: calcHeight(10),
    alignItems: 'center',
  },
  ActiveButton: {
    backgroundColor: '#456BFF',
    borderRadius: 5,
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DisableButton: {
    backgroundColor: '#707070',
    borderRadius: 5,
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: calcHeight(1.14) + calcWidth(1.14),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  freeStyle2: {
    width: calcWidth(100),
    height: calcHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStyle: {
    width: calcWidth(100) - 60,
    borderWidth: 1,
    borderColor: 'rgba(26, 26, 26, 0.2)',
  },
  errorWrapper: {
    top: 0,
    position: 'absolute',
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 16,
  },
  errorText: {
    fontSize: 12,
    color: '#F61D45',
    textAlign: 'center',
    paddingVertical: 4,
  },
});
const mapStateToProps = (state) => {
  return {
    SignInReducer: state.SignInReducer,
  };
};

const mapDispatchToProps = {
  SignIn,
};

LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default LoginScreen;
