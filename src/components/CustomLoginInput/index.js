import React from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../settings/dimensions';
const CustomLoginInput = (props) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    inputExtraStyle,
    phone,
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];
  return (
    <>
      <TextInput
        style={[
          styles.inputStyle,
          inputExtraStyle,
          hasError && styles.errorInput,
        ]}
        value={value}
        onChangeText={(text) =>
          onChange(name)(props.phone ? text.replace(/[^0-9]/g, '') : text)
        }
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 16,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 20,
    elevation: 24,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default CustomLoginInput;
