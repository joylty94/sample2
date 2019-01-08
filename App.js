import * as Expo from "expo";
import React, { Component } from "react";
import { View, Text } from 'react-native';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import rootReducer from './ducks';

import LoginScreen from './screen/LoginScreen';
import InformationScreen from './screen/InformationScreen';
import TabScreen from './screen/TabScreen';
import SearchScreen from './screen/SearchScreen';
import AlarmScreen from './screen/AlarmScreen';
import ProfileScreen from './screen/ProfileScreen';
import DetailScreen from './screen/DetailScreen';
import WebviewScreen from './screen/WebviewScreen';
import WritingScreen from './screen/WritingScreen';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: TabScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    Alarm: {
      screen: AlarmScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: "Home"
  }
);

const AppNavigator = createStackNavigator(
  {
    // Login: {
    //   screen: LoginScreen,
    //   navigationOptions: () => {
    //     header = null;
    //     return { header }
    //   }
    // },
    Information: InformationScreen,
    Detail: {
      screen: DetailScreen,
      navigationOptions: () => {
        header = null;
        return { header }
      },
    },
    Webview: {
      screen: WebviewScreen,
      // navigationOptions: () => {
      //   header = null;
      //   return { header }
      // },
    },
    Writing: {
      screen: WritingScreen,
      // navigationOptions: () => {
      //   header = null;
      //   return { header }
      // },
    },
    TabNavigator: {
      screen: TabNavigator,
      headerMode: 'none',
      navigationOptions: () => {
        header = null;
        return { header }
      },
    },
  },
  {
    initialRouteName: "Information"
  }
);

const AppContainer = createAppContainer(AppNavigator);

store = createStore(rootReducer, applyMiddleware(thunk));

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
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
  }
}

