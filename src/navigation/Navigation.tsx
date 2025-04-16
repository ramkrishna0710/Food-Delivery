import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '@features/auth/SplashScreen';
import LogInScreen from '@features/auth/LogInScreen';
import { navigationRef } from '@utils/NavigationUtils';
import UserBottomTab from '@features/tabs/UserBottomTab';
import AnimatedTabs from '@features/tabs/AnimatedTabs';
import ResturantScreen from '@features/resturants/Resturants';
import CheckoutScreen from '@features/checkout/CheckoutScreen';
import OrderSuccess from '@features/checkout/OrderSuccess';

const Stack = createNativeStackNavigator();

const Navigation:FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator 
      initialRouteName='SplashScreen'
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='Resturants' component={ResturantScreen} />
        <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} />
        <Stack.Screen name='OrderSuccess' component={OrderSuccess} />
        <Stack.Screen options={{ animation: 'fade' }} name='LogInScreen' component={LogInScreen} />
        <Stack.Screen options={{ animation: 'fade' }} name='UserBottomTab' component={AnimatedTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation