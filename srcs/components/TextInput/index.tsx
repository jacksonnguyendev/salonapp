import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dialog, Portal, List} from 'react-native-paper';
import {theme, rootStyles} from '../../theme';
import {SPACINGS, SAFE_HIT_SLOP, FORMAT_DATE} from '../../constants';
import {ImageSource} from '../../assets';
import {textStyles} from '../../theme/textStyles';
import {responsive, translate} from '../../core';
import {Button} from 'components';
import {SizedBox} from 'components/SizedBox';

export type TextInputStatusType = 'success' | 'error' | 'default';
type PTextInputProps = React.ComponentProps<typeof RNTextInput>;
type TextInputProps = PTextInputProps & {
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  status?: TextInputStatusType;
  statusIconVisible?: boolean;
  leftChildren?: JSX.Element;
  rightChildren?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  bordered?: boolean;
  dark?: boolean;
  touched?: boolean;
  extra?: JSX.Element;
};

export const TextInput = (props: TextInputProps) => {
  const {
    label,
    errorMessage,
    disabled = false,
    loading = false,
    status = 'default',
    statusIconVisible = true,
    leftChildren,
    rightChildren,
    onChangeText = (text: string) => {},
    onFocus,
    onBlur,
    containerStyle,
    bordered = false,
    dark = false,
    style,
    placeholderTextColor,
    touched,
    extra,
    ...rest
  } = props;
  const {secureTextEntry} = rest;

  const [secureVisible, setSecureVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(rest.value);
  const [isTouched, setIsTouched] = useState(false);

  const inputLabelAnimation =
    isFocus || value
      ? {
          from: {top: responsive.getSize.h(12), scale: 1},
          to: {top: responsive.getSize.h(-25), scale: 1},
        }
      : {
          from: {top: responsive.getSize.h(-25), scale: 1},
          to: {top: responsive.getSize.h(12), scale: 1},
        };
  useEffect(() => {
    setValue(rest.value);
    setIsTouched(true);
  }, [rest.value]);

  useEffect(() => {
    setIsTouched(touched !== undefined ? touched : false);
  }, [touched]);

  const shouldShowError = isTouched && errorMessage;

  return (
    <>
      <View
        style={[
          styles.inputContainer,
          styles.alignCenter,
          styles.bordered,
          isFocus && styles.focusedView,
          (shouldShowError && styles.errorBorder) || null,
          containerStyle && containerStyle,
        ]}>
        {label && (
          <Animatable.View
            style={[
              rootStyles.centered,
              {position: 'absolute', top: 0, bottom: 0},
            ]}
            duration={300}
            animation={inputLabelAnimation}>
            <Text
              style={[
                dark ? textStyles.inputLabelDark : textStyles.inputLabel,
                {marginBottom: responsive.getSize.h(9)},
                (shouldShowError && textStyles.error) || null,
              ]}>
              {label}
            </Text>
          </Animatable.View>
        )}
        {/* left view */}
        <View style={[styles.leftView, styles.alignCenter]}>
          {(leftChildren && leftChildren) || null}
        </View>

        {/* text input */}
        <RNTextInput
          {...rest}
          secureTextEntry={secureTextEntry && !secureVisible}
          style={[styles.input, dark && textStyles.inputDark, style]}
          placeholderTextColor={
            placeholderTextColor || theme.colors.placeholder
          }
          onChangeText={text => {
            setValue(text);
            onChangeText(text);
          }}
          onFocus={e => {
            setIsFocus(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={e => {
            setIsFocus(false);
            if (onBlur) onBlur(e);
          }}
        />

        {/* right view */}
        <View style={[styles.rightView, styles.alignCenter]}>
          {(rightChildren && rightChildren) || null}
          {loading && (
            <ActivityIndicator size="small" style={[styles.spaceRight]} />
          )}
          {secureTextEntry && (
            <TouchableOpacity
              hitSlop={SAFE_HIT_SLOP}
              style={[styles.touchEye]}
              onPress={() => setSecureVisible(prevData => !prevData)}>
              <Image
                source={
                  secureVisible ? ImageSource.EyeOpen : ImageSource.EyeClose
                }
              />
            </TouchableOpacity>
          )}

          {/* STATUS */}
          {(statusIconVisible && value && status === 'default' && (
            <Image source={ImageSource.DefaultCircle} />
          )) ||
            null}
          {statusIconVisible && status === 'success' && (
            <Image source={ImageSource.SuccessCircle} />
          )}

          {statusIconVisible && shouldShowError && (
            <Image source={ImageSource.CloseRed} />
          )}
        </View>
      </View>
      {shouldShowError && (
        <Text style={[textStyles.error, styles.error]}>{errorMessage}</Text>
      )}
      {(extra && extra) || null}
      <View style={{height: SPACINGS.default}} />
    </>
  );
};

export type InputPickerProps = TextInputProps & {
  data: {value: string; label: string}[];
  value?: string;
  onChangeValue: (value: string) => void;
};

export const InputPicker = (props: InputPickerProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [value, setValue] = useState(props.value || '');

  const show = () => {
    setIsDropdownVisible(true);
  };

  const close = () => {
    setIsDropdownVisible(false);
  };

  const handleOnChange = (nextValue: string) => () => {
    close();
    setValue(nextValue);
    props.onChangeValue && props.onChangeValue(nextValue);
  };

  const currentSelected = props.data.find(item => item.value === value) || {
    label: '',
  };

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value || '');
    }
  }, [props.value]);

  return (
    <>
      <View style={[styles.inputContainer, props.containerStyle]}>
        <TextInput
          {...props}
          editable={false}
          containerStyle={{flex: 1}}
          rightChildren={
            <Image
              source={ImageSource.ArrowDown}
              style={{marginTop: responsive.getSize.h(5)}}
            />
          }
          value={currentSelected.label}
        />
        <TouchableOpacity
          onPress={() => show()}
          style={[rootStyles.fullTouchHitSlop]}
        />
      </View>

      <Portal>
        <Dialog visible={isDropdownVisible} onDismiss={() => close()}>
          <Dialog.Content>
            {props.data.map(item => (
              <List.Item
                title={item.label}
                onPress={handleOnChange(item.value)}
              />
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

type DateTimeMode = 'date' | 'time' | 'datetime' | 'countdown';
export type InputDateTimePickerProps = {
  value?: string | number | Date;
  onChangeValue: (value: Date) => void;
  mode?: DateTimeMode;
  inputProps?: TextInputProps;
};

export const InputDateTimePicker = (props: InputDateTimePickerProps) => {
  const {
    inputProps = {
      containerStyle: {},
    },
  } = props;

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [value, setValue] = useState<Date | undefined>(
    (props.value && new Date(props.value)) || undefined,
  );

  const show = () => {
    setIsPickerVisible(true);
  };

  const close = () => {
    setIsPickerVisible(false);
  };

  const handleOnChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      close();
    }
    if (date) {
      setValue(date);
      props.onChangeValue && props.onChangeValue(date);
    }
  };

  useEffect(() => {
    if (props.value !== value) {
      setValue((props.value && new Date(props.value)) || undefined);
    }
  }, [props.value]);

  return (
    <>
      <View style={[styles.inputContainer, inputProps.containerStyle]}>
        <TextInput
          {...props.inputProps}
          editable={false}
          containerStyle={{flex: 1}}
          rightChildren={
            <Image
              source={ImageSource.Calendar}
              style={{marginTop: responsive.getSize.h(5)}}
            />
          }
          value={value && moment(value).format(FORMAT_DATE)}
        />
        <TouchableOpacity
          onPress={() => show()}
          style={[rootStyles.fullTouchHitSlop]}
        />
      </View>
      {Platform.select({
        ios: (
          <Portal>
            <Dialog
              visible={isPickerVisible}
              onDismiss={() => close()}
              dismissable={false}>
              <Dialog.Content>
                <DateTimePicker
                  value={value || new Date()}
                  mode={props.mode || 'date'}
                  onChange={handleOnChange}
                />
              </Dialog.Content>
              <Dialog.Actions style={{paddingHorizontal: SPACINGS.default}}>
                <Button
                  mode="outlined"
                  accessibilityStates
                  onPress={() => close()}
                  style={[rootStyles.flexSmall]}>
                  {translate('form.cancel')}
                </Button>
                <SizedBox />
                <Button
                  labelStyle={{color: 'white'}}
                  mode="contained"
                  accessibilityStates
                  onPress={() => close()}
                  style={[rootStyles.flexSmall]}>
                  {translate('form.done')}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        ),
        android:
          (isPickerVisible && (
            <DateTimePicker
              value={value || new Date()}
              mode={props.mode || 'date'}
              onChange={handleOnChange}
            />
          )) ||
          null,
      })}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: responsive.getSize.h(45),
    // borderRadius: responsive.getSize.h(45/2),
    backgroundColor: 'transparent',
    // paddingHorizontal: SPACIN=GS.tiny,
    flexDirection: 'row',
    paddingBottom: responsive.getSize.h(5),
  },
  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: '#CECECE',
  },
  errorBorder: {
    borderBottomColor: theme.colors.error,
  },
  focusedView: {
    borderBottomWidth: 1,
    // borderBottomColor: theme.colors.border,
  },
  input: {
    flex: 1,
    color: theme.colors.input,
    ...theme.fonts.default.regular,
    minHeight: responsive.getSize.h(25),
    marginTop: responsive.getSize.h(20),
    padding: 0,
  },
  touchEye: {
    marginRight: responsive.getSize.h(10),
  },
  leftView: {
    flexDirection: 'row',
  },
  rightView: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  spaceRight: {
    marginRight: responsive.getSize.w(5),
  },
  error: {
    // marginBottom: SPACINGS.tiny,
    marginTop: responsive.getSize.h(5),
  },
});
