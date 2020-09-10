import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../assets/colors";
import * as firebase from "firebase/app";
import "firebase/auth";
import LoadingScreen from "./LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import WelcomeScreen from "./AppSwitchNavigator/WelcomeScreen";

export default class Settings extends React.Component {
  signOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("LoadingScreen");
    } catch (error) {
      alert("Error");
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.markasreadlight,
        }}
      >
        <TouchableOpacity onPress={this.signOut.bind(this)}>
          <View
            style={{
              width: 150,
              backgroundColor: colors.logoColor,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
