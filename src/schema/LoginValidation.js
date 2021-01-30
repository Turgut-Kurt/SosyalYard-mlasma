import * as yup from 'yup';
const LoginValidationSchema = yup.object().shape({
  email: yup.string().email('geçersiz email').required('gerekli alan'),
  password: yup
    .string()
    .min(6, ({min}) => `En az ${min} karakter olmalıdır.`)
    .max(12, ({max}) => `En fazla ${max} karakter olmalıdır.`)
    .required('Şifre zorunlu'),
});

export default LoginValidationSchema;
