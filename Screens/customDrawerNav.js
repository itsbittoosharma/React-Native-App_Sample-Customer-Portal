import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform
} from 'react-native';

import { DrawerItems } from 'react-navigation';
import colors from '../assets/colors';
import { Ionicons } from '@expo/vector-icons';
class customDrawerNav extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: '#05688f'}} />
        <View style={{height:30, backgroundColor:'#05688f'}}>

        </View>
        <View
          style={{
            
              
            height: 180,
            backgroundColor: '#05688f',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: Platform.OS == 'android' ? 20 : 0
          }}
        >
          <Ionicons name="ios-bookmarks" size={100} color={colors.logoColor} />
          <Text style={{ fontSize: 24, color: 'white',marginTop:10,marginBottom:20, fontWeight: '100' }}>
            Customer Portal
          </Text>
        </View>
        <DrawerItems {...this.props} />
      </ScrollView>
    );
  }
}
export default customDrawerNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
