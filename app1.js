import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from "react-navigation";

const App = () => <AppContainer />;

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen,
  SignUpScreen,
});

const AppSwitchNavigator = createSwitchNavigator({
  LoginStackNavigator,
  HomeScreen,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
