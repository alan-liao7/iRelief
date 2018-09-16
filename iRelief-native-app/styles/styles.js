import React from 'react';
import { StyleSheet } from 'react-native';
import { Font } from 'expo'

export default styles = StyleSheet.create({
    container: {
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    },
    headertitle: {
      textAlign: 'center',
      fontSize: 20,
      marginLeft: 15,
      fontFamily: 'mainFont',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 0,
      fontFamily: 'mainFont',
    },
    cardtext: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'mainFont',
    },
    cardtitle: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
      fontFamily: 'mainFont',
    },
    paraText: {
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'mainFont',
      marginBottom: 5
    },
    activeTitle: {
      color: 'red',
    },
    btnText: {
        color: '#ffffff',
        fontFamily: 'mainFont',
    },
    oldbutton: {
      backgroundColor: 'transparent',
      borderRadius: 3,
      borderWidth: 0.5,
      borderColor: '#03a9f4',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#03A9F4',
      borderRadius: 3, 
      marginLeft: 0, 
      marginRight: 0, 
      marginBottom: 10,
    },
    cardButton: {
      backgroundColor: '#03A9F4',
      borderRadius: 3, 
      marginLeft: 0, 
      marginRight: 0, 
      marginBottom: 5,
    },
    containerStyle: {borderColor: 'transparent', borderRadius: 6, elevation: 2, shadowOpacity: 0.5},
    miniHeader: {borderColor: 'transparent', backgroundColor: '#81c784', borderRadius: 0, elevation: 0, shadowOpacity: 0.0},
  });