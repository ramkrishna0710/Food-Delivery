import React from 'react';
import { StatusBar, Platform, View } from 'react-native';

const CustomStatusBar = ({ hidden = false, backgroundColor = 'transparent', ...props }) => {
  return (
    <View style={{ height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight, backgroundColor }}>
      <StatusBar hidden={hidden} backgroundColor={Platform.OS === 'android' ? 'transparent' : undefined} translucent {...props} />
    </View>
  );
};


export default CustomStatusBar;
