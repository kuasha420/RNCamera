import React, {useRef} from 'react';
import MainStack from './navigators/main-stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import 'react-native-gesture-handler';

const Application = () => {
  const nav = useRef<NavigationContainerRef>(null);
  return (
    <NavigationContainer ref={nav}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Application;
