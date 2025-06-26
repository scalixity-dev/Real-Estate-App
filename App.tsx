import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2196F3',
    secondary: '#03A9F4',
    error: '#F44336',
  },
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
} 