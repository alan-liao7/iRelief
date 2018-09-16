import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { Constants,Font } from 'expo';

// You can import from local files
//import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // 0.19.1

var timer = 0;

export default class App extends React.Component {
      
    state = {
      //timer: null,
        counter: '00',
        miliseconds: '00',
        status: false
    }
    constructor( props ) {
        super( props );
 
        this.onButtonStart = this.onButtonStart.bind(this);
        this.onButtonStop = this.onButtonStop.bind(this);
    }

    componentDidMount() {
      //this.start();
    }

    componentWillUnmount() {
      clearInterval(timer);
    }
 
    start() {
        var self = this;
        timer = setInterval(() => {
            var num = (Number(this.state.miliseconds) + 1).toString(),
                count = this.state.counter;
 
            if( Number(this.state.miliseconds) == 99 ) {
                count = (Number(this.state.counter) + 1).toString();
                num = '00';
            }

            if( Number(this.state.counter) >= 1) {
              self.setState({status: true});
              console.log(this.state.status);
            }
 
            self.setState({
                counter: count.length == 1 ? '0'+count : count,
                miliseconds: num.length == 1 ? '0'+num : num
            });
        }, 0);
        //this.setState({timer : time});
        //console.log("After setSTate: " + timer);
    }

    onButtonStart() {
        this.start();
        console.log("Button pressed");
        //this.setState({startDisabled: true, stopDisabled: false});
    }
 
    onButtonStop() {
        console.log("Button released");
        clearInterval(timer);
        if( Number(this.state.counter) >= 1) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("Latitude: "+ position.coords.latitude + "; Longitude: " + position.coords.longitude);
            });
        }
        Alert.alert(
          'Success',
          'You have notified the nearest first responder!',
          [
            //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')}
          ],
          { cancelable: false }
        )
        this.setState({counter: '00', miliseconds: '00', status: false});
        //this.setState({startDisabled: false, stopDisabled: true});
    }

  _renderTimer(){
    return(
      <View style={styles.container}>
        <Text style={styles.timer}>{this.state.counter}.{this.state.miliseconds}</Text>
      </View>
    );
  }

  _renderMsg(){
    console.log(this.state.status);
    return(
      <View style={styles.container}>
        <Text style={styles.msg}>{this.state.status ? ("Release the button to send your location!") : ""}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
            {this._renderTimer()}
            {this._renderMsg()}
            <TouchableWithoutFeedback style={styles.btn_wrapper}
              onPressIn={this.onButtonStart}
              onPressOut={this.onButtonStop}>
              <View style={styles.btn_1}>
                <Text style={styles.btn_text}>Emergency Level 4</Text>
              </View>
            </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback style={styles.btn_wrapper}
              onPressIn={this.onButtonStart}
              onPressOut={this.onButtonStop}>
              <View style={styles.btn_1}>
                <Text style={styles.btn_text}>Emergency Level 3</Text>
              </View>
            </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback style={styles.btn_wrapper}
              onPressIn={this.onButtonStart}
              onPressOut={this.onButtonStop}>
              <View style={styles.btn_1}>
                <Text style={styles.btn_text}>Emergency Level 2</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.btn_wrapper}
              onPressIn={this.onButtonStart}
              onPressOut={this.onButtonStop}>
              <View style={styles.btn_1}>
                <Text style={styles.btn_text}>Emergency Level 1</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  btn_wrapper:{
    flex: 1,
  },
  msg:{
    flex: 1,
    fontsize: 45,
    fontWeight: 'bold',
    color: 'green'    
  },
  btn_1:{
    radius: 12,
    flex: 1,
    backgroundColor: '#ED6555',
    height: 100,
    width: 250,
    shadowOffset: { width: 0, height: 5 },
    fontsize: 10,
    letterspacing: 10,
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text:{
    fontSize: 20,
  },
  timer: {
    flex: 1,
    fontSize: 72,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});
