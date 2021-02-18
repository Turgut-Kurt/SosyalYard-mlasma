import * as yup from 'yup';
const RegisterValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(5, ({min}) => `En az ${min} karakter olmalıdır.`)
    .required('Kullanıcı adı zorunlu'),
  phoneNumber: yup
    .string()
    .min(11, ({min}) => `En az ${min} karakter olmalıdır.`)
    .required('Telefon numarası zorunlu'),
  email: yup.string().email('geçersiz email').required('gerekli alan'),
  password: yup
    .string()
    .min(6, ({min}) => `En az ${min} karakter olmalıdır.`)
    .max(12, ({max}) => `En fazla ${max} karakter olmalıdır.`)
    .required('Şifre zorunlu'),
});

export default RegisterValidationSchema;
