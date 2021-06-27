import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {LinearProgress} from 'react-native-elements';
import {COLORS} from '../styles/Global';

const ProgressOverlay = ({isVisible, percentage}) => {
  percentage = Math.max(percentage, 5);
  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.root}>
      <View>
        <Text style={styles.title}>Processing...</Text>
        <LinearProgress
          variant="determinate"
          value={percentage / 100}
          color="black"
        />
        <Text style={styles.percentage}>{parseInt(percentage, 10) + '%'}</Text>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.primary,
    width: 300,
  },
  percentage: {
    color: 'white',
    textAlign: 'right',
    marginTop: 4,
  },
  title: {
    color: 'white',
    marginBottom: 5,
  },
});

export default ProgressOverlay;
