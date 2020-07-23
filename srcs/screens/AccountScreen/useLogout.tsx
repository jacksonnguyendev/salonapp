import React, {useState, useEffect} from 'react';
import {Paragraph, Dialog, Portal, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState, authActions} from 'core';
import {navigationReset} from 'core/adapters/redux/navigation/actions';
import {SCREEN_NAMES} from 'constants';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [askVisible, setAskVisible] = useState(false);
  const {isFetching, isSuccess} = useSelector(
    (state: RootState) => state.auth.logout,
  );

  const logout = () => {
    setAskVisible(false);
    dispatch(authActions.logout());
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(authActions.logoutClean());
      navigation.dispatch(navigationReset(SCREEN_NAMES.SIGN_IN));
    }
  }, [isSuccess]);

  const askPopupRender = () => {
    return (
      <Portal>
        <Dialog visible={askVisible} onDismiss={() => setAskVisible(false)}>
          <Dialog.Title accessibilityStates>Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to sign out?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              accessibilityStates
              onPress={() => setAskVisible(false)}
              disabled={isFetching}>
              Cancel
            </Button>
            <Button
              accessibilityStates
              onPress={() => logout()}
              loading={isFetching}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  return {
    onPressLogout: () => setAskVisible(true),
    askPopupRender,
    loading: false,
  };
};
