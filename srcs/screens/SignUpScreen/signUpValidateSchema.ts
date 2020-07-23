import * as yup from 'yup';
import {strongPasswordRegex, emailRegex, translate} from 'core';

export const SignUpValidateschema = yup.object().shape({
  firstName: yup
    .string()
    .required(translate('form.required_field', {fieldName: 'First Name'})),
  lastName: yup
    .string()
    .required(translate('form.required_field', {fieldName: 'Last Name'})),
  userName: yup
    .string()
    .required(translate('form.required_field', {fieldName: 'User Name'})),
  password: yup
    .string()
    .required(translate('form.required_field', {fieldName: 'Password'}))
    .matches(strongPasswordRegex, translate('errors.INVALID_PASSWORD')),
  confirmPassword: yup
    .string()
    .required(translate('form.required_field', {fieldName: 'Confirm password'}))
    .oneOf([yup.ref('password')], translate('errors.PASSWORD_NOT_MATCH')),
  email: yup
    .string()
    .required(translate('form.required_field', {fieldName: 'Email Name'}))
    .matches(emailRegex, translate('errors.INVALID_EMAIL')),
});
