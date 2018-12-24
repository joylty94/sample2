import * as Expo from "expo";
import React, { Component } from "react";
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from './screen/LoginScreen';
import InformationScreen from './screen/InformationScreen';
import TabScreen from './screen/TabScreen';
import SearchScreen from './screen/SearchScreen';
import AlarmScreen from './screen/AlarmScreen';
import ProfileScreen from './screen/ProfileScreen'
import GeolocationScreen from './screen/GeolocationScreen';

const LoginNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: () => {
        header = null;
        return { header }
      }
    },
    Information: InformationScreen
  },
  {
    initialRouteName: "Login"
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: TabScreen,
      navigationOptions: () => {
        header = null;
        return { header }
      },
    },
      Search: {
      screen: SearchScreen,
      navigationOptions: () => {
        header = null;
        return { header }
      },
    },
    Alarm: {
      screen: AlarmScreen,
      navigationOptions: () => {
        header = null;
        return { header }
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => {
        header = null;
        return { header }
      },
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <Expo.AppLoading />;
    } else
      return (
        <AppContainer />
      );
  }
}

