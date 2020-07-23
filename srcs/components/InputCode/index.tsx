import React, {useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import {useState} from 'react';

export interface InputCodeProps {
  /**
   * Length of code
   */
  codeLength?: number;

  /**
   * Width of a cell
   */
  size?: number;

  /**
   * Space between cells
   */
  space?: number;

  activeColor?: string;
  inactiveColor?: string;

  /**
   * As disabled mode, user can not type
   */
  disabled?: boolean;

  /**
   * Handle on user type code
   */
  onChangeCode?: (code: string) => void;

  /**
   * callback function called when
   */
  onFulFill?: (code: string) => void;

  /**
   * Style for cell
   */
  style?: StyleProp<TextStyle>;

  /**
   * Style for view wrapper
   */
  containerStyle?: StyleProp<ViewStyle>;
}

export const InputCode = (props: InputCodeProps) => {
  const {
    codeLength = 6,
    space = 10,
    size = 40,
    activeColor = 'black',
    inactiveColor = 'rgba(0,0,0,0.2)',
    onChangeCode,
    onFulFill,
    disabled = false,
    style = {},
    containerStyle = {},
  } = props;

  const [value, setValue] = useState<(string | number)[]>(
    new Array(codeLength),
  );
  const inputRefs: any[] = [];

  const setFocus = (inputIndex: number) => {
    if (inputRefs[inputIndex]) inputRefs[inputIndex].focus();
  };

  const setBlur = (inputIndex: number) => {
    if (inputRefs[inputIndex]) inputRefs[inputIndex].blur();
  };

  const getCodeString = (): string => {
    const valueString = value.toString().replace(/,/g, '');
    return valueString;
  };

  const handleOnFulFill = (text: string) => {
    if (onFulFill) {
      onFulFill(text);
    }
  };

  const handleOnChange = (text: string, i: number) => {
    const newValue = [...value];
    newValue[i] = text;
    setValue(newValue);

    // set input cursor position
    if (!text) {
      setFocus(i - 1);
    } else {
      setFocus(i + 1);
    }
  };

  const handleOnTouchInput = () => {
    const firstEmptyIndex = value.findIndex(
      item => item === undefined || item === null || item === '',
    );
    setFocus(firstEmptyIndex >= 0 ? firstEmptyIndex : value.length - 1);
  };

  const handleOnKeyPress = (i: number) => (e: any) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!value[i]) {
        setFocus(i - 1);
        handleOnChange('', i - 1);
      }
    } else {
      handleOnChange(e.nativeEvent.key, i);
    }
  };

  useEffect(() => {
    const valueString = value.toString().replace(/,/g, '');
    if (valueString.length === 6) {
      handleOnFulFill(valueString);
    }

    if (onChangeCode) {
      onChangeCode(getCodeString());
    }
  }, [value]);

  const _renderInputs = () => {
    const inputs = [];

    for (let i = 0; i < codeLength; i++) {
      const cellStyle: StyleProp<TextStyle>[] = [
        {
          width: size,
          height: size,
          marginLeft: i > 0 ? space / 2 : 0,
          marginRight: i < codeLength - 1 ? space / 2 : 0,
          borderBottomColor: (value[i] && activeColor) || inactiveColor,
          borderBottomWidth: 1,
          textAlign: 'center',
          fontSize: 13,
          color: '#151B22',
        },
        style,
      ];

      inputs.push(
        <View pointerEvents="none">
          <TextInput
            ref={ref => (inputRefs[i] = ref)}
            maxLength={1}
            style={cellStyle}
            value={value[i] || ''}
            onChangeText={text => handleOnChange(text, i)}
            keyboardType="number-pad"
            underlineColorAndroid="transparent"
            autoFocus={i === 0}
            onKeyPress={handleOnKeyPress(i)}
          />
        </View>,
      );
    }

    return inputs;
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleOnTouchInput()}>
      <View style={[styles.container, containerStyle]}>{_renderInputs()}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {},
});
