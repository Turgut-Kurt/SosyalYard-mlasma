import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import NavigationService from '../../services/NavigationService';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import {LikeAdd} from '../../store/Actions/Like/LikeAdd';
import moment from 'moment';
import {connect} from 'react-redux';
import {PROFIL} from '../../assets';
import AsyncStorage from '@react-native-community/async-storage';
class CustomPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = async () => {};
  likeFunction = async () => {
    let {userId} = this.props.SignInReducer;
    let count = this.props.likeCount + 1;
    try {
      await this.props.LikeAdd(userId, this.props.id, count);
      const {data, error} = await this.props.LikeAddReducer;
      this.setState({count: count});
      if (data !== null && error === null) {
        ToastAndroid.show(
          'beğendildi.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
      if (error) {
        Alert.alert('beğenme basarısız');
      }
    } catch (error) {
      console.log(error);
    }
  };
  gotoComment = () => {
    // NavigationService.navigate('CommentScreen', {items: this.props});
    NavigationService.navigate('CommentScreen', {
      items: this.props,
    });
  };
  render() {
    const {
      applicationUserViewDto,
      id,
      description,
      imageUrl,
      likeCount,
      commentCount,
      modifiedAt,
      createdBy,
      posts,
      comments,
    } = this.props;
    return (
      <View style={styles.postView}>
        <View style={styles.postHeader}>
          {applicationUserViewDto.imageUrl ? (
            <TouchableOpacity
              style={[styles.postHeaderLeft, styles.postCommonHeaderLeftRight]}>
              <Image
                source={{uri: applicationUserViewDto.imageUrl}}
                style={styles.imageProfileStyle}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.postHeaderLeft, styles.postCommonHeaderLeftRight]}>
              <Image source={PROFIL} style={styles.imageProfileStyle} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.postHeaderCenter}>
            <Text style={styles.postHeaderCenterTopText}>{createdBy}</Text>
            <Text style={styles.postHeaderCenterBottomText}>
              {moment(modifiedAt).format('DD.MM.YYYY HH:mm')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postHeaderRight}>
            <FontAwesome name="ellipsis-h" size={22} color={'#d0cecc'} />
          </TouchableOpacity>
        </View>
        <View style={styles.postContentText}>
          <Text>{description}</Text>
        </View>
        {imageUrl ===
        'http://res.cloudinary.com/dvoot2rqk/image/upload/v1613686505/phodgvdqo0ftqo0tibct.png' ? null : (
          <View style={styles.postContentView}>
            <Image source={{uri: imageUrl}} style={styles.postContentImage} />
          </View>
        )}

        <View style={styles.likesOrCommitView}>
          <Text>{this.state.count ? this.state.count : likeCount} Beğeni</Text>
          <Text>{commentCount} Yorum</Text>
        </View>
        <View style={styles.postFooter}>
          <TouchableOpacity
            style={styles.likedOrCommitPress}
            onPress={this.likeFunction}>
            <EvilIcons name="like" size={28} />
            <Text>Beğen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.likedOrCommitPress}
            onPress={this.gotoComment}>
            <EvilIcons
              name="comment"
              backgroundColor="gray"
              size={28}
              color="gray"
            />
            <Text>Yorum Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  postView: {
    alignSelf: 'center',
    marginTop: calcHeight(1),
    marginBottom: calcHeight(3),
    borderRadius: 10,
    width: calcWidth(100) - 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 18,
    backgroundColor: '#fff',
    padding: 20,
  },
  postHeader: {
    flexDirection: 'row',
  },
  postHeaderLeft: {
    height: '100%',
  },
  postCommonHeaderLeftRight: {width: '17%'},
  imageProfileStyle: {
    width: (calcWidth(7) + calcHeight(7)) / 2,
    height: (calcWidth(7) + calcHeight(7)) / 2,
    borderRadius: (calcWidth(25) + calcHeight(25)) / 2,
    resizeMode: 'stretch',
  },
  postHeaderCenter: {
    width: '66%',
  },
  postHeaderCenterTopText: {
    fontSize: (calcWidth(2.2) + calcHeight(2.2)) / 2,
    color: '#000',
  },
  postHeaderCenterBottomText: {
    fontSize: (calcWidth(1.78) + calcHeight(1.78)) / 2,
    color: '#d0cecc',
  },
  postHeaderRight: {width: '17%', alignItems: 'flex-end'},
  postContentText: {paddingVertical: 10},
  postContentView: {height: calcHeight(26)},
  postContentImage: {
    width: '100%',
    height: '100%',
  },
  likesOrCommitView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d0cecc',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: '#d0cecc',
  },
  likedOrCommitPress: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
});
const mapStateToProps = (state) => {
  return {
    LikeAddReducer: state.LikeAddReducer,
    SignInReducer: state.SignInReducer,
  };
};

const mapDispatchToProps = {
  LikeAdd,
};

CustomPost = connect(mapStateToProps, mapDispatchToProps)(CustomPost);
export default CustomPost;
