import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export type AuthStackPramList = {
  signup: undefined;
  login: undefined;
};
const Stack = createNativeStackNavigator<AuthStackPramList>();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
