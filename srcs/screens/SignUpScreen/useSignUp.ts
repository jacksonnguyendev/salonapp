import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {
  SignUpCredential,
  UserType,
  UserGender,
  userActions,
  SignUpCredentialType,
  RootState,
  translate,
} from '../../core';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {SignUpValidateschema} from './signUpValidateSchema';
import {SCREEN_NAMES} from 'constants';

export type SignUpFormKey = keyof SignUpCredentialType;
export type SignUpFormValue = string | UserType | UserGender | boolean;

export const useSignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const form = useFormik<SignUpCredentialType>({
    initialValues: {
      userName: '',
      password: '',
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      type: UserType.Customer,
      agreeWithTerms: false,
    },
    onSubmit: values => {
      dispatch(userActions.userSignUp(values));
    },
    validationSchema: SignUpValidateschema,
  });

  const {isFetching, isSuccess, error} = useSelector(
    (state: RootState) => state.user.signUp,
  );

  const changeFormValue = (key: SignUpFormKey, value: SignUpFormValue) => {
    form.setFieldValue(key, value);
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
      navigation.navigate(SCREEN_NAMES.SUCCESS, {
        subTitle: translate('signUp.success_description'),
        onPressButton: () => navigation.goBack(),
      });
      dispatch(userActions.userSignUpClean());
    }
  }, [isSuccess]);

  return {
    signUp: form.handleSubmit,
    changeFormValue,
    formValues: form.values,
    formErrors: form.errors,
    loading: isFetching,
    error,
  };
};
