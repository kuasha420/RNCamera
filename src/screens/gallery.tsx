import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const {height} = Dimensions.get('window');

const GalleryScreen = (props: {route: {params: {uri: any}}}) => {
  const {uri} = props.route.params;
  // console.log(uri);
  return (
    <View style={{marginHorizontal: 20, marginVertical: 20}}>
      <Text style={{fontSize: 18, marginBottom: 10}}>My Gallery</Text>
      <Image
        style={{width: 120, height: 120, borderRadius: 10}}
        source={{uri: uri}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default GalleryScreen;
