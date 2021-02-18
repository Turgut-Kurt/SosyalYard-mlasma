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
  TextInput,
  ActivityIndicator,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import {connect} from 'react-redux';
import {GetAllPosts} from '../../store/Actions/Post/GetAllPosts';
import {SafeStatusView} from '../../components';
import {calcHeight, calcWidth} from '../../settings/dimensions';
class CommentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }
  // componentDidMount = async () => {
  //   this._unsubscribe = this.props.navigation.addListener('focus', async () => {
  //     await this.props.GetAllPosts();
  //     const {loading, error} = this.props.GetAllPostsReducer;
  //     this.setState({
  //       loading: loading,
  //       errors: error,
  //     });
  //   });
  // };
  // componentWillUnmount() {
  //   this._unsubscribe();
  // }
  handleChange = (text) => {
    this.setState({value: text});
  };
  renderHeader = () => {
    return (
      <View style={styles.modalHeader}>
        <TouchableOpacity style={styles.modalHeaderLeft}>
          <Text style={[styles.leftLikedButton, styles.extraStyle]}>
            <FontAwesome name="thumbs-up" size={20} color={'#fff'} solid />
          </Text>
          <Text style={styles.leftLikedButton}>2</Text>
          <Text style={styles.leftLikedButton}>
            <FontAwesome name="chevron-right" size={22} color={'black'} solid />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalHeaderRight}>
          <EvilIcons name="like" size={44} />
        </TouchableOpacity>
      </View>
    );
  };
  renderItems = (loading, data, error) => {
    if (loading) {
      return <ActivityIndicator size={40} />;
    }
    if (error) {
      return <Text>Bir Hata Oluştu</Text>;
    }
    if (data) {
      if (Object.keys(data).length > 0) {
        console.log('data');
        console.log(data.message);
        console.log('data');
        return (
          <View style={styles.container}>
            <FlatList
              nestedScrollEnabled
              style={styles.flatStyle}
              ListHeaderComponent={this.renderHeader}
              stickyHeaderIndices={[0]}
              keyExtractor={(item) => item.id.toString()}
              data={data}
              //onEndReached={this.getMoreUsers}
              onEndReachedThreshold={0.5}
              onEndThreshold={0}
              renderItem={({item, index}) => {
                console.log('item');
                console.log(item);
                console.log('item');
                console.log('index');
                console.log(index);
                console.log('index');
                return (
                  <View style={styles.commentStyle}>
                    <Image
                      source={require('../../assets/denemeprofil.jpg')}
                      style={styles.commentProfileStyle}
                    />
                    <View style={styles.commentViewStyle}>
                      <Text style={styles.commentNameTextStyle}>
                        {item.applicationUser
                          ? `${item.applicationUser.firstName} ${item.applicationUser.lastName}`
                          : 'item.applicationUser null olarak geliyor'}
                      </Text>
                      <Text style={styles.commentinComTextStyle}>
                        {item.message}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        );
      } else {
        return <></>;
      }
    }
  };
  renderFooter = () => {
    return (
      <View style={styles.footerViewStyle}>
        <View style={styles.footerExViewStyle}>
          <TextInput
            style={[styles.inputStyle]}
            value={this.state.value}
            placeholder={'Yorum Yap'}
            placeholderTextColor={'gray'}
            onChangeText={this.handleChange}
          />
          <TouchableOpacity style={styles.sendCommentButton}>
            <EvilIcons color={'#456BFF'} name="sc-telegram" size={44} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render() {
    const {data} = this.props.GetAllPostsReducer;
    const {comments} = this.props.route.params.items;
    console.log('items');
    console.log(comments);
    console.log('items');
    return (
      <SafeStatusView
        statusBackColor={'#456BFF'}
        statusBarStyle={'white'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          <>
            {this.renderItems(false, comments, null)}
            {this.renderFooter()}
          </>
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  modalHeader: {
    flexDirection: 'row',
    height: calcHeight(5.5),
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    borderBottomColor: '#b8b8b8',
    backgroundColor: '#fff',
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  leftLikedButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: (calcWidth(5, 7) + calcHeight(5, 7)) / 2,
    height: (calcWidth(5, 7) + calcHeight(5, 7)) / 2,
  },
  extraStyle: {backgroundColor: '#456BFF', borderRadius: 100},
  modalHeaderRight: {
    marginHorizontal: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatStyle: {marginBottom: calcHeight(2)},
  commentStyle: {
    flexDirection: 'row',
    width: calcWidth(100) - 40,
    marginTop: calcHeight(2),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  commentProfileStyle: {
    width: (calcWidth(6) + calcHeight(6)) / 2,
    height: (calcWidth(6) + calcHeight(6)) / 2,
    borderRadius: (calcWidth(5, 5) + calcHeight(5, 5)) / 2,
  },
  commentViewStyle: {
    backgroundColor: '#F1F2F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  commentNameTextStyle: {fontSize: 14, color: 'black', fontWeight: 'bold'},
  commentinComTextStyle: {
    fontSize: 12,
    marginRight: (calcWidth(6) + calcHeight(6)) / 2,
  },
  footerViewStyle: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: calcHeight(100) / 12,
    borderTopWidth: 0.8,
    borderTopColor: '#b8b8b8',
    overflow: 'hidden',
  },
  footerExViewStyle: {
    flexDirection: 'row',
    height: calcHeight(100) / 19,
    width: calcWidth(100) - 40 - (calcWidth(6) + calcHeight(6)) / 2,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#F1F2F6',
    marginRight: 20,
  },
  inputStyle: {
    height: calcHeight(100) / 19,
    width: calcWidth(100) - 120 - (calcWidth(6) + calcHeight(6)) / 2,
    backgroundColor: '#F1F2F6',
  },
  sendCommentButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = (state) => {
  return {
    GetAllPostsReducer: state.GetAllPostsReducer,
  };
};

const mapDispatchToProps = {
  GetAllPosts,
};

CommentScreen = connect(mapStateToProps, mapDispatchToProps)(CommentScreen);
export default CommentScreen;
