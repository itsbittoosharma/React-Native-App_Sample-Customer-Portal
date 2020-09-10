import React, { Children } from "react";
import PropTypes from "prop-types";
import colors from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
const AllCount = ({ color, type, ...props }) => (
  <View>
    <Text style={{ color: color }}>{props.allArray.allArray.length || 0}</Text>
  </View>
);
const mapStateToProps = (state) => {
  return {
    allArray: state.allArray,
  };
};
AllCount.defaultProps = {
  color: colors.txtPlaceholder,
};
AllCount.prototypes = {
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(AllCount);
