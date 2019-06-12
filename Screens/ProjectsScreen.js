import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class ProjectsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> ProjectsScreen </Text>
      </View>
    );
  }
}
