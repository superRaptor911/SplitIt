import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ButtonGroup, Image} from 'react-native-elements';
import {FOLDER_NAME, getExtension, sortStringNums} from '../Utility';

const styles = StyleSheet.create({
  images: {
    width: 300,
    height: 80,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,
    padding: 4,
  },
  space: {
    marginTop: 200,
  },
  root: {
    height: 1000,
  },
  buttonContainer: {
    height: 100,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0)',
    borderWidth: 0,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0)',
    borderWidth: 0,
    height: 'auto',
  },
});

const getVideoList = async videoID => {
  const RNFS = require('react-native-fs');
  const workingDir = RNFS.ExternalStorageDirectoryPath + '/' + FOLDER_NAME;
  console.log(workingDir + '/' + videoID);
  const files = sortStringNums(await RNFS.readdir(workingDir + '/' + videoID));
  return {images: [...new Set(files)], path: workingDir + '/' + videoID};
};

const genVideoList = async videoID => {
  const images = await getVideoList(videoID);
  let arr = [];
  images.images.map((item, id) => {
    arr.push({
      element: () => (
        <Image
          source={{uri: 'file://' + images.path + '/' + item + '.png'}}
          containerStyle={styles.images}
        />
      ),
    });
  });

  console.log('generating');
  return arr;
};

const SplitedVideos = ({videoID}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    genVideoList(videoID).then(result => {
      setButtons(result);
    });
  }, [videoID]);

  const onItemSelected = itemIDs => {
    setSelectedItems(itemIDs);
  };

  return (
    <View>
      <ButtonGroup
        selectMultiple
        buttons={buttons}
        vertical
        selectedIndexes={selectedItems}
        onPress={onItemSelected}
        containerStyle={styles.container}
        buttonContainerStyle={styles.buttonContainer}
      />
    </View>
  );
};

export default SplitedVideos;
