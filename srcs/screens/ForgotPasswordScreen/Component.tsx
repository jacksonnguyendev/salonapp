import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {
  BackgroundLayout,
  TextInput,
  Button,
  TextInputStatusType,
} from '../../components';
import {theme} from '../../theme';
import {SPACINGS, SCREEN_NAMES} from '../../constants';
import {textStyles} from '../../theme/textStyles';
import {translate, ResponseError} from '../../core';
import {rootStyles} from '../../theme/styles';
import {ImageSource} from '../../assets';
import {isValidEmail} from '../../core/utils/validate';
import {ErrorMessageBar} from '../../components/ErrorMessageBar';

export interface ForgotPasswordScreenComponentProps {
  emailValue: string;
  onChangeText: (key: string) => (text: string) => void;
  onNavigate: (screenName: keyof typeof SCREEN_NAMES) => void;
  onBlur: (key: string) => (text: string) => void;
  onSubmit: () => void;
  onGoBack: () => void;
  loading?: boolean;
  error?: ResponseError;
}

export const ForgotPasswordScreenComponent = (
  props: ForgotPasswordScreenComponentProps,
) => {
  const {
    onChangeText,
    emailValue,
    onBlur,
    onSubmit,
    onGoBack,
    onNavigate,
    loading,
    error,
  } = props;

  const errorTitle = (error && error.getErrorTitle()) || '';
  let emailStatus: TextInputStatusType = isValidEmail(emailValue)
    ? 'success'
    : 'default';
  if (errorTitle) {
    emailStatus = 'error';
  }

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
          title={translate('forgotPassword.title')}
          titleStyle={[textStyles.headerTitle]}
          style={[rootStyles.alignStart]}
        />
      </Appbar.Header>

      <Animatable.View
        animation={{from: {flex: 2}, to: {flex: 0}}}
        duration={350}
        easing="ease-in-out"
      />
      <KeyboardAvoidingView
        style={[styles.content]}
        behavior={Platform.select({ios: 'padding', android: undefined})}>
        <ScrollView style={[rootStyles.flexSmall]} bounces={false}>
          <Text style={[styles.title, textStyles.title, textStyles.large]}>
            {translate('forgotPassword.secondTitle')}
          </Text>

          <Text style={[textStyles.subTitle, textStyles.medium]}>
            {translate('forgotPassword.description')}
          </Text>

          <Image
            source={ImageSource.ForgotPassCover}
            style={[rootStyles.selfCenter, {marginVertical: SPACINGS.large}]}
          />

          {(errorTitle && <ErrorMessageBar message={errorTitle} outlined />) ||
            null}

          <View style={[{marginTop: SPACINGS.big}]}>
            <TextInput
              bordered
              dark
              label={translate('forgotPassword.email')}
              onChangeText={onChangeText('email')}
              onBlur={onBlur('email')}
              value={emailValue}
              status={emailStatus}
              autoFocus
            />
          </View>

          <Button
            disabled={!isValidEmail(emailValue)}
            onPress={onSubmit}
            loading={loading}>
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
