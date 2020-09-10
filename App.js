import React from "react";
import { Provider } from "react-redux";
import AllCount from "./redux/containers/AllCount";
import HistCount from "./redux/containers/HistCount";

import ActCount from "./redux/containers/ActCount";
import store from "./redux/store/index";
import SignUpScreen from "./Screens/AppStackNavigator/SignUpScreen";
import CustButtons from "./components/CustButtons";
import WelcomeScreen from "./Screens/AppSwitchNavigator/WelcomeScreen";
import { Ionicons } from "@expo/vector-icons";
import Settings from "./Screens/Settings";
import HomeScreen from "./Screens/HomeScreen";
import AllScreen from "./Screens/AllScreen";
import HistoryScreen from "./Screens/HistoryScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import customDrawerNav from "./Screens/customDrawerNav";
import {
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
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
  _Text,
} from "react-native";
import colors from "./assets/colors";
import Store from "./redux/store/index";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";
import { Colors } from "react-native/Libraries/NewAppScreen";

class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const LoginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    SignUpScreen: {
      screen: SignUpScreen,
      navigationOptions: {},
    },
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#73c4ed",
      },
    },
  }
);

const HomeTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Active Complaints",
        tabBarIcon: ({ tintColor }) => (
          <ActCount color={tintColor} type="activeArray"></ActCount>
        ),
      },
    },
    HistoryScreen: {
      screen: HistoryScreen,
      navigationOptions: {
        tabBarLabel: "Completed",
        tabBarIcon: ({ tintColor }) => (
          <HistCount color={tintColor} type="historyArray"></HistCount>
        ),
      },
    },
    AllScreen: {
      screen: AllScreen,
      navigationOptions: {
        tabBarLabel: "All Records",
        tabBarIcon: ({ tintColor }) => (
          <AllCount color={tintColor} type="allArray"></AllCount>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingBottom: 8,

        borderTopWidth: 0.8,
        backgroundColor: colors.markasread,
        height: 55,
      },
      activeTintColor: colors.logoColor,

      activeFontWeight: "bold",
      inactiveTintColor: "white",
      //  activeBackgroundColor:'#1f3965',
    },
    labelStyle: {
      fontSize: 50,
    },
    tabStyle: {
      fontSize: 10,
    },
  }
);

HomeTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  switch (routeName) {
    case "HomeScreen":
      return {
        headerTitle: "Active Complaints",
        headerTitleStyle: {
          flex: 1,
          color: "white",
          alignItems: "center",
          marginRight: 53,
          justifyContent: "center",
          textAlign: "center",
        },
        headerStyle: {
          backgroundColor: colors.markasread,
          color: colors.primary,
        },
      };
    case "AllScreen":
      return {
        headerTitle: "All Records/Complaints",
        headerTitleStyle: {
          flex: 1,
          size: 10,
          color: "white",
        },
        headerStyle: {
          backgroundColor: colors.markasread,
          color: colors.primary,
        },
      };
    case "HistoryScreen":
      return {
        headerTitle: "Previous/Completed Records",
        headerTitleStyle: {
          flex: 1,
          color: "white",
          alignItems: "center",
          marginRight: 53,
          justifyContent: "center",
          textAlign: "center",
        },
        headerStyle: {
          backgroundColor: colors.markasread,
          color: colors.primary,
        },
      };
    default:
      return {
        headerTitle: "Customer Portal",
      };
  }
};

// HomeTabNavigator.navigationOptions = ({ navigation }) => {
//   if (navigation.state.routes[navigation.state.index] == "HomeScreen") {
//     return { headerTitle: "Books" };
//   }
// };

const HomeTabStack = createStackNavigator({
  HomeTabNavigator: {
    screen: HomeTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            name="ios-menu"
            size={31}
            style={{
              marginLeft: 12,
              position: "relative",
              color: colors.logoColor,
            }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      };
    },
  },
});

const HomeDrawer = createDrawerNavigator(
  {
    // HomeScreen: {
    //   screen: HomeScreen,
    //   navigationOptions: {
    //     title: "Home",
    //     drawerIcon: () => <Ionicons name="ios-home" size={24} color="black" />,
    //   },
    // }
    HomeTabStack: {
      screen: HomeTabStack,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <Ionicons name="ios-home" size={25} />,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: "Settings",
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />,
      },
    },
  },
  {
    contentComponent: customDrawerNav,
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  HomeDrawer,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
