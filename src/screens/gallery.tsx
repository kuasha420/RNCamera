import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import {folder} from './camera';

const GalleryScreen = () => {
  const [pics, setPics] = useState<RNFS.ReadDirItem[]>();

  useFocusEffect(
    useCallback(() => {
      const effect = async () => {
        const res = await RNFS.readDir(folder);
        console.log(res.map(pic => pic.path));
        setPics(res);
      };
      effect();
    }, []),
  );

  return (
    <View style={{marginHorizontal: 10, marginVertical: 20}}>
      <Text style={{fontSize: 18, marginBottom: 10}}>My Gallery</Text>
      <FlatList
        data={pics}
        keyExtractor={item => item.name}
        numColumns={2}
        renderItem={({item}) => (
          <Image
            key={item.name}
            style={{
              flex: 1,
              aspectRatio: 1,
              margin: 5,
              borderRadius: 10,
            }}
            source={{uri: 'file://' + item.path}}
          />
        )}
      />
    </View>
  );
};
export default GalleryScreen;
