import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export type AppStackPramList = {
  Home: undefined;
};
const Stack = createNativeStackNavigator<AppStackPramList>();
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
