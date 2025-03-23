import React, { FC } from 'react';
import { StatusBar, Platform, View, StatusBarStyle } from 'react-native';

interface CustomStatusBarProps {
  hidden?: boolean;
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
}


const CustomStatusBar:FC<CustomStatusBarProps> = ({ hidden = false, backgroundColor = 'transparent', barStyle='dark-content', ...props }) => {
  return (
    <View style={{ height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight, backgroundColor }}>
      <StatusBar hidden={hidden} backgroundColor={Platform.OS === 'android' ? 'transparent' : undefined} barStyle={barStyle} translucent {...props} />
    </View>
  );
};


export default CustomStatusBar;
