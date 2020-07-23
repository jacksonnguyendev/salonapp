import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {AppNavigationContainer} from './srcs';
import {theme, configureStore} from './srcs';

// locks change fontsize
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const App = () => {
  // const handleSetLanguage = () => {};

  const handleInitApp = () => {};

  useEffect(() => {
    handleInitApp();
  });

  return (
    <Provider store={configureStore()}>
      <PaperProvider theme={theme}>
        <AppNavigationContainer />
      </PaperProvider>
    </Provider>
  );
};

export default App;
