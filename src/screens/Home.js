import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import HomeButtons from '../components/HomeButtons';
import HomeHeader from '../components/HomeHeader';
import ProgressOverlay from '../components/ProgressOverlay';
import QualitySelectOverlay from '../components/QualitySelectOverlay';
import {splitVideo} from '../components/VideoProcessing';
import {COLORS} from '../styles/Global';

async function loadVideo(setVideoSelected, setSelectedVideo) {
  launchImageLibrary({mediaType: 'video'}, response => {
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      setSelectedVideo(response.assets[0]);
      setVideoSelected(true);
      // setIsVideoProcessing(true);
    }
  });
}

const Home = ({navigation}) => {
  const [isVideoProcessing, setIsVideoProcessing] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [videoSelected, setVideoSelected] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState();
  const [quality, setQuality] = useState('');

  useEffect(() => {
    if (percentage > 99) {
      setIsVideoProcessing(false);
    }
  }, [percentage]);

  useEffect(() => {
    if (quality !== '') {
      if (quality !== 'none') {
        console.log(quality);
        setIsVideoProcessing(true);
        splitVideo(selectedVideo, setPercentage, quality);
      }
      setQuality('');
      setVideoSelected(false);
    }
  }, [quality]);

  console.log('Rendering main');
  return (
    <View style={styles.root}>
      <HomeHeader navigation={navigation} />
      <HomeButtons
        navigation={navigation}
        loadVideo={loadVideo}
        setVideoSelected={setVideoSelected}
        setSelectedVideo={setSelectedVideo}
      />

      <ProgressOverlay isVisible={isVideoProcessing} percentage={percentage} />
      <QualitySelectOverlay isVisible={videoSelected} setQuality={setQuality} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

export default Home;
