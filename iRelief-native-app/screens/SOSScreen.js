import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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
 
            self.setState({
                counter: count.length == 1 ? '0'+count : count,
                miliseconds: num.length == 1 ? '0'+num : num
            });
        }, 0);
        console.log("Before setSTate: " + timer);
        //this.setState({timer : time});
        //console.log("After setSTate: " + timer);
    }

    onButtonStart() {
        console.log("Button Pressed");
        this.start();
        //this.setState({startDisabled: true, stopDisabled: false});
    }
 
    onButtonStop() {
        console.log("Button Released");
        console.log("Timer before clear: " + timer);
        clearInterval(timer);
        this.setState({counter: '00', miliseconds: '00'});
        //this.setState({startDisabled: false, stopDisabled: true});
    }

  _renderTimer(){
    return(
      <View style={styles.container}>
        <Text style={styles.timer}>{this.state.counter}.{this.state.miliseconds}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
          {this._renderTimer()}
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
