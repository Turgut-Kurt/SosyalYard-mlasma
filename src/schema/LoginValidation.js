import * as yup from 'yup';
const LoginValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(5, ({min}) => `En az ${min} karakter olmalıdır.`)
    .max(12, ({max}) => `En fazla ${max} karakter olmalıdır.`)
    .required('Kullanıcı adı zorunlu'),
  password: yup
    .string()
    .min(6, ({min}) => `En az ${min} karakter olmalıdır.`)
    .max(12, ({max}) => `En fazla ${max} karakter olmalıdır.`)
    .required('Şifre zorunlu'),
});

export default LoginValidationSchema;
