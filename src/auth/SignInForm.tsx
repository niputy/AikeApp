import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { base, colors } from '../utils/base';
import { Madoka } from 'react-native-textinput-effects';
import { ErrorMessage, Formik } from 'formik';
import { loginValidationSchema } from '../utils/helpers';
import auth from '@react-native-firebase/auth';

interface IProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const SignInForm = (props: IProps) => {
  const { setIsAuthenticated } = props;

  return (
    <View style={[base.flex, base.mt5, { marginHorizontal: 40 }]}>
      <Text style={[base.h1, base.textCenter, base.primary]}>Äike App</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <>
            <Madoka
              style={[base.mt5]}
              label={'Email'}
              onChangeText={handleChange('email')}
              borderColor={colors.secondary}
              labelStyle={base.primary}
              inputStyle={base.primary}
            />

            <Madoka
              style={[base.mt3]}
              label={'Password'}
              onChangeText={handleChange('password')}
              borderColor={colors.secondary}
              labelStyle={base.primary}
              inputStyle={base.primary}
              secureTextEntry
            />
            <Text style={[base.h3, base.textCenter, { color: colors.danger }]}>
              <ErrorMessage name="email" />
              {'\n'}
              <ErrorMessage name="password" />
            </Text>

            <TouchableHighlight
              style={[{ paddingVertical: 15, backgroundColor: colors.secondary, borderRadius: 24 }]}
              underlayColor={colors.tertiary}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              <Text style={[base.h3, base.textCenter]}>Sing Up / Log In</Text>
            </TouchableHighlight>
          </>
        )}
      </Formik>
    </View>
  );

  async function onSubmit(user: UserForm) {
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        console.log('User account created & signed in!');
        setIsAuthenticated(true);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          return logIn(user);
        }

        console.error(error);
      });
  }

  async function logIn(user: UserForm) {
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        setIsAuthenticated(true);
        console.log('User signed in!');
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export default SignInForm;
