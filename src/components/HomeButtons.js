import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../styles/Global';

const HomeButtons = ({
  navigation,
  setVideoSelected,
  loadVideo,
  setSelectedVideo,
}) => {
  return (
    <View>
      <Text style={styles.title}>Create</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              loadVideo(setVideoSelected, setSelectedVideo);
            }}>
            <Image source={require('../media/images/GALLERY.png')} />
          </TouchableOpacity>
          <Text style={styles.iconText}>Gallery</Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Creations')}>
            <Image source={require('../media/images/CREATIONS.png')} />
          </TouchableOpacity>
          <Text style={styles.iconText}>Creations</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: '#E8E8E8',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  buttonContainer: {
    backgroundColor: COLORS.secondary,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
  },

  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    marginTop: 15,
    marginBottom: 'auto',
  },
  iconText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 4,

    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#FFFFFF',
  },
});

export default HomeButtons;
