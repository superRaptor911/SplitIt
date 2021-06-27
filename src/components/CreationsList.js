/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import {COLORS} from '../styles/Global';
import {FOLDER_NAME, getWorkingDirectory, sortStringNums} from './Utility';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,

    width: 160,
    height: 160,
  },

  imageContainer: {
    marginLeft: 30,
    marginBottom: 50,

    width: 160,
    height: 200,
  },

  imageTitle: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 10,
  },
});

const getCreationList = async () => {
  const RNFS = require('react-native-fs');
  const workingDir = getWorkingDirectory();

  let images = [];
  try {
    const files = sortStringNums(await RNFS.readdir(workingDir));
    for (let i of files) {
      const imgPath = `${workingDir}/${i}/1.png`;
      if (await RNFS.exists(imgPath)) {
        images.push({imgPath: imgPath, id: i});
      }
    }
  } catch (e) {
    console.log('Error::CreationsList::Failed to get creationList');
    console.log(e);
  }

  return images;
};

const genCreationList = async navigation => {
  const images = await getCreationList();
  return (
    <View style={styles.root}>
      {images.map((img, id) => (
        <View key={id} style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.push('ViewCreation', {videoID: img.id});
            }}>
            <Image
              source={{uri: 'file://' + img.imgPath}}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.imageTitle}>Creation {img.id}</Text>
        </View>
      ))}
    </View>
  );
};

const CreationsList = ({navigation}) => {
  const [creationList, setCreationList] = useState();

  useEffect(() => {
    genCreationList(navigation).then(result => {
      setCreationList(result);
    });
  }, []);

  return <ScrollView>{creationList}</ScrollView>;
};

export default CreationsList;
