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
  ImageBackground,
} from 'react-native';
// import {connect} from 'react-redux';
// import {SignIn} from '../../store/Actions/Auth/SignIn';
// import AuthControl from '../../utils/AuthControl';
import {Formik, Field} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import * as ImagePicker from 'react-native-image-picker';
import {
  CustomLoginInput,
  CustomPasswordInput,
  HomeHeader,
  SafeStatusView,
} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
    };
  }
  render() {
    return (
      <SafeStatusView
        statusBackColor={'#fff'}
        statusBarStyle={'dark-content'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          <>
            <HomeHeader
              name="note-plus"
              color="#fff"
              headerText={'GÖNDERİ EKLE'}
              iconSize={34}
            />
            <View style={styles.imageSelectStyle}>
              <ImageBackground
                source={
                  !this.state.response
                    ? require('../../assets/denemeprofil.jpg')
                    : {uri: this.state.response.uri}
                  //require('../../assets/denemeprofil.jpg')
                }
                style={styles.imageStyle}>
                <TouchableOpacity
                  style={styles.settingsButton}
                  onPress={() => {
                    ImagePicker.launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: 500,
                        maxWidth: 500,
                      },
                      (response) => {
                        this.setState({response: response});
                        console.log('response');
                        console.log(response);
                        console.log('response');
                      },
                      // async (response) => {
                      //   const {userId} = this.props.SignInReducer;
                      //   await this.props.WorkerImageAdd(
                      //     userId,
                      //     response.base64,
                      //   );
                      // },
                    );
                  }}>
                  {!this.state.response ? (
                    <Text style={styles.nameText}>Fotoğraf Seç</Text>
                  ) : (
                    <Text style={styles.nameText}>Fotoğraf Seçildi</Text>
                  )}
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </>
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  imageSelectStyle: {height: calcHeight(25), width: calcWidth(100)},
  container: {flex: 1},
  imageStyle: {
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
// PostScreen = connect(mapStateToProps, mapDispatchToProps)(PostScreen);
export default PostScreen;
