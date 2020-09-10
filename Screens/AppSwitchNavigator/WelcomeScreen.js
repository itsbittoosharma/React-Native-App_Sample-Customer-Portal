import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import colors from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";
import CustButtons from "../../components/CustButtons";
import { TextInput } from "react-native-gesture-handler";
import * as firebase from "firebase/app";
import "firebase/auth";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  onSignIn = async () => {
    if (this.state.email && this.state.password) {
      try {
        this.setState({ isLoading: true });
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        if (response) {
          this.setState({ isLoading: false });
          this.props.navigation.navigate("LoadingScreen");
        }
      } catch (error) {
        if (error) this.setState({ isLoading: false });
        switch (error.code) {
          case "auth/user-not-found":
            alert("User Not Found");
            this.setState({ isLoading: false });
            break;
          case "auth/invalid-email":
            alert("Invalid Email");
            this.setState({ isLoading: false });
            break;
          default:
            alert(error.code);
            this.setState({ isLoading: false });
            break;
        }
      }
    } else {
      this.setState({ isLoading: false });
      alert("Please Enter Email and Password");
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 1,
            position: "absolute",
            marginTop: 30,
            marginLeft: 5,
            height: 25,
            width: 25,
          }}
        >
          {this.state.isLoading ? (
            <View
              style={{
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                elevation: 1000,
              }}
            >
              <ActivityIndicator
                size="large"
                color={colors.markasread}
              ></ActivityIndicator>
            </View>
          ) : null}
        </View>
        <View
          style={{
            borderColor: "transparent",

            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Ionicons
            name="ios-bookmarks"
            size={150}
            style={{ paddingTop: 80, paddingBottom: 20 }}
            color="#73c4ed"
          />
        </View>
        <KeyboardAvoidingView
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <TextInput
            style={{
              height: 55,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "grey",
              backgroundColor: "white",
              width: 300,
              marginTop: 30,

              fontSize: 20,
              paddingLeft: 15,
            }}
            keyboardType="email-address"
            placeholder="Email ID"
            onChangeText={(TextInputValue) =>
              this.setState({ email: TextInputValue })
            }
            placeholderTextColor="grey"
          ></TextInput>
          <TextInput
            style={{
              height: 55,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "grey",
              backgroundColor: "white",
              width: 300,
              marginTop: 30,

              fontSize: 20,
              paddingLeft: 15,
            }}
            secureTextEntry
            onChangeText={(TextInputValue) =>
              this.setState({ password: TextInputValue })
            }
            placeholder="Password"
            placeholderTextColor="grey"
          ></TextInput>
        </KeyboardAvoidingView>
        <View style={{ alignItems: "center", paddingTop: 50 }}>
          <CustButtons
            title="Login"
            fontstyle={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            ///  =====>>>></View> //   onPress={() => this.props.navigation.navigate("HomeScreen")}
            onPress={this.onSignIn.bind(this)}
            style={{
              textShadowColor: "black",
              textShadowColor: "#000",
              textShadowOffset: { width: 1, height: 1 },
              height: 50,
              width: 250,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#73c4ed",
              borderColor: "transparent",
              marginBottom: 10,
              borderWidth: 0,
            }}
          ></CustButtons>
          <CustButtons
            title="Register"
            fontstyle={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            style={{
              height: 50,
              width: 250,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#026ca2",
              borderColor: "transparent",
              marginBottom: 10,
              borderWidth: 0,
            }}
            onPress={() => this.props.navigation.navigate("SignUpScreen")}
          ></CustButtons>
          <Text
            style={{
              fontSize: 15,
              //  fontWeight: "bold",
              color: "#00000059",
              //    paddingBottom: 40,
              paddingTop: 80,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            @itsbittoosharma
          </Text>
        </View>
      </View>
    );
  }
}
