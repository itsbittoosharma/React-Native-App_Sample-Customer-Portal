import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  GlobalStyles,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CustButtons = ({title, children, onPress, style, fontstyle }) => (
  <View style={{ flexDirection: "row" }}>
    <TouchableOpacity onPress={onPress}>
    
      <View style={style}><Text style={fontstyle}>{title}</Text>{children}</View>
    </TouchableOpacity>
  </View>
);



export default CustButtons;
