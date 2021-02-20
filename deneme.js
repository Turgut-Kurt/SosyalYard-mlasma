import {View, Text} from 'react-native';

import React, {Component} from 'react';
export default class App extends Component {
  componentDidMount = async () => {
    let d1 = [
      {a: {b: 1}, message: 'deneme'},
      {e: {f: 3}, message: 'deneme'},
    ];
    let o1 = {message: 'yenideneme'};
    let o2 = {c: {d: 2}};

    let obj = Object.assign({}, o1, o2);
    const reversed = d1.reverse();
    console.log('************');
    console.log(d1);
    console.log('************');
    console.log('reversed');
    console.log(reversed);
    console.log('reversed');
    d1.push(obj);
    console.log('************');
    console.log(d1);
    console.log('************');
  };

  render() {
    return (
      <View>
        <Text>as</Text>
      </View>
    );
  }
}
