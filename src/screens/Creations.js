import React from 'react';
import {StyleSheet, View} from 'react-native';
import CreationsList from '../components/CreationsList';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import {COLORS} from '../styles/Global';

const Creations = ({navigation}) => {
  return (
    <View style={styles.root}>
      <HeaderWithBackButton title="Creations" navigation={navigation} />
      <CreationsList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

export default Creations;
