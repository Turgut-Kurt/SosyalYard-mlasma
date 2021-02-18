import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import {
  CustomBackHeader,
  CustomViewInput,
  SafeStatusView,
} from '../../components';
import ProfileUpdateValidation from '../../schema/ProfileUpdateValidation';
import {Field, Formik} from 'formik';
import {WorkerUpdate} from '../../store/Actions/Workers/WorkerUpdate';
import {connect} from 'react-redux';
import helpers from '../../helpers';
class ProfileUpdateScreen extends Component {
  constructor(props) {
    super(props);
    let role = props.role;
    this.state = {
      loading: false,
      role,
    };
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
  };
  _handleSubmit = async (values, {resetForm}) => {
    const {data: d0} = this.props.GetWorkerReducer;
    await this.setState({loading: true});
    const {firstName, surName, phone, password} = values;
    let department = 1;
    try {
      await this.props.WorkerUpdate(
        d0.id,
        d0.email,
        phone,
        firstName,
        surName,
        d0.userName,
        password,
        department,
      );
      const {data, error} = await this.props.WorkerUpdateReducer;
      console.log('error');
      console.log(error);
      console.log('error');
      console.log('data');
      console.log(data);
      console.log('data');
      if (data !== null && error === null) {
        ToastAndroid.show(
          'Bilgiler başarıyla güncellendi.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        this.handleBackButton();
        resetForm();
      }
      if (error) {
        Alert.alert('Güncelleme işlemi başarısız oldu.');
      }
      this.setState({loading: false});
    } catch (error) {
      this.setState({loading: false});
    }
  };
  render() {
    const {loading} = this.state;
    return (
      <SafeStatusView
        statusBackColor={'#456BFF'}
        statusBarStyle={'light-content'}
        safeStyle={{backgroundColor: '#456BFF'}}
        content={
          <KeyboardAwareScrollView style={styles.container}>
            <CustomBackHeader
              headerBackColor={'#456BFF'}
              textColor={'#fff'}
              onPress={this.handleBackButton}
              headerText={'Bilgilerimi Güncelle'}
            />
            <Formik
              validateOnMount={true}
              validationSchema={ProfileUpdateValidation}
              initialValues={{
                firstName: '',
                surName: '',
                phone: '',
                password: '',
              }}
              onSubmit={this._handleSubmit}>
              {({handleSubmit, isValid}) => (
                <>
                  <View style={styles.inputViewStyle}>
                    <Field
                      component={CustomViewInput}
                      name="firstName"
                      placeholder="(Zorunlu)"
                      placeholderTextColor="#8E9092"
                      leftText={'İsim'}
                      leftTextStyle={{width: '22%'}}
                      leftBackColor={{backgroundColor: '#456BFF'}}
                      inputExtraStyle={{width: '78%'}}
                      errorTextExtraStyle={{color: '#000'}}
                      errorViewExtraStyle={{borderColor: '#000'}}
                      viewExtraStyle={styles.inputExtraStyle}
                      maxLength={15}
                    />
                  </View>
                  <View style={styles.inputViewStyle}>
                    <Field
                      component={CustomViewInput}
                      name="surName"
                      placeholder="(Zorunlu)"
                      placeholderTextColor="#8E9092"
                      leftText={'Soyisim'}
                      leftTextStyle={{width: '22%'}}
                      leftBackColor={{backgroundColor: '#456BFF'}}
                      inputExtraStyle={{width: '78%'}}
                      errorTextExtraStyle={{color: '#000'}}
                      errorViewExtraStyle={{borderColor: '#000'}}
                      viewExtraStyle={styles.inputExtraStyle}
                      maxLength={15}
                    />
                  </View>
                  <View style={styles.inputViewStyle}>
                    <Field
                      component={CustomViewInput}
                      name="phone"
                      placeholder="(Zorunlu)"
                      placeholderTextColor="#8E9092"
                      leftText={'Telefon'}
                      leftTextStyle={{width: '22%'}}
                      leftBackColor={{backgroundColor: '#456BFF'}}
                      inputExtraStyle={{width: '78%'}}
                      errorTextExtraStyle={{color: '#000'}}
                      errorViewExtraStyle={{borderColor: '#000'}}
                      viewExtraStyle={styles.inputExtraStyle}
                      phone={true}
                      keyboardType="numeric"
                      maxLength={11}
                    />
                  </View>
                  <View style={styles.inputViewStyle}>
                    <Field
                      component={CustomViewInput}
                      name="password"
                      placeholder="(Zorunlu)"
                      placeholderTextColor="#8E9092"
                      leftText={'Şifre'}
                      leftTextStyle={{width: '22%'}}
                      leftBackColor={{backgroundColor: '#456BFF'}}
                      inputExtraStyle={{width: '78%'}}
                      errorTextExtraStyle={{color: '#000'}}
                      errorViewExtraStyle={{borderColor: '#000'}}
                      viewExtraStyle={styles.inputExtraStyle}
                      maxLength={12}
                    />
                  </View>
                  <View style={styles.inputViewStyle}>
                    {loading ? (
                      <ActivityIndicator size="large" color="black" />
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.SaveButton,
                          !isValid ? null : {backgroundColor: '#456BFF'},
                        ]}
                        disabled={!isValid}
                        onPress={handleSubmit}>
                        <Text style={styles.ButtonText}>KAYDET</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#EAEAEA'},
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  inputViewStyle: {
    width: calcWidth(100),
    height: calcHeight(7.5),
    alignItems: 'center',
  },
  SaveButton: {
    backgroundColor: '#707070',
    borderRadius: 5,
    height: calcHeight(100) / 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  ButtonText: {
    fontSize: (calcWidth(2.2) + calcHeight(2.2)) / 2,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  inputExtraStyle: {
    height: calcHeight(100) / 19,
  },
});
const mapStateToProps = (state) => {
  return {
    GetWorkerReducer: state.GetWorkerReducer,
    WorkerUpdateReducer: state.WorkerUpdateReducer,
  };
};

const mapDispatchToProps = {
  WorkerUpdate,
};

ProfileUpdateScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileUpdateScreen);
export default ProfileUpdateScreen;
