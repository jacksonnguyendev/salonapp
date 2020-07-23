import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {
  BackgroundLayout,
  TextInput,
  Button,
  InputCode,
  SizedBox,
} from '../../../components';
import {theme} from '../../../theme';
import {SPACINGS} from '../../../constants';
import {textStyles} from '../../../theme/textStyles';
import {translate, ResponseError, responsive} from '../../../core';
import {rootStyles} from '../../../theme/styles';
import {ErrorMessageBar} from '../../../components/ErrorMessageBar';
import {LinkText} from '../../../components/LinkText';
import {ImageSource} from 'assets';
import {values} from 'lodash';

export interface ForgotPasswordChangePasswordFormValue {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordChangePasswordScreenComponentProps {
  formValues: ForgotPasswordChangePasswordFormValue;
  onChangeText: (key: string) => (text: string) => void;
  onBlur: (key: string) => (text: string) => void;
  onSubmit: () => void;
  onGoBack: () => void;
  loading?: boolean;
  error?: ResponseError;
  validationErrors: {
    code?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
  resendTime: string;
  isAvalibleResend: boolean;
  onPressResend: () => void;
  email: string;
}

export const ForgotPasswordChangePasswordScreenComponent = (
  props: ForgotPasswordChangePasswordScreenComponentProps,
) => {
  const {
    onChangeText,
    formValues,
    onBlur,
    onSubmit,
    onGoBack,
    loading,
    error,
    validationErrors,
    resendTime,
    isAvalibleResend,
    onPressResend,
    email,
  } = props;

  const errorTitle = (error && error.getErrorTitle()) || '';

  return (
    <BackgroundLayout removeSafeEdge={['bottom']}>
      <Appbar.Header accessibilityStates style={[styles.header]}>
        <Appbar.Action
          accessibilityStates
          icon={() => <Image source={ImageSource.ArrowLeft} />}
          color={theme.colors.textLight}
          onPress={() => onGoBack()}
        />
        <Appbar.Content
          accessibilityStates
          title={translate('forgotPasswordChangePassword.title')}
          titleStyle={[textStyles.headerTitle]}
          style={[rootStyles.alignStart]}
        />
      </Appbar.Header>

      {/* <Animatable.View
        animation={{from: {flex: 2}, to: {flex: 0}}}
        duration={350}
        easing="ease-in-out"
      /> */}
      <KeyboardAvoidingView
        style={[styles.content]}
        behavior={Platform.select({ios: 'padding', android: 'height'})}>
        <ScrollView style={[rootStyles.flexSmall]} bounces={false}>
          <Text style={[styles.title, textStyles.title, textStyles.large]}>
            {translate('forgotPasswordChangePassword.secondTitle')}
          </Text>

          <Text style={[textStyles.subTitle, textStyles.medium]}>
            {translate('forgotPasswordChangePassword.description', {email: ''})}
            <Text style={[textStyles.semiBold]}>{email}</Text>
            <LinkText onPress={() => onGoBack()}>
              {translate('forgotPasswordChangePassword.button_change_email')}
            </LinkText>
          </Text>

          {(errorTitle && (
            <ErrorMessageBar
              message={errorTitle}
              outlined
              style={{marginTop: SPACINGS.tiny}}
            />
          )) ||
            null}

          <View style={[{marginTop: SPACINGS.big * 2}]}>
            {/* Field input code */}
            <Text
              style={[
                textStyles.description,
                textStyles.small,
                {color: theme.colors.accent},
              ]}>
              Code
            </Text>
            <InputCode
              containerStyle={[rootStyles.justiStart]}
              style={[
                {
                  width: responsive.getSize.w(30),
                  // height: responsive.getSize.h(26),
                },
                textStyles.description
              ]}
              activeColor={theme.colors.accent}
              onChangeCode={onChangeText('code')}
            />
            {validationErrors.code && (
              <Text
                style={[
                  textStyles.error,
                  {marginVertical: responsive.getSize.h(5)},
                ]}>
                {validationErrors.code}
              </Text>
            )}

            <Text
              style={[
                textStyles.description,
                {
                  marginTop: responsive.getSize.h(5),
                  // marginTop: SPACINGS.tiny,
                },
              ]}>
              {translate('forgotPasswordChangePassword.label_resent_code.p1')}
              {(isAvalibleResend && (
                <LinkText onPress={() => onPressResend()}>
                  {translate(
                    'forgotPasswordChangePassword.label_resent_code.p2',
                  )}
                </LinkText>
              )) || (
                <Text style={{color: theme.colors.text}}>{resendTime}</Text>
              )}
            </Text>

            {/* End Field input code */}

            <SizedBox />

            <TextInput
              label={translate(
                'forgotPasswordChangePassword.field_new_password_label',
              )}
              // placeholder={translate(
              //   'forgotPasswordChangePassword.field_new_password_placeholder',
              // )}
              onChangeText={onChangeText('newPassword')}
              onBlur={onBlur('newPassword')}
              value={formValues.newPassword}
              status={(validationErrors.newPassword && 'error') || 'default'}
              errorMessage={validationErrors.newPassword}
              bordered
              dark
              secureTextEntry
              editable={formValues.code.length === 6}
            />
            <SizedBox />

            <TextInput
              label={translate(
                'forgotPasswordChangePassword.field_confirm_password_label',
              )}
              // placeholder={translate(
              //   'forgotPasswordChangePassword.field_confirm_password_placeholder',
              // )}
              onChangeText={onChangeText('confirmPassword')}
              onBlur={onBlur('confirmPassword')}
              value={formValues.confirmPassword}
              status={
                (validationErrors.confirmPassword && 'error') || 'default'
              }
              errorMessage={validationErrors.confirmPassword}
              bordered
              secureTextEntry
              dark
              editable={formValues.code.length === 6}
            />
          </View>

          <Button
            accessibilityStates
            onPress={onSubmit}
            loading={loading}
            style={{marginTop: SPACINGS.large}}
            disabled={
              ((validationErrors.code ||
                validationErrors.confirmPassword ||
                validationErrors.newPassword) &&
                true) ||
              false
            }>
            {translate('forgotPassword.submit')}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    marginBottom: SPACINGS.tiny,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: SPACINGS.xLarge,
    paddingTop: SPACINGS.big,
  },
  title: {
    color: theme.colors.primary,
  },
});
