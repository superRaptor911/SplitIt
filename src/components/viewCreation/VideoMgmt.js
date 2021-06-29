import Share from 'react-native-share';
import {getExtension, getWorkingDirectory, sortStringNums} from '../Utility';

const RNFS = require('react-native-fs');

export const filterVideos = list => {
  return list.filter(item => {
    return getExtension(item) === 'mp4';
  });
};

export const getVideoList = async videoID => {
  const workingDir = getWorkingDirectory();

  let files = [];
  try {
    const videos = filterVideos(await RNFS.readdir(workingDir + '/' + videoID));
    files = sortStringNums(videos);
  } catch (e) {
    console.log('Error::VideoMgmt::Failed to get split List');
    console.log(e);
  }
  return {images: [...new Set(files)], path: workingDir + '/' + videoID};
};

export const getTimeFromID = id => {
  const total = 30 * id;
  const sMin = parseInt(total / 60, 10);
  const sSec = total % 60;
  return `${sMin}:${sSec}`;
};

// Method to delete Videos, videoID is the id of the video, Ids are list of split ids
export const deleteVideos = async (videoID, Ids) => {
  const files = await getVideoSplitsList(videoID);
  const workingDir = getWorkingDirectory();

  if (files.length === Ids.length) {
    await RNFS.unlink(workingDir + '/' + videoID);
    await RNFS.mkdir(workingDir + '/' + videoID);
    return true;
  }

  for (let i = 0; i < Ids.length; i++) {
    const fileName = files[Ids[i]] + '.mp4';
    const path = workingDir + '/' + videoID + '/' + fileName;
    await RNFS.unlink(path);
  }

  return false;
};

// Function to share seleted videos
export const shareVideos = async (videoID, Ids) => {
  const files = await getVideoSplitsList(videoID);
  const workingDir = getWorkingDirectory();

  let filenames = [];
  for (let i = 0; i < Ids.length; i++) {
    const fileName = files[Ids[i]] + '.mp4';
    const path = workingDir + '/' + videoID + '/' + fileName;
    filenames.push('file://' + path);
  }

  try {
    await Share.open({urls: filenames, type: 'video/mp4'});
  } catch (e) {
    console.log('error while sharing');
    console.log(e);
  }
};

const getVideoSplitsList = async videoID => {
  const workingDir = getWorkingDirectory();

  const videos = filterVideos(await RNFS.readdir(workingDir + '/' + videoID));
  return sortStringNums(videos);
};
