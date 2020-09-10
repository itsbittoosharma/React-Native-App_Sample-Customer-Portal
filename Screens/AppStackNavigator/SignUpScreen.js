import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import LoadingScreen from "../LoadingScreen";
import colors from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";
import CustButtons from "../../components/CustButtons";
import { TextInput } from "react-native-gesture-handler";
export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      mobile: "",
      password: "",
      isLoading: false,
    };
  }

  onSignUp = async () => {
    if (
      this.state.email &&
      this.state.password &&
      this.state.name &&
      this.state.mobile
    ) {
      try {
        this.setState({ isLoading: true });

        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );

        if (response) {
          this.setState({ isLoading: false });

          this.props.navigation.navigate("LoadingScreen");
          const user = await firebase
            .database()
            .ref("users/")
            .child(response.user.uid)
            .set({
              Name: this.state.name,
              mobile: this.state.mobile,
              email: response.user.email,
              uid: response.user.uid,
            });
        }
      } catch (error) {
        this.setState({ isLoading: false });
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("User Already Registered, \n Go Back and try to Login");
            break;
          case "auth/invalid-email":
            alert("Invalid Email");
            break;
          case "auth/invalid-password":
            alert("Password must be strong");
            break;
        }
      }
    } else if (this.state.name.length < 3) {
      alert("Please enter your Full Name");
    } else if (this.state.mobile.length < 11) {
      alert("Please enter a valid Contact Number");
    } else if (this.state.password.length < 7) {
      alert("Please enter a STRONG PASSWORD");
    } else {
      this.setState({ isLoading: false });
      alert("Check all details and retry later");
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Ionicons
            name="ios-bookmarks"
            size={150}
            style={{ paddingTop: 80, paddingBottom: 20 }}
            color="#73c4ed"
          /> */}
          {/* <Text style={{ fontSize: 40, color: "white" }}>Customer Portal</Text> */}
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TextInput
            onChangeText={(TextInputValue) =>
              this.setState({ name: TextInputValue })
            }
            style={{
              height: 50,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "grey",
              backgroundColor: "white",
              width: 300,
              marginTop: 30,

              fontSize: 20,
              paddingLeft: 15,
            }}
            placeholder="Name"
            placeholderTextColor="grey"
          ></TextInput>
          <TextInput
            onChangeText={(TextInputValue) =>
              this.setState({ mobile: TextInputValue })
            }
            style={{
              height: 50,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "grey",
              backgroundColor: "white",
              width: 300,
              marginTop: 10,

              fontSize: 20,
              paddingLeft: 15,
            }}
            keyboardType="number-pad"
            placeholder="Contact Number"
            placeholderTextColor="grey"
          ></TextInput>
          <TextInput
            style={{
              height: 50,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "grey",
              backgroundColor: "white",
              width: 300,
              marginTop: 10,

              fontSize: 20,
              paddingLeft: 15,
            }}
            placeholder="Email ID"
            placeholderTextColor="grey"
            onChangeText={(TextInputValue) =>
              this.setState({ email: TextInputValue })
            }
            keyboardType="email-address"
          ></TextInput>
          <TextInput
            style={{
              height: 50,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "grey",
              backgroundColor: "white",
              width: 300,
              marginTop: 10,

              fontSize: 20,
              paddingLeft: 15,
            }}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="grey"
            onChangeText={(TextInputValue) =>
              this.setState({ password: TextInputValue })
            }
          ></TextInput>
        </View>
        <View style={{ flex: 0.2, alignItems: "center" }}>
          <CustButtons
            title="Register"
            fontstyle={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            style={{
              textShadowColor: "black",
              textShadowColor: "#000",
              textShadowOffset: { width: 1, height: 1 },
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
            onPress={this.onSignUp.bind(this)}
          ></CustButtons>
        </View>
      </View>
    );
  }
}
