import * as yup from 'yup';
const PostAddValidation = yup.object().shape({
  // district: yup.string().required('Lütfen ilçe seçiniz.'),
  province: yup.string().required('Lütfen il seçiniz.'),
  category: yup.string().required('Lütfen kategori seçiniz.'),
  // imageUrl: yup.string().required('Lütfen fotoğraf seçiniz.'),
  description: yup
    .string()
    .min(5, ({min}) => `En az ${min} karakter olmalıdır.`)
    .required('Açıklama zorunlu'),
});

export default PostAddValidation;
