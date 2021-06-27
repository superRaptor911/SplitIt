import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const styles = StyleSheet.create({
  root: {
    marginLeft: 20,
    marginRight: 20,
  },

  line: {
    borderWidth: 1,
    borderColor: 'rgba(232, 232, 232, 0.3)',
    borderStyle: 'solid',
    marginBottom: 50,
  },

  textWhite: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 45,
    letterSpacing: 1,
  },

  icon: {
    width: 32,
  },
});

const HeaderWithBackButton = ({title, navigation}) => {
  return (
    <View style={styles.root}>
      <Icon
        name="chevron-back"
        type="ionicon"
        onPress={() => navigation.goBack()}
        color="#FFFFFF"
        size={32}
        containerStyle={styles.icon}
        style={styles.icon}
      />
      <Text style={styles.textWhite}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default HeaderWithBackButton;
