import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  FlatList,
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
  CustomPost,
  SafeStatusView,
} from '../../components';
import postData from '../../data/postData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderHeader = () => {
    return (
      <View style={styles.Header}>
        <View style={styles.Top}>
          <ImageBackground
            source={require('../../assets/denemeprofil.jpg')}
            style={styles.imageStyle}>
            <Text style={styles.nameText}>Özkan Tabak</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <MaterialCommunityIcons name="cog" size={40} color="#fff" />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.Bottom}>
          <Text style={styles.postTextStyle}>15 {`\n`}Gönderiler</Text>
          <Text style={styles.postTextStyle}>25 {`\n`}Beğeniler</Text>
          <Text style={styles.postTextStyle}>35 {`\n`}Yorumlar</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeStatusView
        statusBackColor={'#fff'}
        statusBarStyle={'dark-content'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          <>
            <View style={styles.Footer}>
              <FlatList
                nestedScrollEnabled
                style={styles.flatStyle}
                ListHeaderComponent={this.renderHeader}
                keyExtractor={(item) => item.id.toString()}
                data={postData}
                //onEndReached={this.getMoreUsers}
                onEndReachedThreshold={0.5}
                onEndThreshold={0}
                renderItem={({item, index}) => (
                  <CustomPost key={index} {...item} />
                )}
              />
            </View>
          </>
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  Header: {height: calcHeight(45)},
  Top: {height: calcHeight(34)},
  imageStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nameText: {
    color: '#fff',
    fontSize: (calcWidth(3) + calcHeight(3)) / 2,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  Bottom: {
    height: calcHeight(11),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 18,
    backgroundColor: '#fff',
  },
  settingsButton: {
    padding: 7,
    position: 'absolute',
    right: 10,
    top: 15,
  },
  postTextStyle: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: (calcWidth(2.1) + calcHeight(2.1)) / 2,
    fontWeight: 'bold',
    color: '#6f6d6b',
  },
  Footer: {height: calcHeight(100)},
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
// ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
export default ProfileScreen;
