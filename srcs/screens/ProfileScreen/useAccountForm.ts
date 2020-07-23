import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {
  IUserDataEditable,
  RootState,
  userActions,
  IResponseError,
  AttachmentUpload,
  Attachment,
} from 'core';
import {useEffect, useState} from 'react';
import {PickerImageType} from 'components';

export type AccountFormErrorType = {[key in keyof IUserDataEditable]: string};
export type AccountFormKey = keyof IUserDataEditable;
export type AccountFormValue = string | any;
export type AccountFormOnChange = (
  key: AccountFormKey,
  value: AccountFormValue,
) => void;
export type AccountFormValues = IUserDataEditable & {
  email: string;
  avatar?: Attachment;
};

export const useAccountForm = (): {
  values: AccountFormValues;
  formErrors: AccountFormErrorType;
  onChangeFormValue: AccountFormOnChange;
  isChanged: boolean;
  onSubmit: () => void;
  loading: boolean;
  error?: IResponseError;
  hideError: () => void;
  onChangeAvatar?: (file: PickerImageType) => void;
  isAvatarUploading: boolean;
} => {
  const dispatch = useDispatch();
  const defaultValues = {
    email: '',
    firstName: '',
    lastName: '',
    gender: undefined,
    phoneNumber: '',
    address: '',
    dateOfBirth: undefined,
    avatar: undefined,
  };

  const [errorVisible, setErrorVisible] = useState(false);
  const {error, isFetching, isSuccess} = useSelector(
    (state: RootState) => state.user.updateProfile,
  );
  const user = useSelector((state: RootState) => state.user.data);
  const userData = (user && user.getData()) || defaultValues;
  const {isFetching: isAvatarUploading} = useSelector(
    (state: RootState) => state.user.updateAvatar,
  );

  const form = useFormik<IUserDataEditable>({
    initialValues: defaultValues,
    onSubmit: values => {
      dispatch(userActions.userUpdateProfile(values));
    },
  });

  const isChanged =
    JSON.stringify(form.values) !==
    JSON.stringify({
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      dateOfBirth: userData.dateOfBirth,
      // avatar: userData.avatar,
    });

  const onChangeFormValue = (key: AccountFormKey, value: AccountFormValue) => {
    form.setFieldValue(key, value);
  };

  const onChangeAvatar = (file: PickerImageType) => {
    dispatch(
      userActions.userUpdateAvatar({
        name: file.filename,
        type: file.mime,
        uri: `file://${file.path}`,
      }),
    );
  };

  useEffect(() => {
    form.setValues({
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      dateOfBirth: userData.dateOfBirth,
      // avatar: userData.avatar,
    });
    return () => {
      dispatch(userActions.userUpdateProfileClean());
    };
  }, []);

  useEffect(() => {
    if (error && !errorVisible) {
      setErrorVisible(true);
    }
  }, [error]);

  return {
    values: {...form.values, email: userData.email, avatar: userData.avatar},
    formErrors: {},
    onChangeFormValue,
    isChanged,
    onSubmit: () => form.handleSubmit(),
    loading: isFetching,
    error: (errorVisible && error) || undefined,
    hideError: () => setErrorVisible(false),
    onChangeAvatar,
    isAvatarUploading,
  };
};
