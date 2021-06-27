import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import {FOLDER_NAME, getWorkingDirectory} from '../components/Utility';
import Splits from '../components/viewCreation/Splits';
import {COLORS} from '../styles/Global';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  image: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,

    width: '80%',
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const getPreviewImage = videoID => {
  const workingDir = getWorkingDirectory();
  const image = workingDir + '/' + videoID + '/1.png';
  return 'file://' + image;
};

const ViewCreation = ({route, navigation}) => {
  const {videoID} = route.params;
  const imageUri = getPreviewImage(videoID);

  return (
    <View style={styles.root}>
      <HeaderWithBackButton
        title={'Creation ' + videoID}
        navigation={navigation}
      />
      <ScrollView>
        <Image source={{uri: imageUri}} containerStyle={styles.image} />
        <Splits videoID={videoID} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default ViewCreation;
