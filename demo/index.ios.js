/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainScreen from './mainScreen';

export default class chartdemo extends Component {
  render() {
    return (
      <MainScreen style={styles.container}>
      </MainScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('chartdemo', () => chartdemo);
