import React from 'react';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import {Text, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const HomeHeader = (props) => (
  <View style={styles.container}>
    <MaterialCommunityIcons
      name={props.name}
      color={props.color}
      size={props.iconSize}
    />
    <Text style={styles.headerText}>{props.headerText}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#456BFF',
    flexDirection: 'row',
    width: calcWidth(100),
    height: calcHeight(9),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 24,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: (calcWidth(3) + calcHeight(3)) / 2,
  },
});
export default HomeHeader;
