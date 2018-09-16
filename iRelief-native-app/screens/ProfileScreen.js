import React from 'react';
import { Alert, Text, TextInput, View, SafeAreaView, ImageBackground, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Button } from 'react-native-elements';
import styles from ".././styles/styles";
import * as firebase from "firebase";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 1,
      shadowOpacity: 1
    }
  };

  state = {
      firstname: '',
      lastname: '',
      reg: false,
    }

    componentWillMount()   
    {
    }

    buttonPress()
    {
        this.setState({"reg":true})
        console.log(this.state.reg)
    }

    buttonPress2()
    {
        firebase.auth().signInWithEmailAndPassword(this.state.firstname, this.state.lastname)
      .then(function(firebaseUser) {
          Alert.alert("Succesfully logged in")
      })
      .catch(function(error) {
          Alert.alert(
            'Alert',
            'Unable to login with those credentials',
            [
              {text: 'Go back', onPress: () => {this.state.reg = false}},
              {text: 'Sign up', onPress: () => this.signup()},
            ],
            { cancelable: false }
          )       
     });
    }

    signup() 
    {
        Alert.alert('Create account called')

        firebase.auth().createUserWithEmailAndPassword(this.state.firstname, this.state.lastname).catch(function(error) {
            // Handle Errors here.
            Alert.alert('Error occurred while registering.')
            // ...
          });
          
        var user = firebase.auth().currentUser;

        if (user) {
        // User is signed in.
            Alert.alert('Succesfully created account and signed in'); 
        }            
    }

    render() {
        const reg = this.state.reg;
        let firstname = null;
        let lastname = null;

        let prof = null;
        let fname = null;
        let lname = null;
        let button = null;
        let img = null;
        let signup = null;

        if(reg)
        {
            firstname = 
            <TextInput 
                style={myStyles.input}
                placeholder = 'Email...'
                underlineColorAndroid = 'transparent'
                autoCapitalize = 'none'
                placeholderTextColor = 'rgba(0,0,0,.5)'
                onChangeText = {(firstname) => this.setState({ "firstname": firstname })}
                value = {this.state.firstname}
          /> 
          lastname = 
          <TextInput 
              style={myStyles.input}
              placeholder = 'Password...'
              underlineColorAndroid = 'transparent'
              autoCapitalize = 'none'
              placeholderTextColor = 'rgba(0,0,0,.5)'
              onChangeText = {(lastname) => this.setState({ "lastname": lastname })}
              value = {this.state.lastname}
            />
            signup =
                <Button
                    title= 'Sign Up' 
                    buttonStyle={styles.button}
                    textStyle={styles.btnText}
                    onPress={() => null}
                />

        } else
        {
          prof = <Text style={styles.text}>Profile</Text>
          fname = <Text style={styles.text}> Liam McMains </Text>
          lname = <Text style={styles.text}> liam@mcmains.net </Text>            
          img = 
          <Image
            source={require('../assets/matthew.png')}
              style={{width: 150, height: 150}}
          />
        }

        button =
                <Button
                    title= {this.state.reg ? "Login" : "Sign In" } 
                    buttonStyle={styles.button}
                    textStyle={styles.btnText}
                    onPress={() => {reg ? this.buttonPress2() : this.buttonPress()}}
                />

        return (
        <ImageBackground 
        source={require('../assets/bkg_texture.png')}
        style={myStyles.container}>
   
            <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
            {prof}
            {img}
            {fname}
            {lname}
            
            
            {firstname}
            {lastname}
    
    
            {button}
            {signup}
            </View>
    

         </ImageBackground>
        );
    }
  }

const myStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    input: {
        margin: 15,
        height: 40,
        width: 200,
        padding: 8,
        borderColor: 'gray',
        color: 'rgba(0,0,0,.8)',
        borderWidth: 1
     },   
  });