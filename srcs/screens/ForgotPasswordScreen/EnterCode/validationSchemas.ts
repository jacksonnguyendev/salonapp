import * as Yup from 'yup';

export const resetPasswordSchema = Yup.object().shape({
  code: Yup.string()
    .required('Please enter the code')
    .length(6, 'Please enter the code'),
  newPassword: Yup.string().required('Please enter your new password'),
  confirmPassword: Yup.string()
    .required('Please enter your new confirm password')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});
