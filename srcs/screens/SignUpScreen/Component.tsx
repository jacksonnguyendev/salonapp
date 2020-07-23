import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Appbar, Checkbox} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {
  BackgroundLayout,
  TextInput,
  Button,
  ErrorMessageBar,
  SizedBox,
  Divider,
  LinkText,
} from 'components';
import {theme, rootStyles, textStyles} from 'theme';
import {SPACINGS} from 'constants';
import {translate, SignUpCredentialType} from 'core';
import {SignUpFormKey, SignUpFormValue} from './useSignUp';
import {ImageSource} from 'assets';

interface SignUpScreenComponentProps {
  onSubmit: () => void;
  onGoBack: () => void;
  onChangeValue: (key: SignUpFormKey, value: SignUpFormValue) => void;
  loading: boolean;
  errorTitle?: string;
  values: SignUpCredentialType;
  formErrors: {[key in keyof SignUpCredentialType]?: string};
}

export const SignUpScreenComponent = (props: SignUpScreenComponentProps) => {
  const {
    onChangeValue,
    onGoBack,
    onSubmit,
    loading,
    errorTitle,
    values,
    formErrors,
  } = props;

  return (
    <BackgroundLayout>
      <Appbar.Header style={[styles.header]}>
        <Appbar.Action
          icon={ImageSource.ArrowLeft}
          color={theme.colors.textLight}
          onPress={() => onGoBack()}
        />
        <Appbar.Content
          title={translate('signUp.title')}
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
        <Text
          style={[
            styles.title,
            textStyles.title,
            textStyles.large,
            styles.contentPadding,
          ]}>
          {translate('signUp.second_title')}
        </Text>

        <SizedBox />
        <Divider />

        <ScrollView
          style={[rootStyles.flexSmall, styles.contentPadding]}
          bounces={false}>
          {(errorTitle && <ErrorMessageBar message={errorTitle} outlined />) ||
            null}

          <SizedBox />

          <View style={[rootStyles.row]}>
            <View style={[rootStyles.flexSmall]}>
              <TextInput
                bordered
                dark
                label={translate('signUp.field_first_name_label')}
                onChangeText={text => onChangeValue('firstName', text)}
                errorMessage={formErrors.firstName}
                status={formErrors.firstName ? 'error' : 'default'}
                value={values.firstName}
              />
            </View>
            <SizedBox />
            <View style={[rootStyles.flexSmall]}>
              <TextInput
                bordered
                dark
                label={translate('signUp.field_last_name_label')}
                onChangeText={text => onChangeValue('lastName', text)}
                errorMessage={formErrors.lastName}
                status={formErrors.lastName ? 'error' : 'default'}
                value={values.lastName}
              />
            </View>
          </View>

          <TextInput
            bordered
            dark
            label={translate('signUp.field_user_name_label')}
            onChangeText={text => onChangeValue('userName', text)}
            value={values.userName}
            autoCapitalize="none"
          />

          <TextInput
            bordered
            dark
            secureTextEntry
            label={translate('signUp.field_password_label')}
            onChangeText={text => onChangeValue('password', text)}
            errorMessage={formErrors.password}
            status={formErrors.password ? 'error' : 'default'}
            value={values.password}
          />

          <TextInput
            bordered
            dark
            secureTextEntry
            label={translate('signUp.field_confirm_password_label')}
            onChangeText={text => onChangeValue('confirmPassword', text)}
            errorMessage={formErrors.confirmPassword}
            status={formErrors.confirmPassword ? 'error' : 'default'}
            value={values.confirmPassword}
          />

          <TextInput
            bordered
            dark
            label={translate('signUp.field_email_label')}
            onChangeText={text => onChangeValue('email', text)}
            errorMessage={formErrors.email}
            status={formErrors.email ? 'error' : 'default'}
            value={values.email}
          />

          <SizedBox />

          <View
            style={[rootStyles.row, rootStyles.alignCenter, {marginLeft: -10}]}>
            <Checkbox.Android
              uncheckedColor={theme.colors.primary}
              color={theme.colors.primary}
              status={values.agreeWithTerms ? 'checked' : 'unchecked'}
              onPress={() => {
                onChangeValue('agreeWithTerms', !values.agreeWithTerms);
              }}
            />
            <Text style={[styles.terms]}>
              {translate('signUp.term_agreement.p1')}
              <LinkText>{translate('signUp.term_agreement.p2')}</LinkText>
            </Text>
          </View>

          <SizedBox />

          <Button
            onPress={onSubmit}
            loading={loading}
            disabled={!values.agreeWithTerms}>
            {translate('signUp.button')}
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
    paddingTop: SPACINGS.big,
  },
  contentPadding: {
    paddingHorizontal: SPACINGS.xLarge,
  },
  title: {
    color: theme.colors.primary,
  },
  terms: {
    ...textStyles.button,
    ...textStyles.small,
    color: 'black',
  },
});
