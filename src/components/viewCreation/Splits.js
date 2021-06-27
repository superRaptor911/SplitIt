import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import SplitedVideos from './SplitedVideos';

const Header = ({buttonStates}) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Splits</Text>

        <View style={styles.iconContainer}>
          <Icon
            name="trash"
            type="ionicon"
            color="white"
            size={28}
            onPress={() => {
              buttonStates.setDeletePressed(true);
            }}
          />
          <View style={styles.space} />
          <Icon
            name="share-social"
            type="ionicon"
            color="white"
            size={28}
            onPress={() => {
              buttonStates.setSharePressed(true);
            }}
          />
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const Splits = ({videoID, navigation}) => {
  const [deletePressed, setDeletePressed] = useState(false);
  const [sharePressed, setSharePressed] = useState(false);

  const buttonStates = {
    deletePressed: deletePressed,
    setDeletePressed: setDeletePressed,
    sharePressed: sharePressed,
    setSharePressed: setSharePressed,
  };

  return (
    <View style={styles.root}>
      <Header buttonStates={buttonStates} />
      <SplitedVideos
        videoID={videoID}
        buttonStates={buttonStates}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 45,
    width: '80%',

    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 29,
    color: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  line: {
    borderWidth: 1,
    borderColor: 'rgba(232, 232, 232, 0.3)',
    borderStyle: 'solid',
    marginBottom: 20,
  },
  space: {
    width: 10,
  },
});

export default Splits;
