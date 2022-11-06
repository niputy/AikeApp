import React from 'react';
import {
  Keyboard,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email!').required('Email Address is Required!'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters!`)
    .required('Password is required!'),
});

export const DismissKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

export const hasLocationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
  }

  return false;
};
