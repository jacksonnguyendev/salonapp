import {Keyboard} from 'react-native';
import {useState, useEffect} from 'react';

export const useWatchKeyboard = () => {
  const [visible, setVisible] = useState(false);

  const _keyboardDidShow = () => {
    setVisible(() => true);
  };

  const _keyboardDidHide = () => {
    setVisible(() => false);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup listener
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  return {visible};
};
