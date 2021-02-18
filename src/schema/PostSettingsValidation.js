import * as yup from 'yup';
const PostSettingsValidation = yup.object().shape({
  // district: yup.string().required('Lütfen ilçe seçiniz.'),
  province: yup.string().required('Lütfen il seçiniz.'),
  category: yup.string().required('Lütfen kategori seçiniz.'),
});

export default PostSettingsValidation;
