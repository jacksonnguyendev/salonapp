import {useState, useEffect} from 'react';
import {userActions, RootState, ICredential} from '../../core';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {SCREEN_NAMES} from 'constants';
import {navigationReset} from 'core/adapters/redux/navigation/actions';

export type SignInFormKey = 'username' | 'password';

export const useSignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isFetching, isSuccess, error} = useSelector(
    (state: RootState) => state.user.signIn,
  );

  const [formValues, setFormValues] = useState<ICredential>({
    username: '',
    password: '',
  });

  const signIn = () => {
    dispatch(
      userActions.userSignIn({
        credential: {
          username: formValues.username,
          password: formValues.password,
        },
      }),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.dispatch(navigationReset(SCREEN_NAMES.MAIN_TAB));
      dispatch(userActions.userSignInClean());
    }
  }, [isSuccess]);

  const onChangeFormValue = (key: SignInFormKey, value: string) => {
    setFormValues({...formValues, [key]: value});
  };

  return {signIn, onChangeFormValue, formValues, error, loading: isFetching};
};
