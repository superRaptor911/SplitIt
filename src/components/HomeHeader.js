import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const HomeHeader = ({navigation}) => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textWhite}>Split</Text>
          <Text style={styles.textRed}>It</Text>
        </View>
        <Icon
          name="menu"
          color="white"
          size={32}
          onPress={() => {
            navigation.push('About');
          }}
        />
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  line: {
    borderWidth: 1,
    borderColor: 'rgba(232, 232, 232, 0.3)',
    borderStyle: 'solid',
    marginBottom: 90,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
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
  textRed: {
    color: 'red',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 45,
  },
});

export default HomeHeader;
