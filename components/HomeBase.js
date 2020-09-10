import React from "react";
import { StyleSheet, Text, View, SafeAreaView, GlobalStyles, TextInput } from "react-native";


const HomeBase =({title,active})=>(

        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{ fontSize:15}}>{title}</Text>
        <Text>{active}</Text>
        </View>     
    
);
export default HomeBase;

