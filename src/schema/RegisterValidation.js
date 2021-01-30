import * as yup from 'yup';
const RegisterValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, ({min}) => `En az ${min} karakter olmalıdır.`)
    .required('İsim zorunlu'),
  surName: yup
    .string()
    .min(3, ({min}) => `En az ${min} karakter olmalıdır.`)
    .required('Soyisim zorunlu'),
  email: yup.string().email('geçersiz email').required('gerekli alan'),
  password: yup
    .string()
    .min(6, ({min}) => `En az ${min} karakter olmalıdır.`)
    .max(12, ({max}) => `En fazla ${max} karakter olmalıdır.`)
    .required('Şifre zorunlu'),
});

export default RegisterValidationSchema;
