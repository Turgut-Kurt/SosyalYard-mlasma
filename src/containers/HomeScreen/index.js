import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import postData from '../../data/postData';
// import {connect} from 'react-redux';
// import {SignIn} from '../../store/Actions/Auth/SignIn';
// import AuthControl from '../../utils/AuthControl';
import {Formik, Field} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import {
  CustomLoginInput,
  CustomPost,
  HomeHeader,
  SafeStatusView,
} from '../../components';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderHeader = () => {
    return <HomeHeader />;
  };
  render() {
    return (
      <SafeStatusView
        statusBackColor={'red'}
        statusBarStyle={'dark-content'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          <View style={styles.Container}>
            <FlatList
              nestedScrollEnabled
              style={styles.flatStyle}
              stickyHeaderIndices={[0]}
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
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#EAEAEA'},
  flatStyle: {},
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
