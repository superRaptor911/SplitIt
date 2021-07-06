import {RNFFmpeg, RNFFmpegConfig} from 'react-native-ffmpeg';
import {FOLDER_NAME, getWorkingDirectory, sleep} from './Utility';

const RNFS = require('react-native-fs');

const Qualities = {
  fast: '-c copy -avoid_negative_ts 1',
  highp: '',
};

// Function to split video
export const splitVideo = async (mediaObj, setPercentage, quality) => {
  // Get dirs
  console.log('Going to process File : ' + mediaObj.uri);
  const workingDir = await setupWorkingDirectory(RNFS);
  const outputDir = await getNewOutputDirName(RNFS, workingDir);

  // Get File path from uri
  const filePath = await getMediaPath(mediaObj);

  let timeLeft = parseFloat(mediaObj.duration);
  let id = 1;
  const tickSize = 100.0 / calcSplits(timeLeft);
  setPercentage(0);

  while (timeLeft > 0) {
    const result = await splitVideoBatch(
      {
        batchSize: 8,
        splitDuration: 30,
        timeLeft: timeLeft,
        id: id,
        tickSize: tickSize,
      },
      filePath,
      outputDir,
      setPercentage,
      quality,
    );

    timeLeft = result.timeLeft;
    id = result.id;
  }

  const splitCount = calcSplits(mediaObj.duration);
  generateThumbnailsForSplits(
    splitCount,
    outputDir,
    setPercentage,
    tickSize / 10,
  );
};

const getMediaPath = async mediaObj => {
  let filePath = '';
  try {
    filePath = (await RNFS.stat(mediaObj.uri)).originalFilepath;
    console.log('Going to process File : ' + filePath);
  } catch (e) {
    console.log('Error::VideoProcessing::Unable to get File path');
    console.log(e);
    console.log('Trying to Fix this issue');

    try {
      const destPath = `${RNFS.TemporaryDirectoryPath}/temp`;
      await RNFS.copyFile(mediaObj.uri, destPath);
      filePath = (await RNFS.stat(destPath)).originalFilepath;
      console.log('Going to process File : ' + filePath);
    } catch (err) {
      console.log('-------------Fix failed----------');
      console.log(err);
    }
  }

  return filePath;
};

const calcSplits = (duration, splitDuration = 30) => {
  duration = parseInt(duration, 10);
  let splits = parseInt(duration / splitDuration, 10);
  if (duration % splitDuration !== 0) {
    splits += 1;
  }

  return splits;
};

// Function to split videos
const splitVideoBatch = async (data, file, outputDir, setProgress, quality) => {
  let {batchSize, splitDuration, timeLeft, id} = data;
  let partsProcessed = 0;

  RNFFmpegConfig.disableLogs();

  while (timeLeft > 0 && batchSize > 0) {
    const period = Math.min(splitDuration, timeLeft);
    const outputFile = `${outputDir}/${id}.mp4`;

    const from = splitDuration * (id - 1);
    const params = Qualities[quality];
    const command = `-ss ${from} -i "${file}" -t ${period} ${params} ${outputFile}`;

    partsProcessed += 1;
    console.log(`Processing part ${partsProcessed}/${batchSize}`);

    await RNFFmpeg.executeAsync(command, completedExecution => {
      if (completedExecution.returnCode === 0) {
        console.log('FFmpeg process completed successfully');
      } else {
        console.log(
          `FFmpeg process failed with rc=${completedExecution.returnCode}.`,
        );
      }

      partsProcessed -= 1;
      console.log(`Completed part ${batchSize - partsProcessed}/${batchSize}`);

      setProgress(prevState => {
        const totalProgress = Math.min(90, prevState + data.tickSize);
        console.log('Total Progress : ' + totalProgress);
        return totalProgress;
      });
    });

    timeLeft -= period;
    id += 1;
    batchSize -= 1;
  }

  // Wait for completion
  while (partsProcessed !== 0) {
    await sleep(500);
  }

  return {timeLeft, id};
};

const setupWorkingDirectory = async RNFS => {
  try {
    await RNFS.mkdir(getWorkingDirectory());
    return getWorkingDirectory();
  } catch (e) {
    console.log('Fatal Error Setting up Folder');
  }
};

const getNewOutputDirName = async (RNFS, workingDir) => {
  const files = await RNFS.readdir(workingDir);
  console.log('Files are -> ');
  console.log(files);

  let maxNum = 0;
  for (let i of files) {
    const num = parseInt(i, 10);
    if (num && num > maxNum) {
      maxNum = num;
    }
  }

  maxNum += 1;

  await RNFS.mkdir(workingDir + '/' + maxNum);
  return workingDir + '/' + maxNum;
};

const generateThumbnailsForSplits = (
  splitCount,
  outputDir,
  setProgress,
  tickSize,
) => {
  for (let i = 1; i <= splitCount; i++) {
    console.log('Generating thumb for ' + i);
    genThumbnail(
      `${outputDir}/${i}.mp4`,
      outputDir,
      i + '.png',
      setProgress,
      tickSize,
    );
  }
};

const genThumbnail = (
  filePath,
  outputDir,
  outputFileName,
  setProgress,
  tickSize,
) => {
  const command = `-i ${filePath} -ss 00:00:01.000 -vframes 1 ${outputDir}/${outputFileName}`;

  RNFFmpeg.executeAsync(command, completedExecution => {
    if (completedExecution.returnCode === 0) {
      console.log('Made video tumbnail');
    } else {
      console.log(
        `Thumbnail failed: FFmpeg process failed with rc=${completedExecution.returnCode}.`,
      );
    }

    setProgress(prevState => {
      const totalProgress = prevState + tickSize;
      console.log('Total Progress : ' + totalProgress);
      return totalProgress;
    });
  });
};
