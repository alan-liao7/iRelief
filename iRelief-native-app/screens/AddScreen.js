import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
  ImageEditor,
  ImageStore,
  Alert
} from "react-native";
import firebase from "../consts/firebase.js";
import { ImagePicker, Permissions } from "expo";
import moment from "moment";
import { Overlay } from "react-native-router-flux";

export default class AddScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 1,
      shadowOpacity: 1
    }
  };

  state = {
    title: "",
    desc: "",
    selected: "Choose Category",
    image: null,
    address: "",
    imageData: "",
    overlayVisible: false
  };

  constructor(props) {
    super(props);
    data = [
      "Choose Category",
      "Sanitary Products",
      "Canned Food & Water",
      "Clothes & Shoes",
      "Misc."
    ];

    console.ignoredYellowBox = ["Setting a timer"];
  }

  handleOverlayToggle = () => {
    console.log("Toggling overlay.");
    this.setState({ overlayVisible: !this.state.overlayVisible });
  };

  async componentWillMount() {}

  renderItems() {
    items = [];
    for (let item of data) {
      items.push(<Picker.Item key={item} label={item} value={item} />);
    }
    return items;
  }

  addListing(listing) {
    console.log("Adding listing...");

    let imgData = this.state.imageData;

    var db = firebase.database();

    db.ref("listings")
      .push(listing)
      .then(randomID => {
        Alert.alert("Succesfully created new donation item.");
        this.handleOverlayToggle();
        return true;
      })
      .catch(err => {
        Alert.alert(
          "Unable to create a donation. We're not sure what the issue is."
        );
        return false;
      });
  }

  onPressButton() {
    console.log("press button pressed.");

    let { title, desc, selected, address, imageData } = this.state;

    project = {
      title: title,
      description: desc,
      category: selected,
      address: address,
      imgData: imageData,
      dataCreated: moment().toISOString()
    };

    this.addListing(project);
  }

  clearFields = () => {
    this.setState({
      title: "",
      address: "",
      description: "",
      selected: "Choose Category",
      imageData: "",
      image: null,
      overlayVisible: false
    });
  };

  render() {
    let { image } = this.state;
    return (
      <ImageBackground
        source={require("../assets/bkg.jpg")}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Donate an Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholderTextColor="rgba(0,0,0,.5)"
            onChangeText={title => this.setState({ title: title })}
            value={this.state.title}
          />
          <TextInput
            style={styles.input}
            placeholder="Pick-Up Address"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholderTextColor="rgba(0,0,0,.5)"
            onChangeText={address => this.setState({ address: address })}
            value={this.state.address}
          />
          <TextInput
            multiline
            style={styles.multilineinput}
            placeholder="Description"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholderTextColor="rgba(0,0,0,.5)"
            onChangeText={desc => this.setState({ desc: desc })}
            value={this.state.desc}
          />

          <Picker
            selectedValue={this.state.selected}
            onValueChange={value => this.setState({ selected: value })}
            pickerStyleType={{
              margin: 10,
              padding: 8,
              flex: 1,
              width: 200,
              height: 100,
              borderColor: "gray"
            }}
            textStyle={{
              fontFamily: "Raleway"
            }}
            itemTextStyle={{
              fontFamily: "Raleway"
            }}
            style={{
              width: 320,
              alignSelf: "center",
              margin: 10,
              padding: 8,
              backgroundColor: "rgba(10,10,10,.2)",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5
            }}
            enabled={true}
          >
            {this.renderItems()}
          </Picker>

          {
            <TouchableOpacity
              style={styles.submitButton}
              color="transparent"
              onPress={this._pickImage}
            >
              <Text style={styles.submitButtonText}>
                Choose an Image For The Item
              </Text>
            </TouchableOpacity>
          }
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 200,
                height: 100,
                alignSelf: "center"
              }}
            />
          )}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              console.log("Pressed.");
              this.onPressButton();
            }}
          >
            <ImageBackground
              source={require("../assets/buttonBack.jpg")}
              style={{
                
                margin: 0
              }}
            >
              <Text style={styles.submitButtonText}> Donate Item </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <Overlay
          isVisible={this.state.overlayVisible}
          windowBackgroundColor="red"
          width="200"
          height="300"
          onBackdropPress={this.clearFields}
        />
      </ImageBackground>
    );
  }
  _pickImage = async () => {
    this.setState.bind(this);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      ImageEditor.cropImage(
        result.uri,
        {
          size: { width: result.width, height: result.height },
          offset: { x: 0, y: 0 }
        },
        imageURI => {
          ImageStore.getBase64ForTag(
            imageURI,
            base64Data => {
              // base64Data contains the base64string of the image
              this.setState({ imageData: base64Data });
            },
            reason => console.error(reason)
          );
        },
        reason => console.error(reason)
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent"
  },
  input: {
    fontFamily: "Raleway",
    margin: 15,
    height: 40,
    padding: 8,
    borderColor: "gray",
    borderRadius: 3,
    color: "rgba(0,0,0,.8)",
    backgroundColor: "rgba(10,10,10,.1)",
    borderWidth: 1
  },
  multilineinput: {
    fontFamily: "Raleway",
    margin: 15,
    height: 60,
    borderRadius: 3,
    padding: 8,
    borderColor: "gray",
    color: "rgba(0,0,0,.8)",
    backgroundColor: "rgba(10,10,10,.1)",
    borderWidth: 1
  },
  submitButton: {
    borderColor: "gray",
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: "rgba(10,10,10,.3)",
    padding: 10,
    margin: 15,
    height: 40
  },
  title: {
    backgroundColor: "transparent",
    padding: 10,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "Raleway"
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    width: "100%",
    padding: "auto",
    fontFamily: "Raleway"
  }
});
