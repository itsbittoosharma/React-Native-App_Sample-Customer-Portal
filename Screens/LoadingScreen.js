import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";

import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

import { TextInput } from "react-native-gesture-handler";
export default class LoadingScreen extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeScreen", { user });
      } else {
        this.props.navigation.navigate("LoginStackNavigator");
      }
    });
  };
  componentWillUnmount = () => {
    this.unsubscribe();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <ActivityIndicator
          size={"large"}
          color={colors.logoColor}
        ></ActivityIndicator>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 25,
            marginTop: 20,
          }}
        >
          Loading....PLease Wait
        </Text>
      </View>
    );
  }
}
