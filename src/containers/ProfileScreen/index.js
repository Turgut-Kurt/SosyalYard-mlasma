import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {SignIn} from '../../store/Actions/Auth/SignIn';
import {GetWorker} from '../../store/Actions/Workers/GetWorker';
import {WorkerImageAdd} from '../../store/Actions/Workers/WorkerImageAdd';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import {PROFIL} from '../../assets';
import {CustomMyPost, SafeStatusView} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errors: null,
      data: [],
    };
  }
  componentDidMount = async () => {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.fetchData();
    });
  };
  componentWillUnmount() {
    this._unsubscribe();
  }
  fetchData = async () => {
    const {userId} = await this.props.SignInReducer;
    await this.props.GetWorker(userId);
    const {loading, data, error} = this.props.GetWorkerReducer;
    this.setState({
      loading: loading,
      errors: error,
      data: data,
    });
  };
  renderHeader = (data) => {
    if (data) {
      if (Object.keys(data).length > 0) {
        return (
          <View style={styles.Header}>
            <View style={styles.Top}>
              <ImageBackground
                source={data.imageUrl ? {uri: data.imageUrl} : PROFIL}
                style={styles.imageStyle}>
                <Text style={styles.nameText}>
                  {` ${data.firstName} ${data.lastName}`}
                </Text>
                <TouchableOpacity
                  style={styles.selectImageButton}
                  onPress={() => {
                    ImagePicker.launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: 500,
                        maxWidth: 500,
                      },
                      async (response) => {
                        this.setState({response: response});
                        const {userId} = this.props.SignInReducer;
                        await this.props.WorkerImageAdd(
                          userId,
                          response.base64,
                        );
                        await this.fetchData();
                      },
                      // async (response) => {
                      //   const {userId} = this.props.SignInReducer;
                      //   await this.props.WorkerImageAdd(
                      //     userId,
                      //     response.base64,
                      //   );
                      //   debugger;
                      //   await this.fetchData();
                      //   debugger;
                      // },
                    );
                  }}>
                  {!this.state.response ? (
                    <Text style={styles.selectImageText}>Fotoğraf Seç</Text>
                  ) : (
                    <Text style={styles.selectImageText}>Fotoğraf Seçildi</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.settingsButton}
                  onPress={() => this.props.navigation.openDrawer()}>
                  <MaterialCommunityIcons name="cog" size={40} color="#fff" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={styles.Bottom}>
              <Text style={styles.postTextStyle}>
                {data.posts.length} {`\n`}Gönderiler
              </Text>
              <Text style={styles.postTextStyle}>
                {data.likes ? data.likes : '0'} {`\n`}Beğeniler
              </Text>
              <Text style={styles.postTextStyle}>
                {data.comments ? data.comments : '0'} {`\n`}Yorumlar
              </Text>
            </View>
          </View>
        );
      } else {
        return <Text>Love Celal Atalar</Text>;
      }
    }
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
        return (
          <View style={styles.Footer}>
            <FlatList
              style={styles.flatStyle}
              ListHeaderComponent={this.renderHeader(data)}
              keyExtractor={(item) => item.id.toString()}
              data={data.posts}
              onEndReachedThreshold={0.5}
              onEndThreshold={0}
              renderItem={({item, index}) => (
                <CustomMyPost key={index} {...item} />
              )}
            />
          </View>
        );
      } else {
        return <></>;
      }
    }
  };
  render() {
    const {loading: l0, data: d0, error: e0} = this.props.GetWorkerReducer;
    return (
      <SafeStatusView
        statusBackColor={'#456BFF'}
        statusBarStyle={'white'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={this.renderItems(l0, d0, e0)}
      />
    );
  }
}
const styles = StyleSheet.create({
  flatStyle: {marginBottom: calcHeight(8)},
  Header: {height: calcHeight(45), marginBottom: calcHeight(2)},
  Top: {height: calcHeight(34)},
  imageStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  nameText: {
    position: 'absolute',
    color: 'gray',
    fontSize: (calcWidth(3) + calcHeight(3)) / 2,
    fontWeight: 'bold',
    bottom: 20,
  },
  selectImageButton: {
    width: 300,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectImageText: {
    color: 'gray',
    fontSize: (calcWidth(3) + calcHeight(3)) / 2,
    fontWeight: 'bold',
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
const mapStateToProps = (state) => {
  return {
    SignInReducer: state.SignInReducer,
    GetWorkerReducer: state.GetWorkerReducer,
  };
};

const mapDispatchToProps = {
  SignIn,
  GetWorker,
  WorkerImageAdd,
};

ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
export default ProfileScreen;
