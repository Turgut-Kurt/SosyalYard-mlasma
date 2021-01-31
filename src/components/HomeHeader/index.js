import React from 'react';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import {Text, View, StyleSheet} from 'react-native';
const HomeHeader = () => (
  <View style={styles.container}>
    <Text>HomeHeader</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    width: calcWidth(100),
    height: calcHeight(7),
    borderWidth: 3,
  },
});
export default HomeHeader;
