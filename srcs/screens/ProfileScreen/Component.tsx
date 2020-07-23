import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Avatar,
  Alert,
  EmptyLayout,
  TextInput,
  Row,
  SizedBox,
  LinkText,
  InputPicker,
  InputDateTimePicker,
  PickerImageType,
} from 'components';
import {
  Appbar,
  ActivityIndicator,
} from 'react-native-paper';
import {theme, rootStyles} from 'theme';
import {responsive, translate, UserGender, IResponseError} from 'core';
import {SPACINGS} from 'constants';
import {ImageSource} from 'assets';
import {
  AccountFormErrorType,
  AccountFormOnChange,
  AccountFormValues,
} from './useAccountForm';

const AVATAR_SIZE = responsive.getSize.w(60);

export interface AccountScreenComponentProps {
  values: AccountFormValues;
  formErrors: AccountFormErrorType;
  onChangeFormValue: AccountFormOnChange;
  onGoBack: () => void;
  isChanged?: boolean;
  loading?: boolean;
  onSubmit: () => void;
  error?: IResponseError;
  hideError: () => void;
  onChangeAvatar?: (file: PickerImageType) => void;
  isAvatarUploading?: boolean;
}

export const Component = (props: AccountScreenComponentProps) => {
  const {values, onGoBack, isChanged, loading, onSubmit, error, hideError, onChangeAvatar, isAvatarUploading} = props;

  const renderRightAction = () => {
    if (loading) {
      return (
        <View style={{padding: SPACINGS.default}}>
          <ActivityIndicator
            accessibilityStates
            color={theme.colors.action_second_Color}
          />
        </View>
      );
    }

      return (
        <Appbar.Action
          accessibilityStates
          icon={ImageSource.Check}
          color={isChanged ? theme.colors.action_color : theme.colors.action_second_Color}
          onPress={() => isChanged && onSubmit()}
        />
      );
  };

  return (
    <EmptyLayout removeSafeEdge={['top']}>
      <Appbar.Header accessibilityStates>
        <Appbar.BackAction
          accessibilityStates
          onPress={() => onGoBack()}
          color={theme.colors.action_second_Color}
        />
        <Appbar.Content accessibilityStates />
        {renderRightAction()}
      </Appbar.Header>
      <View style={[styles.container]}>
        <Avatar 
          source={{uri: values.avatar?.filePath}} 
          size={AVATAR_SIZE} 
          containerStyle={[styles.avatar]}
          onSelectFile={(file) => { 
            if (onChangeAvatar) onChangeAvatar(file)
          }} 
          loading={isAvatarUploading}
        />
        <View style={[styles.content]}>
          <TextInput
            dark
            label={translate('form.email_field_label')}
            value={values.email}
            editable={false}
          />

          <SizedBox />
          <Row>
            {/* <InputPicker
              dark
              label={translate('form.gender_field_label')}
              containerStyle={[rootStyles.flexSmall]}
              data={[
                {value: UserGender[1], label: 'Male'},
                {value: UserGender[2], label: 'Female'},
              ]}
              value={String(values.gender)}
              onChangeValue={value => {
                props.onChangeFormValue('gender', value);
              }}
            /> */}
            {/* <View style={{width: responsive.getSize.w(15)}} /> */}
            <InputDateTimePicker
              inputProps={{
                dark: true,
                label: translate('form.dob_field_label'),
                containerStyle: [rootStyles.flexSmall],
              }}
              value={values.dateOfBirth}
              onChangeValue={value => {
                props.onChangeFormValue('dateOfBirth', value.toISOString());
              }}
            />
          </Row>

          <SizedBox />
          <TextInput
            dark
            label={translate('form.phone_field_label')}
            onChangeText={text => props.onChangeFormValue('phoneNumber', text)}
            value={values.phoneNumber}
            keyboardType="numeric"
          />

          <SizedBox />
          <TextInput
            dark
            label={translate('form.address_field_label')}
            onChangeText={text => props.onChangeFormValue('address', text)}
            value={values.address}
          />

          <SizedBox />
          <LinkText>{translate('profile.change_password_link')}</LinkText>
        </View>
      </View>

      <Alert
        status="error"
        visible={(error && true) || false}
        title={error?.getErrorTitle()}
        onDismiss={hideError}
      />
    </EmptyLayout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  avatar: {
    marginTop: AVATAR_SIZE / 2,
    zIndex: 1,
    alignSelf: 'center',
  },
  avatarPen: {
    position: 'absolute',
    bottom: -responsive.getSize.w(5),
    right: -responsive.getSize.w(10) / 2,
    backgroundColor: theme.colors.primary,
    width: responsive.getSize.w(19),
    height: responsive.getSize.w(19),
    borderRadius: responsive.getSize.w(19) / 2,
    borderWidth: responsive.getSize.w(1),
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginTop: -(AVATAR_SIZE / 2),
    paddingTop: responsive.getSize.h(50),
    backgroundColor: theme.colors.content,
    paddingHorizontal: SPACINGS.default,
  },
});
