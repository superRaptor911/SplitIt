import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ButtonGroup, CheckBox, Icon, Image} from 'react-native-elements';
import {
  deleteVideos,
  getTimeFromID,
  getVideoList,
  shareVideos,
} from './VideoMgmt';

const genVideoList = async videoID => {
  const images = await getVideoList(videoID);
  let arr = [];
  images.images.map(item => {
    arr.push({
      element: () => (
        <Image
          source={{uri: 'file://' + images.path + '/' + item + '.png'}}
          containerStyle={styles.images}>
          <View style={styles.videoDetails}>
            <Icon name="videocam" color="white" />
            <Text style={styles.videoDetailsText}>{getTimeFromID(item)}</Text>
          </View>
        </Image>
      ),
    });
  });

  console.log('Loading Previews');
  return arr;
};

const onSelectAllPressed = (selectAll, setSelectedItems, items) => {
  let selectedItems = [];
  if (!selectAll) {
    for (let i = 0; i < items.length; i++) {
      selectedItems.push(i);
    }
  }

  setSelectedItems(selectedItems);
};

const SplitedVideos = ({videoID, buttonStates, navigation}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [videoListChanged, setVideoListChanged] = useState(0);

  useEffect(() => {
    genVideoList(videoID).then(result => {
      setButtons(result);
    });
  }, [videoID, videoListChanged]);

  useEffect(() => {
    if (buttonStates.deletePressed) {
      deleteVideos(videoID, selectedItems).then(nothingLeft => {
        if (nothingLeft) {
          navigation.popToTop();
        }
        setSelectedItems([]);
        setVideoListChanged(prevState => {
          return prevState + 1;
        });
      });
      buttonStates.setDeletePressed(false);
    }

    if (buttonStates.sharePressed) {
      shareVideos(videoID, selectedItems);
      buttonStates.setSharePressed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonStates.deletePressed, buttonStates.sharePressed]);

  const onItemSelected = itemIDs => {
    setSelectedItems(itemIDs);
  };

  return (
    <View>
      <CheckBox
        title="select all"
        right
        containerStyle={styles.container}
        textStyle={styles.videoDetailsText}
        checked={selectAll}
        checkedColor="white"
        onPress={() => {
          onSelectAllPressed(selectAll, setSelectedItems, buttons);
          setSelectAll(!selectAll);
        }}
      />
      <ButtonGroup
        selectMultiple
        buttons={buttons}
        vertical
        selectedIndexes={selectedItems}
        onPress={onItemSelected}
        containerStyle={styles.container}
        buttonContainerStyle={styles.buttonContainer}
        selectedButtonStyle={styles.slectedItemStyle}
        underlayColor="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  images: {
    width: '100%',
    height: 140,
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
    height: 150,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0)',
    borderWidth: 0,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0)',
    borderWidth: 0,
  },
  slectedItemStyle: {
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,
    padding: 4,
  },
  videoDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  videoDetailsText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    color: '#FFFFFF',
  },
});
export default SplitedVideos;
