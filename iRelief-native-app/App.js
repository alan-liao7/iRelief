import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import AddScreen from "./screens/AddScreen";
import SearchScreen from "./screens/SearchScreen";

var offwhite = "#ff9999";
var iconsize = 30;

var MainNav = TabNavigator(
  {
    Tab1: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-home" : "ios-home-outline"}
            size={iconsize}
            style={{ color: focused ? "gray" : offwhite }}
          />
        ),
        tabBarLabel: "Home"
      }
    },
    Tab2: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-search" : "ios-search-outline"}
            size={iconsize}
            style={{ color: focused ? "gray" : offwhite }}
          />
        ),
        tabBarLabel: "Explore"
      }
    },
    Tab3: {
      screen: AddScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-add" : "ios-add-outline"}
            size={iconsize}
            style={{ color: focused ? "gray" : offwhite }}
          />
        ),
        tabBarLabel: "Add"
      }
    },
    Tab4: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-people" : "ios-people-outline"}
            size={iconsize}
            style={{ color: focused ? "gray" : offwhite }}
          />
        ),
        tabBarLabel: "Search"
      }
    }
  },
  {
    tabBarPosition: "top",
    swipeEnabled: true,
    tabBarOptions: {
      activeBackgroundColor: "white",
      inactiveBackgroundColor: "white",
      inactiveTintColor: "black",
      indicatorStyle: {
        backgroundColor: "green"
      },
      style: {
        backgroundColor: "white",
        height: 50
      },
      iconStyle: {
        width: 45,
        height: 35,
        margin: 0,
        padding: 0
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: "gray"
    }
  }
);

export default MainNav;
