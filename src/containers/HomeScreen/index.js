import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import postData from '../../data/postData';
import {connect} from 'react-redux';
import {GetPostFilters} from '../../store/Actions/Post/GetPostFilters';
import {GetAllPosts} from '../../store/Actions/Post/GetAllPosts';
// import AuthControl from '../../utils/AuthControl';
import {
  CustomLoginInput,
  CustomPost,
  HomeHeader,
  SafeStatusView,
} from '../../components';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      type: false,
    };
  }
  componentDidMount = async () => {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const Aprovince = await AsyncStorage.getItem('province');
      const Acategory = await AsyncStorage.getItem('category');
      console.log('Aprovince');
      console.log(Aprovince);
      console.log('Aprovince');
      console.log('Acategory');
      console.log(Acategory);
      console.log('Acategory');
      console.log('*********************************************');
      console.log(
        `post/filter?Category=${Acategory}&Province=${Aprovince}&District=0&Page=1&PageSize=100`,
      );
      console.log('*********************************************');
      if (Aprovince === null && Acategory === null) {
        await this.props.GetAllPosts();
        const {loading: l1, error: e1} = this.props.GetAllPostsReducer;
        this.setState({
          loading: l1,
          errors: e1,
          type: false,
        });
      } else {
        await this.props.GetPostFilters(Aprovince, Acategory);
        const {loading: l2, error: e2} = this.props.GetPostFiltersReducer;
        this.setState({
          loading: l2,
          errors: e2,
          type: true,
        });
      }
    });
  };
  componentWillUnmount() {
    this._unsubscribe();
  }
  renderHeader = () => {
    return (
      <HomeHeader
        name="alpha-s-circle-outline"
        color="#fff"
        headerText={'SIFIR İSRAF'}
        iconSize={34}
      />
    );
  };
  render() {
    const {data: d1} = this.props.GetAllPostsReducer;
    const {data: d2} = this.props.GetPostFiltersReducer;
    const {loading, type} = this.state;
    return (
      <SafeStatusView
        statusBackColor={'#456BFF'}
        statusBarStyle={'white'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          loading ? (
            <ActivityIndicator size="large" color="#222222" />
          ) : (
            <View style={styles.container}>
              <FlatList
                nestedScrollEnabled
                style={styles.flatStyle}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={this.renderHeader}
                keyExtractor={(item) => item.id.toString()}
                data={type === false ? d1 : d2}
                //onEndReached={this.getMoreUsers}
                onEndReachedThreshold={0.5}
                onEndThreshold={0}
                renderItem={({item, index}) => (
                  <CustomPost key={index} {...item} />
                )}
              />
            </View>
          )
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#EAEAEA'},
  flatStyle: {},
});
const mapStateToProps = (state) => {
  return {
    GetPostFiltersReducer: state.GetPostFiltersReducer,
    GetAllPostsReducer: state.GetAllPostsReducer,
  };
};

const mapDispatchToProps = {
  GetPostFilters,
  GetAllPosts,
};

HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default HomeScreen;
