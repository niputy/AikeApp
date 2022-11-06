import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import SignInForm from './src/auth/SignInForm';
import Map from './src/maps/Map';
import { base, colors } from './src/utils/base';
import { DismissKeyboard } from './src/utils/helpers';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth().currentUser?.email);

  return (
    <DismissKeyboard>
      <SafeAreaView style={[base.bg, base.flex]}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
        {isAuthenticated ? (
          <Map setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <SignInForm setIsAuthenticated={setIsAuthenticated} />
        )}
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default App;
