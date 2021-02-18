import * as yup from 'yup';
const ProfileUpdateValidation = yup.object().shape({
  firstName: yup
    .string()
    .min(3, ({min}) => `En az ${min} karakter olmalıdır.`)
    .required('İsim zorunlu'),
  surName: yup
    .string()
    .min(3, ({min}) => `En az ${min} karakter olmalıdır.`)
    .required('Soyisim zorunlu'),
  phone: yup
    .string()
    .min(11, ({min}) => `En az ${min} karakter olmalıdır.`)
    .required('Telefon numarası zorunlu'),
  password: yup
    .string()
    .min(6, ({min}) => `En az ${min} karakter olmalıdır.`)
    .max(12, ({max}) => `En fazla ${max} karakter olmalıdır.`)
    .required('Şifre zorunlu'),
});

export default ProfileUpdateValidation;
