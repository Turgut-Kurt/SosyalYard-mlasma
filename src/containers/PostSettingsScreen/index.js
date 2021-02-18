import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {Formik, Field} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import * as ImagePicker from 'react-native-image-picker';
import {PostAdd} from '../../store/Actions/Post/PostAdd';
import {
  CustomLoginInput,
  CustomPasswordInput,
  HomeHeader,
  SafeStatusView,
} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostSettingsValidation from '../../schema/PostSettingsValidation';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {
  categoryPlaceHolder,
  categoryList,
  provincePlaceHolder,
  provinceList,
} from '../../data';
import store from '../../store';
class PostSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      loadingButton: false,
    };
  }
  _handleSubmit = async (values, {resetForm}) => {
    this.setState({loadingButton: true});
    const Aprovince = await AsyncStorage.getItem('province');
    const Acategory = await AsyncStorage.getItem('category');
    const {province, category} = values;
    console.log('Aprovince');
    console.log(Aprovince);
    console.log('Aprovince');
    if (Aprovince !== null && Acategory !== null) {
      try {
        await AsyncStorage.setItem('province', `${province}`);
        await AsyncStorage.setItem('category', `${category}`);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await AsyncStorage.removeItem('province');
        await AsyncStorage.removeItem('category');
        await AsyncStorage.setItem('province', `${province}`);
        await AsyncStorage.setItem('category', `${category}`);
      } catch (e) {
        console.log(e);
      }
    }
    this.setState({loadingButton: false});
  };
  render() {
    const {loadingButton} = this.state;
    return (
      <SafeStatusView
        statusBackColor={'#456BFF'}
        statusBarStyle={'white'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          <KeyboardAwareScrollView style={styles.container}>
            <HomeHeader
              name="filter"
              color="#fff"
              headerText={'POST AYARLARI'}
              iconSize={34}
            />
            <Formik
              validateOnMount={true}
              validationSchema={PostSettingsValidation}
              initialValues={{
                province: '',
                category: '',
              }}
              onSubmit={this._handleSubmit}>
              {({handleSubmit, isValid, errors, setFieldValue, values}) => (
                <>
                  <View style={[styles.inputViewStyle, {marginTop: 20}]}>
                    <RNPickerSelect
                      name="category"
                      placeholder={categoryPlaceHolder}
                      items={categoryList}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('category', itemValue);
                      }}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 10,
                          right: 12,
                        },
                        placeholder: {
                          color: '#8E9092',
                          fontSize: 14,
                          fontFamily: 'Roboto',
                        },
                      }}
                      value={values.category}
                      useNativeAndroidPickerStyle={false}
                      textInputProps={{underlineColor: 'yellow'}}
                      Icon={() => {
                        return (
                          <Ionicons
                            name="md-arrow-down"
                            size={24}
                            color="gray"
                          />
                        );
                      }}
                    />
                    {errors.category && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.category}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.inputViewStyle]}>
                    <RNPickerSelect
                      name="province"
                      placeholder={provincePlaceHolder}
                      items={provinceList}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('province', itemValue);
                      }}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 10,
                          right: 12,
                        },
                        placeholder: {
                          color: '#8E9092',
                          fontSize: 14,
                          fontFamily: 'Roboto',
                        },
                      }}
                      value={values.province}
                      useNativeAndroidPickerStyle={false}
                      textInputProps={{underlineColor: 'yellow'}}
                      Icon={() => {
                        return (
                          <Ionicons
                            name="md-arrow-down"
                            size={24}
                            color="gray"
                          />
                        );
                      }}
                    />
                    {errors.province && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.province}
                      </Text>
                    )}
                  </View>
                  <View style={styles.inputViewStyle}>
                    {loadingButton ? (
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
  imageSelectStyle: {
    height: calcHeight(25),
    width: calcWidth(100),
    marginBottom: calcHeight(3),
  },
  imageStyle1: {
    width: '100%',
    height: '100%',
  },
  settingsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    color: '#fff',
    fontSize: (calcWidth(3) + calcHeight(3)) / 2,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textArea: {height: calcHeight(100) / 6},
  textArea1: {height: calcHeight(100) / 7, textAlignVertical: 'top'},
  ActiveButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 16,
    justifyContent: 'center',
    elevation: 24,
  },
  ActiveButtonText: {paddingLeft: 20, color: '#8E9092'},
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
    height: calcHeight(100) / 19,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 19,
    paddingLeft: 20,
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
    fontFamily: 'Roboto',
  },
});
// const mapStateToProps = (state) => {
//   return {
//     PostAddReducer: state.PostAddReducer,
//     SignInReducer: state.SignInReducer,
//   };
// };
//
// const mapDispatchToProps = {
//   PostAdd,
// };
//
// PostSettingsScreen = connect(mapStateToProps, mapDispatchToProps)(PostSettingsScreen);
export default PostSettingsScreen;
