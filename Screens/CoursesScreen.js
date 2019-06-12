import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class CoursesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> CoursesScreen </Text>
      </View>
    );
  }
}
