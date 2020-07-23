import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {Paragraph} from 'react-native-paper';
import {translate, ICredential} from '../../core';
import {TextInput, Button} from '../../components';
import {SPACINGS, SCREEN_NAMES} from '../../constants';
import {BackgroundLayout} from '../../components';
import {SignInFormKey} from './useSignIn';
import {ImageSource} from '../../assets';
import {rootStyles} from '../../theme/styles';
import {IResponseError} from '../../core/entities/ResponseError';
import {ErrorMessageBar} from '../../components/ErrorMessageBar';
import {LinkText} from '../../components/LinkText';
import {theme} from '../../theme';
import {textStyles} from '../../theme/textStyles';
import {useWatchKeyboard} from '../../reactHooks/useWatchKeyBoard';

export interface SignInScreenComponentProps {
  onSignIn: () => void;
  onChangeFormValue: (key: SignInFormKey, value: string) => void;
  loading: boolean;
  error?: IResponseError;
  values: ICredential;
  onNavigateTo: (screenName: keyof typeof SCREEN_NAMES) => void;
}

export const SignInScreenComponent = (props: SignInScreenComponentProps) => {
  const {
    onChangeFormValue,
    error,
    loading,
    onSignIn,
    values,
    onNavigateTo,
  } = props;
  const {visible: keyboardVisible} = useWatchKeyboard();

  // const errorMessages = (error && error.getErrorMessages()) || undefined;
  const errorTitle = (error && error.getErrorTitle()) || undefined;

  return (
    <BackgroundLayout>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: undefined})}
        style={{flex: 1}}>
        <View style={[styles.container]}>
          <View style={[rootStyles.justiCenter, rootStyles.flexMedium]}>
            <Image source={ImageSource.Logo} style={[rootStyles.selfCenter]} />

            {(errorTitle && (
              <ErrorMessageBar
                message={errorTitle}
                style={{marginVertical: SPACINGS.large}}
              />
            )) || <View style={{height: SPACINGS.big * 2}} />}

            <TextInput
              containerStyle={{marginVertical: SPACINGS.default}}
              label={translate('signIn.usernamePlaceholder')}
              onChangeText={text => onChangeFormValue('username', text)}
              value={values.username}
            />

            <TextInput
              label={translate('signIn.passwordPlaceholder')}
              secureTextEntry
              onChangeText={text => onChangeFormValue('password', text)}
              value={values.password}
              statusIconVisible={false}
            />

            <Button
              disabled={!values.username || !values.password}
              loading={loading}
              onPress={() => onSignIn()}
              style={[styles.btn]}>
              {translate('signIn.title')}
            </Button>
          </View>

          <View
            style={[
              rootStyles.alignCenter,
              rootStyles.justiEnd,
              rootStyles.flexSmall,
            ]}>
            {!keyboardVisible && (
              <Paragraph style={[styles.bottomDescription]}>
                <LinkText onPress={() => onNavigateTo(SCREEN_NAMES.FOGOT_PASS)}>
                  {translate('signIn.optionDescription.p1')}
                </LinkText>
                {translate('signIn.optionDescription.p2')}
                <LinkText onPress={() => onNavigateTo(SCREEN_NAMES.SIGN_UP)}>
                  {translate('signIn.optionDescription.p3')}
                </LinkText>
                <Paragraph style={[styles.bottomDescription, textStyles.small]}>
                  {translate('signIn.optionDescription.p4')}
                </Paragraph>
                <LinkText
                  style={[textStyles.small]}
                  onPress={() =>
                    onNavigateTo(SCREEN_NAMES.TERMS_AND_CONDITIONS)
                  }>
                  {translate('signIn.optionDescription.p5')}
                </LinkText>
              </Paragraph>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACINGS.big,
  },
  btn: {
    marginTop: SPACINGS.big,
  },
  bottomDescription: {
    color: theme.colors.paragraph,
    textAlign: 'center',
    ...textStyles.medium,
    ...theme.fonts.default.regular,
  },
});
