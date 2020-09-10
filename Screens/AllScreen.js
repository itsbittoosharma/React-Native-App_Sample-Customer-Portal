import { StatusBar } from "expo-status-bar";
import React from "react";
import { connect } from "react-redux";

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
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import HomeBase from "../components/HomeBase";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import CustButtons from "../components/CustButtons";
import CustButtons1 from "../components/CustButtons";
import colors from "../assets/colors";

class AllScreen extends React.Component {
  // markAsRead = async (selected, index) => {
  //   try {
  //     await firebase
  //       .database()
  //       .ref("Complaints")
  //       .child(this.state.currentUser.uid)
  //       .child(selected.key)
  //       .update({ read: true });

  //     this.props.markAsRead(selected);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   let temp = this.state.allArray.map((a2) => {
  //     if (a2.issue == selected.issue) return { ...a2, read: true };

  //     return a2;
  //   });
  //   let newList = this.state.activeArray.filter(
  //     (a1) => a1.issue !== selected.issue
  //   );

  //   this.setState((prevState) => ({
  //     activeArray: newList,
  //     historyArray: [
  //       ...prevState.historyArray,
  //       { issue: selected.issue, read: true },
  //     ],
  //     allArray: temp,
  //   }));
  // };

  renderItem = (item, index) => (
    <View style={{ height: 60, flexDirection: "row" }}>
      <View
        style={{
          minHeight: 50,
          backgroundColor: "#628fef0f",
          borderBottomLeftRadius: 20,
          borderBottomWidth: 0.6,

          borderWidth: 0.3,
          marginLeft: 5,
          borderTopLeftRadius: 0,
          borderColor: "grey",
          marginTop: 5,
          flex: 1,
          paddingLeft: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>{item.issue}</Text>
      </View>
      <View style={{ height: 50, backgroundColor: "blue" }}></View>

      {item.read ? (
        <View
          style={{
            flexDirection: "column",
            height: 55,
            width: 100,
            marginTop: 5,
            borderTopRightRadius: 20,
            marginRight: 5,
            borderBottomRightRadius: 20,

            backgroundColor: colors.markasread,
            alignItems: "center",
          }}
        >
          <Ionicons
            style={{ flex: 1 }}
            name="ios-checkmark"
            size={55}
            color={colors.logoColor}
          />
        </View>
      ) : (
        <View
          style={{
            height: 55,
            borderTopRightRadius: 20,
            marginRight: 5,
            borderBottomRightRadius: 20,
            width: 100,
            marginTop: 5,
            justifyContent: "center",
            backgroundColor: colors.markasread,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            In Progress
          </Text>
        </View>
      )}
    </View>
  );

  AddItemsToArray = async () => {
    if (this.state.Holder.toString() != "") {
      try {
        const key = await firebase
          .database()
          .ref("records")
          .child(this.state.currentUser.uid)
          .push().key;

        const response = await firebase
          .database()
          .ref("Complaints")
          .child(this.state.currentUser.uid)
          .child(key)
          .set({ issue: this.state.Holder, read: false });

        this.props.addRecord({
          issue: this.state.Holder,
          read: false,
          key: key,
        });
      } catch (error) {
        console.log(error);
      }

      //Adding Items To Array.
      // this.setState({ showTextField: false });
      // if (this.state.Holder.toString() != "") {
      //   this.state.allArray.push(this.state.Holder.toString());
      //   this.state.activeArray.push(this.state.Holder.toString());
      //   this.setState({ Holder: "" });

      //   this.setState({ active: this.state.active + 1 });
      //   this.setState({ all: this.state.all + 1 });
      // }
      this.setState((state, props) => ({
        // allArray: [
        //   { issue: this.state.Holder, read: false },
        //   ...state.allArray,
        // ],
        // activeArray: [
        //   { issue: this.state.Holder, read: false },
        //   ...state.activeArray,
        // ],
        // showTextField: false,
      }));
      console.log("yes");
      // Showing the complete Array on Screen Using Alert.
      console.log(this.state.allArray);
    } else {
      // this.setState({ showTextField: false });
    }
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
        {/* <View
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
        </View> */}
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {/* {this.state.showTextField == true && (
            <Animatable.View
              duration={560}
              animation="fadeIn"
              style={{
                marginTop: 4,
                height: 50,
                backgroundColor: "transparent",
                flexDirection: "row",
                position: "relative",
              }}
            >
              <TextInput
                onChangeText={(TextInputValue) =>
                  this.setState({ Holder: TextInputValue })
                }
                style={{
                  flex: 1,
                  height: 50,
                  backgroundColor: colors.txtholder,
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderRightWidth: 0,
                  marginLeft: 4,
                  marginBottom: 2,
                  borderTopWidth: 1,
                  borderLeftWidth: 1.2,
                  borderBottomWidth: 1,
                  borderBottomLeftRadius: 25,
                  borderTopLeftRadius: 25,
                }}
                placeholder="Enter Request"
                placeholderTextColor="grey"
              ></TextInput>

              <TouchableOpacity onPress={this.AddItemsToArray.bind(this)}>
                <View
                  style={{
                    flex: 1,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,

                    flexDirection: "row",
                    height: 90,
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
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    alignItems: "center",
                    borderBottomRightRadius: 25,
                    borderTopRightRadius: 25,
                    borderRightWidth: 1.2,
                    marginRight: 4,
                    justifyContent: "center",
                  }}
                >
                  <Text></Text>
                  <Ionicons name="ios-close" size={40} color="white" />
                </View>
              </TouchableOpacity>
            </Animatable.View>
          )} */}
          <View>
            {/* {this.state.showLoading == true && (
              <ActivityIndicator
                style={{ marginTop: 40 }}
                size={"large"}
                color={colors.markasread}
              ></ActivityIndicator>
            )} */}
          </View>
          <FlatList
            data={this.props.allArray.allArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            ListEmptyComponent={
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>No Records Found</Text>
              </View>
            }
          ></FlatList>

          <TouchableOpacity
            onPress={this.newEntry}
            style={{ position: "absolute", bottom: 20, right: 20 }}
          >
            <View
              style={{
                backgroundColor: "hsl(359, 100%, 70%)",
                height: 50,
                width: 50,
                borderWidth: 0.8,
                borderColor: "white",
                shadowOffset: 2,
                shadowOpacity: 2,
                shadowColor: "black",
                borderRadius: 25,

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, color: "white" }}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View
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
        </View> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allArray: state.allArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBooks: (allArray) =>
      dispatch({ type: "LOAD_BOOKS_FROM_SERVER", payload: allArray }),
    markAsRead: (book) => dispatch({ type: "MARK_AS_READ", payload: book }),
    addRecord: (book) => dispatch({ type: "ADD_RECORD", payload: book }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllScreen);
//export default HomeScreen;
//export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: "red",
  },
});
