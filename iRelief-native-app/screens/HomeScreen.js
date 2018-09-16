import React from "react";
import {
  Alert,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  Text
} from "react-native";
import HTML from "react-native-render-html";
import Expo from "expo";

const htmlContent = `<!DOCTYPE html>
<html>
<head>
	<title>Home</title>
</head>
<body>

<h1 class="Heading">Welcome to iRelief</h1>
<h3 class="SubHeading">About iRelief</h3>
<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<h3 class="SubHeading">Our Team</h3>
<ul class="content">
	<li>Aneesh Saripalli</li>
	<li>Alan Liao</li>
	<li>Sandeep Namburi</li>
	<li>Karan Kumar</li>
</ul>

<h3 class="SubHeading">About Us</h3>
<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<a href="https://facebook.com"><img src="/images/Facebook-Round-Shape-300x300.png" class="Thumbnail"></a>
<a href="https://github.com/alan-liao7/iRelief"><img src="/images/github-512.png" class="Thumbnail"></a>
<a href="https://twitter.com"></a><img src="/images/twitter-black-png-2.png" class="Thumbnail"></a>

</body>
</html>`;

export default class HomeScreen extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Raleway: require("../assets/Raleway-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    let font = this.state.fontLoaded ? { fontFamily: "Raleway" } : {};

    let classesStyles = {
      content: {
        letterSpacing: 12,
        lineHeight: 12,
        fontSize: 12,
        marginTop: "0%",
        marginRight: "10%",
        marginBottom: "0%",
        marginLeft: "10%",
        color: "black"
      },
      Heading: {
        borderBottomColor: "#d04032",
        borderBottomWidth: 2,
        textAlign: "center",
        padding: 2,
        fontSize: 36,
      },
      SubHeading: {
        fontWeight: "600",
        fontSize: 24,
        padding: 2,
        borderBottomWidth: 1
      }
    };

    return (
      <ImageBackground
        source={require("../assets/bkg.jpg")}
        style={myStyle.container}
      >
        <ScrollView style={{ flex: 1 }}>
          <HTML
            html={htmlContent}
            imagesMaxWidth={Dimensions.get("window").width}
            classesStyles={classesStyles}
            tagStyles={classesStyles}
          />

          <Text style={font} Hey there fucker />
        </ScrollView>
      </ImageBackground>
    );
  }
}

var myStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
