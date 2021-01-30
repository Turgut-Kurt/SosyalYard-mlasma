import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {calcHeight, calcWidth} from '../../settings/dimensions';
const CustomPasswordInput = (props) => {
  const [eyeIcon, setEyeIcon] = useState('visibility-off');
  const [isPassword, setIsPassword] = useState(true);
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    inputExtraStyle,
    phone,
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];
  const changePwdType = () => {
    setEyeIcon(isPassword ? 'visibility' : 'visibility-off');
    setIsPassword((prevState) => !prevState);
  };
  return (
    <>
      <View style={[styles.inputViewStyle, hasError && styles.errorInput]}>
        <TextInput
          style={[styles.inputStyle]}
          value={value}
          onChangeText={(text) =>
            onChange(name)(props.phone ? text.replace(/[^0-9]/g, '') : text)
          }
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          secureTextEntry={isPassword}
          {...inputProps}
        />
        <TouchableOpacity
          style={styles.iconButtonStyle}
          onPress={changePwdType}>
          <Icon
            style={styles.icon}
            name={eyeIcon}
            size={25}
            color={'#707070'}
          />
        </TouchableOpacity>
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};
const styles = StyleSheet.create({
  inputViewStyle: {
    flexDirection: 'row',
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 16,
    borderRadius: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 24,
  },
  inputStyle: {
    width: ((calcWidth(100) - 60) * 17) / 20,
    height: calcHeight(100) / 16,
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  iconButtonStyle: {
    width: ((calcWidth(100) - 60) * 3) / 20,
    height: calcHeight(100) / 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
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
  icon: {
    position: 'absolute',
  },
});

export default CustomPasswordInput;
