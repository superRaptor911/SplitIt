import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import {COLORS} from '../styles/Global';

const AboutPage = ({navigation}) => {
  return (
    <View style={styles.root}>
      <HeaderWithBackButton title="About" navigation={navigation} />
      <Text style={styles.text}>
        Our app helps whatsapp users to convert large videos to a perfect 30
        second cuts which can be easily shared saved or posted as whatsapp
        status...
      </Text>

      <View style={styles.space} />
      <Text
        style={styles.linkText}
        onPress={() => {
          Linking.openURL('https://github.com/superRaptor911/SplitIt');
        }}>
        This application is free and open source.
      </Text>

      <Text style={styles.title}>Devs</Text>
      <Text style={styles.text}>Aditya Aravind (Programming).</Text>
      <Text style={styles.text}>Syam Suresh (UI Design).</Text>

      <View style={styles.space} />
      <View style={styles.box}>
        <Text style={styles.boxText}>Version 1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  text: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    fontSize: 16,
    fontWeight: '300',
  },
  space: {
    marginTop: 30,
  },
  title: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
    textDecorationLine: 'underline',
    color: '#FFFFFF',

    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    marginTop: 30,
    marginBottom: 10,
  },
  linkText: {
    color: 'lightblue',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    fontSize: 16,
    fontWeight: '300',
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderTopLeftRadius: 8.5,
    borderTopRightRadius: 8.5,
    borderBottomRightRadius: 8.5,
    borderBottomLeftRadius: 8.5,
    width: 240,
    marginLeft: 10,
    marginTop: 10,
  },
  boxText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
    textDecorationLine: 'underline',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 10,
  },
  donationText: {
    color: 'lightblue',
    fontWeight: '300',
    textAlign: 'right',
    marginRight: 8,
    marginBottom: 5,
  },
});

export default AboutPage;
