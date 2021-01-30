import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
const SafeStatusView = (props) => (
  <>
    <StatusBar
      backgroundColor={props.statusBackColor}
      barStyle={props.statusBarStyle}
    />
    <SafeAreaView style={[styles.container, props.safeStyle]}>
      {props.content}
    </SafeAreaView>
  </>
);
const styles = StyleSheet.create({
  container: {flex: 1},
});
export default SafeStatusView;
