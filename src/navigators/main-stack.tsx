import React from 'react';
import GalleryScreen from '../screens/gallery';
import CameraScreen from '../screens/camera';
import {StackScreenProps} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import SaveImageScreen from '../screens/save-img';

export type MainStackParams = {
  Camera: undefined;
  Gallery: undefined;
  Save: undefined;
};

export type StackScreens = keyof MainStackParams;
export type MainStackScreenProps<T extends StackScreens> = StackScreenProps<
  MainStackParams,
  T
>;

enableScreens();
const {Navigator, Screen} = createNativeStackNavigator<MainStackParams>();

const MainStack = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {/* <Screen name="Save" component={SaveImageScreen} /> */}
    <Screen name="Camera" component={CameraScreen} />
    <Screen name="Gallery" component={GalleryScreen} />
  </Navigator>
);

export default MainStack;
