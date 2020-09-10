import { StatusBar } from "expo-status-bar";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { snapshotToArray } from "../helpers/firebase";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  SafeAreaView,
  GlobalStyles,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";
import HomeBase from "../components/HomeBase";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import CustButtons from "../components/CustButtons";
import CustButtons1 from "../components/CustButtons";
import colors from "../assets/colors";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0,
      history: 0,
      all: 0,
      currentUser: {},
      showTextField: false,
      Holder: "",
      allArray: [],
      activeArray: [],
      historyArray: [],
    };
  }
  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    const currentUserData = await firebase
      .database()
      .ref("Complaints")
      .child(user.uid)
      .once("value");

    console.log(user);
    const Complaints = await firebase
      .database()
      .ref("Complaints")
      .child(user.uid)
      .once("value");
    console.log(Complaints);
    const ComplaintsArray = snapshotToArray(Complaints);

    this.setState({
      currentUser: currentUserData.val(),
      allArray: ComplaintsArray,
      activeArray: ComplaintsArray.filter((a) => !a.read),
      historyArray: ComplaintsArray.filter((a1) => a1.read),
    });
    console.log(ComplaintsArray);
  };
  markAsRead = (selected, index) => {
    let newList = this.state.activeArray.filter((a1) => a1 !== selected);
    this.state.historyArray.push(
      this.state.activeArray.filter((a1) => a1 == selected)
    );
    console.log(this.state.historyArray);
    console.log("Utkarsh");
    this.setState((prevState) => ({
      activeArray: newList,
    }));
  };

  renderItem = (item, index) => (
    <View style={{ height: 50, flexDirection: "row" }}>
      <View
        style={{
          flex: 1,
          paddingLeft: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>{item.issue}</Text>
      </View>

      <TouchableOpacity onPress={() => this.markAsRead(item, index)}>
        <View
          style={{
            height: 50,
            width: 100,

            justifyContent: "center",
            backgroundColor: colors.markasread,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Mark As Completed
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  AddItemsToArray = async () => {
    try {
      const key = await firebase
        .database()
        .ref("users")
        .child(this.state.currentUser.uid)
        .push().key;

      const response = await firebase
        .database()
        .ref("Complaints")
        .child(this.state.currentUser.uid)
        .child(key)
        .set({ issue: this.state.Holder, read: false });
    } catch (error) {
      console.log(error);
    }

    //Adding Items To Array.
    //  this.setState(  {showTextField: false });
    //   if (this.state.Holder.toString() != "") {
    //     this.state.allArray.push(this.state.Holder.toString());
    //     this.state.activeArray.push(this.state.Holder.toString());
    //     this.setState({ Holder: "" });

    //     this.setState({ active: this.state.active + 1 });
    //     this.setState({ all: this.state.all + 1 });
    //   }

    this.setState((state, props) => ({
      allArray: [...state.allArray, { issue: this.state.Holder, read: false }],
      activeArray: [
        ...state.activeArray,
        { issue: this.state.Holder, read: false },
      ],
      showTextField: false,
    }));

    // Showing the complete Array on Screen Using Alert.
    console.log(this.state.allArray);
  };
  newEntry = () => {
    this.setState({ showTextField: true });
  };

  closenewEntry = () => {
    this.setState({ showTextField: false });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: 48,
            alignItems: "center",
            height: 90,
            borderBottomColor: "grey",
            borderBottomWidth: 0.8,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Customer Portal
          </Text>
        </View>
        <View style={{ flex: 1, borderBottomColor: "grey" }}>
          {this.state.showTextField == true && (
            <View
              style={{
                height: 50,
                flexDirection: "row",
                borderBottomWidth: 0.5,
              }}
            >
              <TextInput
                onChangeText={(TextInputValue) =>
                  this.setState({ Holder: TextInputValue })
                }
                style={{
                  flex: 1,
                  backgroundColor: colors.txtholder,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
                placeholder="Enter Request"
                placeholderTextColor="grey"
              ></TextInput>

              <TouchableOpacity onPress={this.AddItemsToArray.bind(this)}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    height: 50,
                    width: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.ok,
                  }}
                >
                  <Text></Text>
                  <Ionicons name="ios-checkmark" size={40} color="white" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.closenewEntry.bind(this)}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    width: 50,
                    backgroundColor: colors.close,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text></Text>
                  <Ionicons name="ios-close" size={40} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={this.state.activeArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>No Records Found</Text>
              </View>
            }
          />

          <TouchableOpacity
            onPress={this.newEntry}
            style={{ position: "absolute", bottom: 20, right: 20 }}
          >
            <View
              style={{
                backgroundColor: colors.primary,
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, color: "white" }}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            height: 65,
            borderTopColor: "grey",
            borderTopWidth: 0.5,
          }}
        >
          <HomeBase title="Active" active={this.state.activeArray.length} />
          <HomeBase title="History" active={this.state.historyArray.length} />
          <HomeBase title="All" active={this.state.allArray.length} />
        </View>
      </View>
    );
  }
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: "red",
  },
});
