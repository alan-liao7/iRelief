import React from "react";
import {
  Alert,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  WebView,
  Linking
} from "react-native";
import { SearchBar } from "react-native-elements";
import { find } from "../consts/google";

export default class SearchScreen extends React.Component {
  componentWillMount() {}

  state = {
    lastSearch: "",
    content: "",
    makeWebViewVisible: false
  };

  handleSearch = () => {
    console.log("Setting makeWebViewVisible to be true");
    this.setState({ makeWebViewVisible: true });
  };

  handleQueryChange = text => {
    console.log(`Setting the lastSearch to ${text}.`);
    this.setState({ lastSearch: text });
  };

  render() {
    let query = this.state.lastSearch;
    const uri = `https://www.google.com/search?q=${query}`;

    let visible = this.state.makeWebViewVisible;

    if (visible) {
      return (
        <WebView
          ref={ref => {
            this.webview = ref;
          }}
          source={{ uri }}
          onNavigationStateChange={event => {
            if (event.url !== uri) {
              this.webview.stopLoading();
              Linking.openURL(event.url);
            }
          }}
        />
      );
    } else {
      return (
        <ImageBackground
          source={require("../assets/bkg.jpg")}
          style={myStyle.container}
        >
          <SearchBar
            placeholder="Search for a service..."
            searchIcon={{ size: 24 }}
            onChangeText={this.handleQueryChange}
            lightTheme
            round
            onSubmitEditing={this.handleSearch}
          />
        </ImageBackground>
      );
    }
  }
}

var myStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
