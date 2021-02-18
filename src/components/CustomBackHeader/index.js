import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../settings/dimensions';
const CustomBackHeader = (props) => (
  <View
    style={[styles.headerTopView, {backgroundColor: props.headerBackColor}]}>
    <TouchableOpacity style={styles.backButtonStyle} onPress={props.onPress}>
      <Image
        source={require('../../assets/back.png')}
        style={styles.imageStyle1}
      />
    </TouchableOpacity>
    <Text style={[styles.headerTopText, {color: props.textColor}]}>
      {props.headerText}
    </Text>
    {props.editText ? (
      <TouchableOpacity
        style={styles.editButtonStyle}
        onPress={props.onPressEdit}>
        <Text style={styles.editTextStyle}>Düzenle</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);
export default CustomBackHeader;
const styles = StyleSheet.create({
  headerTopView: {
    width: calcWidth(100),
    height: calcHeight(7.5),
    marginBottom: 20,
    justifyContent: 'center',
    zIndex: 1,
  },
  TopViewStyle: {
    width: calcWidth(100),
    height: calcHeight(30),
    marginBottom: calcHeight(2.5),
  },
  backButtonStyle: {position: 'absolute', zIndex: 3},
  imageStyle1: {
    width: (calcWidth(6) + calcHeight(6)) / 2,
    height: (calcWidth(6) + calcHeight(6)) / 2,
    borderWidth: 2,
  },
  headerTopText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: (calcWidth(2.5) + calcHeight(2.5)) / 2,
  },
  editButtonStyle: {
    position: 'absolute',
    backgroundColor: '#FF6363',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 2,
    right: 5,
  },
  editTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: (calcWidth(1.65) + calcHeight(1.65)) / 2,
  },
});
