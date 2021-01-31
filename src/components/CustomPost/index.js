import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import {calcHeight, calcWidth} from '../../settings/dimensions';
class CustomPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.postView}>
        <View style={styles.postHeader}>
          <TouchableOpacity
            style={[styles.postHeaderLeft, styles.postCommonHeaderLeftRight]}>
            <Image
              source={require('../../assets/denemeprofil.jpg')}
              style={styles.imageProfileStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.postHeaderCenter}>
            <Text style={styles.postHeaderCenterTopText}>Carly Jane</Text>
            <Text style={styles.postHeaderCenterBottomText}>Carly Jane</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postHeaderRight}>
            <FontAwesome name="ellipsis-h" size={22} color={'#ABA9A7'} />
          </TouchableOpacity>
        </View>
        <View style={styles.postContentText}>
          <Text>
            örnek şarküteri kullanıcısı uygulamaya girdiğinde kendi bilgilerini
            çekmek için istek atıyor. bu istek gerçekleşmiyor. çünkü bu
            kullanıcıyı admın ekledi . yetkisi yok herhalde
          </Text>
        </View>
        <View style={styles.postContentView}>
          <Image
            source={require('../../assets/denemeprofil.jpg')}
            style={styles.postContentImage}
          />
        </View>
        <View style={styles.likesOrCommitView}>
          <Text>12 Beğeni</Text>
          <Text>6 Yorum</Text>
        </View>
        <View style={styles.postFooter}>
          <TouchableOpacity style={styles.likedOrCommitPress}>
            <EvilIcons name="like" size={26} />
            <Text>Beğen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likedOrCommitPress}>
            <EvilIcons name="comment" size={26} color="gray" />
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
    marginTop: calcHeight(5),
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
    color: '#ABA9A7',
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
    borderBottomColor: '#ABA9A7',
  },
  postFooter: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: '#ABA9A7',
  },
  likedOrCommitPress: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
});
export default CustomPost;
