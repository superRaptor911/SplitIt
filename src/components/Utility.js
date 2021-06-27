import {PermissionsAndroid} from 'react-native';

export const FOLDER_NAME = 'splitIt';

const RNFS = require('react-native-fs');

export const getRWPermission = async () => {
  try {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'I NEED WRITE PERMISSION',
        message: 'PLZ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Write permission granted');
    } else {
      console.log('Write permission denied');
    }

    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'I NEED READ PERMISSION',
        message: 'PLZ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('READ permission granted');
    } else {
      console.log('READ permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function sortStringNums(data) {
  let newArray = [];
  for (let i of data) {
    const num = parseInt(i, 10);
    if (num) {
      newArray.push(String(num));
    }
  }

  newArray.sort((a, b) => {
    return a - b;
  });
  return newArray;
}

export function getExtension(filename) {
  return filename.split('.').pop();
}

export function getWorkingDirectory() {
  const workingDir = RNFS.ExternalStorageDirectoryPath + '/' + FOLDER_NAME;
  return workingDir;
}
