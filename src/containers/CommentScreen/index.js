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
  ToastAndroid,
  LogBox,
} from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation >state',
]);
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import {connect} from 'react-redux';
import {PostCommentAdd} from '../../store/Actions/Post/PostCommentAdd';
import {SafeStatusView} from '../../components';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import skeletonData from '../../data/skeletonData';
class CommentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      data: null,
      items: [],
      comments: [],
      loading: false,
    };
  }
  componentDidMount = async () => {
    const {items} = this.props.route.params;
    const reversedItems = items.comments.reverse();
    await this.setState({items: items, comments: reversedItems});
    console.log('items.comments');
    console.log(items.comments);
    console.log('items.comments');
    // this.setState({
    //   loading: loading,
    //   errors: error,
    // });
  };
  addComment = async () => {
    const {items} = this.props.route.params;
    this.setState({loading: true});
    let message = this.state.value;
    let id = '';
    console.log('items.applicationUserViewDto');
    console.log(items.applicationUserViewDto);
    console.log('items.applicationUserViewDto');
    let applicationUser = items.applicationUserViewDto;
    try {
      let {userId} = this.props.SignInReducer;
      await this.props.PostCommentAdd(
        userId,
        this.state.items.id,
        this.state.value,
      );
      const {
        loading: l1,
        data: d1,
        error: e1,
      } = this.props.PostCommentAddReducer;
      if (d1 !== null && e1 === null) {
        id = d1;
        let obj = Object.assign({}, {message}, {id}, {applicationUser});
        let list = this.state.comments;
        list.push(obj);
        this.setState({value: '', loading: l1, comments: list});
      }
      if (e1) {
        ToastAndroid.show(
          'yorum yapılamadı.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
      this.setState({loading: false});
    } catch (error) {
      this.setState({loading: false});
    }
  };
  handleChange = (text) => {
    this.setState({value: text});
  };
  renderHeader = (data) => {
    return (
      <View style={styles.modalHeader}>
        <TouchableOpacity style={styles.modalHeaderLeft}>
          <Text style={[styles.leftLikedButton, styles.extraStyle]}>
            <FontAwesome name="thumbs-up" size={20} color={'#fff'} solid />
          </Text>
          <Text style={styles.leftLikedButton}>
            {data ? data.likeCount : 0}
          </Text>
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
  renderItems = (loading, data, error, comments) => {
    if (loading) {
      return <ActivityIndicator size={40} />;
    }
    if (error) {
      return <Text>Bir Hata Oluştu</Text>;
    }
    if (data) {
      if (Object.keys(data).length > 0) {
        console.log('items');
        console.log(comments);
        console.log('items');
        return (
          <View style={styles.container}>
            <FlatList
              style={styles.flatStyle}
              ListHeaderComponent={this.renderHeader(data)}
              stickyHeaderIndices={[0]}
              keyExtractor={(item) => item.id.toString()}
              data={comments}
              //onEndReached={this.getMoreUsers}
              onEndReachedThreshold={0.5}
              onEndThreshold={0}
              renderItem={({item, index}) => {
                console.log('item');
                console.log(item);
                console.log('item');
                return (
                  <View style={styles.commentStyle}>
                    <Image
                      source={
                        item.applicationUser
                          ? {
                              uri: item.applicationUser.imageUrl,
                            }
                          : {
                              uri: item.applicationUserViewDto.imageUrl,
                            }
                      }
                      style={styles.commentProfileStyle}
                    />
                    <View style={styles.commentViewStyle}>
                      <Text style={styles.commentNameTextStyle}>
                        {item.applicationUser
                          ? `${item.applicationUser.firstName} ${item.applicationUser.lastName}`
                          : `${item.applicationUserViewDto.firstName} ${item.applicationUserViewDto.lastName}`}
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
          {this.state.loading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity
              style={styles.sendCommentButton}
              onPress={this.addComment}>
              <EvilIcons color={'#456BFF'} name="sc-telegram" size={44} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeStatusView
        statusBackColor={'#456BFF'}
        statusBarStyle={'white'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          <>
            {this.renderItems(
              false,
              this.state.items ? this.state.items : skeletonData,
              null,
              this.state.comments,
            )}
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
    PostCommentAddReducer: state.PostCommentAddReducer,
    SignInReducer: state.SignInReducer,
  };
};

const mapDispatchToProps = {
  PostCommentAdd,
};

CommentScreen = connect(mapStateToProps, mapDispatchToProps)(CommentScreen);
export default CommentScreen;
