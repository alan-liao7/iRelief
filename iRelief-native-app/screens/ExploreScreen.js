import React from "react";
import {
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  Image
} from "react-native";
import { ListItem, List, SearchBar } from "react-native-elements";
import firebase from "../consts/firebase.js";
import _ from "lodash";

export default class ExploreScreen extends React.Component {
  componentWillMount() {
    this.loadListingData();
  }

  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];
  }

  static navigationOptions = {
    title: "Explore",
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4
    }
  };

  state = {
    listings: [],
    fullData: [],
    loading: false,
    drawOverlay: false,
    overlayItem: null,
    searchQuery: ""
  };

  loadListingData() {
    this.setState({
      loading: true
    });

    firebase
      .database()
      .ref("listings/")
      .on("value", snapshot => {
        let count = 0;
        snapshot.forEach(element => {
          this.setState({
            listings: [...this.state.listings, element.toJSON()]
          });
        });
        this.setState({
          fullData: this.state.listings,
          loading: false
        });
      });
  }

  renderFooter() {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  }

  toggleOverlay = () => {
    this.setState({ drawOverlay: !this.state.drawOverlay });
  };

  setOverlayItem = item => {
    this.setState({ overlayItem: item });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={this.handleSearch}
      />
    );
  };

  handleSearch = text => {
    text = text.toLowerCase();
    console.log(`Changing search query to ${text}`);
    const data = _.filter(this.state.fullData, item => {
      return item.description.includes(text) || item.title.includes(text);
    });

    if (text.trim() === "") {
      this.setState({ searchQuery: text, listings: this.state.fullData });
    } else {
      this.setState({ searchQuery: text, listings: data });
    }
  };

  render() {
    if (!this.state.drawOverlay) {
      return (
        <View>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.listings}
              childrenStyle={{ backgroundColor: "transparent" }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.toggleOverlay();
                    this.setOverlayItem(item);
                  }}
                >
                  <ListItem
                    roundAvatar
                    title={item.title}
                    subtitle={item.description}
                    containerStyle={{ borderBottomWidth: 0 }}
                    avatar={{
                      uri: "data:image/jpg;base64," + item.imgData
                    }}
                  />
                </TouchableOpacity>
              )}
              ListHeaderComponent={this.renderHeader}
              keyExtractor={item => item.dataCreated}
              ItemSeparatorComponent={this.renderFooter}
            />
          </List>
        </View>
      );
    } else {
      let item = this.state.overlayItem;
      let desc = item.description;
      let address = item.address;
      let category = item.category;
      let imgData = item.imgData;
      let itemName = item.title;
      return (
        <ImageBackground
          source={require("../assets/bkg.jpg")}
          style={styles.container}
        >
          <TouchableOpacity
            style={{ width: "100%", height: "100%" }}
            onPress={() => {
              this.toggleOverlay();
              this.setOverlayItem(null);
            }}
          >
            <Text style={styles.topTitle}> Item category: </Text>
            <Text style={styles.boxInput}> {category} </Text>
            <Text style={styles.title}> Item Name: </Text>
            <Text style={styles.boxInput}> {itemName} </Text>
            <Text style={styles.title}> Item Description: </Text>
            <TextInput
              multiline
              style={styles.multilineinput}
              placeholder={desc}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholderTextColor="rgba(0,0,0,.5)"
              onChangeText={desc => this.setState({ desc: desc })}
              value={this.state.desc}
            />
            <Text style={styles.title}> Pick-up Address: </Text>
            <Text style={styles.boxInput}> {address} </Text>
            <Image
              source={{ uri: "data:image/jpg;base64," + imgData }}
              style={{ width: 250, height: 120, alignSelf: "center" }}
            />
          </TouchableOpacity>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  boxInput: {
    margin: 15,
    height: 40,
    padding: 8,
    borderColor: "gray",
    color: "#585858",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center"
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  topTitle: {
    backgroundColor: "transparent",
    fontSize: 24,
    paddingTop: 15,
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "2%",
    padding: 0,
    textAlign: "center",
    borderBottomWidth: 1,
    color: "#D04032",
    borderRadius: 5
  },
  title: {
    borderRadius: 5,
    backgroundColor: "transparent",
    fontSize: 24,
    marginLeft: "20%",
    marginRight: "20%",
    textAlign: "center",
    borderBottomWidth: 1,
    color: "#D04032"
  },
  input: {
    margin: 15,
    height: 40,
    padding: 8,
    borderColor: "gray",
    color: "rgba(0,0,0,.8)",
    borderWidth: 1
  },
  multilineinput: {
    margin: 15,
    height: 60,
    padding: 8,
    borderColor: "gray",
    color: "rgba(0,0,0,.8)",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center"
  },
  submitButton: {
    position: "absolute",
    backgroundColor: "gray",
    padding: 10,
    width: 80,
    margin: 15,
    height: 80,
    top: 0,
    right: 0
  },
  submitButtonText: {
    color: "white",
    textAlign: "center"
  }
});
