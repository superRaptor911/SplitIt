import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {COLORS} from '../styles/Global';

const QualitySelectOverlay = ({isVisible, setQuality}) => {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.root}
      onBackdropPress={() => {
        setQuality('none');
      }}>
      <View>
        <Button
          title="Fast"
          buttonStyle={styles.buttons}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            setQuality('fast');
          }}
        />
        <Button
          title="High Precision"
          buttonStyle={styles.buttons}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            setQuality('highp');
          }}
        />
        <View style={styles.space} />
        <Text style={styles.text}>* Fast is recommended</Text>
        <Text style={styles.text}>* Quality is same </Text>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.primary,
    width: 300,
  },
  buttons: {
    backgroundColor: COLORS.secondary,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
  space: {
    marginTop: 10,
  },
});

export default QualitySelectOverlay;
