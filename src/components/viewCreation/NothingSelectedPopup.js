import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {COLORS} from '../../styles/Global';

const NothingSelectedPopup = ({isVisible, setIsVisible}) => {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.root}
      onBackdropPress={() => {
        setIsVisible(false);
      }}>
      <View>
        <Text style={styles.title}>Please Select at least 1 item</Text>
        <Button
          title="OK"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          onPress={() => {
            setIsVisible(false);
          }}
        />
      </View>
    </Overlay>
  );
};

export default NothingSelectedPopup;

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.primary,
    width: 300,
  },
  percentage: {
    color: 'white',
    marginTop: 4,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    width: 70,
  },
  button: {
    backgroundColor: COLORS.secondary,
  },
});
