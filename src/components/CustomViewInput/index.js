import React from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';
import {calcHeight, calcWidth} from '../../settings/dimensions';
const CustomViewInput = (props) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    viewExtraStyle,
    errorViewExtraStyle,
    leftTextStyle,
    leftBackColor,
    leftText,
    inputExtraStyle,
    phone,
    errorTextExtraStyle,
    ...inputProps
  } = props;
  const hasError = touched[name] && errors[name];
  return (
    <>
      <View
        style={[
          styles.inputView,
          viewExtraStyle,
          hasError && [styles.errorView, errorViewExtraStyle],
        ]}>
        <Text
          style={[
            styles.leftTextS,
            leftTextStyle,
            !errors[name] ? leftBackColor : null,
          ]}>
          {leftText}
        </Text>
        <TextInput
          style={[styles.inputStyle, inputExtraStyle]}
          value={value}
          onChangeText={(text) =>
            onChange(name)(phone ? text.replace(/[^0-9]/g, '') : text)
          }
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
      </View>
      {hasError && (
        <Text style={[styles.errorText, errorTextExtraStyle]}>
          {errors[name]}
        </Text>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 16,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 24,
    overflow: 'hidden',
  },
  leftTextS: {
    width: '40%',
    // backgroundColor: '#D20709',
    backgroundColor: '#707070',
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10,
    textAlignVertical: 'center',
    fontSize: 16,
  },
  inputStyle: {
    width: '60%',
    height: '100%',
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
  },
  errorView: {
    borderColor: 'red',
    borderWidth: 3,
  },
});

export default CustomViewInput;
