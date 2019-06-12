import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  subTitle: {
    color: '#b8bece',
    fontWeight: '600',
    fontSize: 15,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  caption: {
    color: '#3c4560',
    fontSize: 20,
    fontWeight: '600',
  },
  wrapper: {
    marginLeft: 10,
  },
  logo: {
    width: 44,
    height: 44,
  },
  content: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    width: 170,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cover: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
  },
  container: {
    backgroundColor: 'white',
    width: 315,
    height: 280,
    borderRadius: 14,
    marginVertical: 25,
    marginHorizontal: 20,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 10,
  },
});

const Card = ({ title, image, logo, caption, subtitle }) => (
  <View style={styles.container}>
    <View style={styles.cover}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.content}>
      <Image style={styles.logo} source={{ uri: logo }} />
      <View style={styles.wrapper}>
        <Text style={styles.caption}>{caption}</Text>
        <Text style={styles.subTitle}>{subtitle.toUpperCase()}</Text>
      </View>
    </View>
  </View>
);

export default Card;
