import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

function getCourseWidth(screenWidthValue) {
  let cardWidth = screenWidthValue - 40;
  if (screenWidthValue >= 768) {
    cardWidth = (screenWidthValue - 60) / 2;
  }
  if (screenWidthValue >= 1024) {
    cardWidth = (screenWidthValue - 80) / 3;
  }
  return cardWidth;
}

const styles = StyleSheet.create({
  subTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    fontSize: 15,
    width: 240,
    textTransform: 'uppercase',
    marginLeft: 20,
  },
  author: {
    color: '#b8bece',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  caption: {
    color: '#3c4560',
    fontSize: 14,
    fontWeight: '500',
  },
  wrapper: {
    marginLeft: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  logo: {
    position: 'absolute',
    top: 90,
    width: 48,
    height: 48,
    alignSelf: 'center',
  },
  content: {
    paddingLeft: 20,
    paddingRight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 20,
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
    height: 260,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    width: screenWidth - 40,
    height: 335,
    borderRadius: 14,
    marginVertical: 20,
    marginHorizontal: 10,
    left: 10,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 10,
    alignSelf: 'center',
  },
});

class Course extends Component {
  state = {
    cardWidth: getCourseWidth(screenWidth),
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.adaptLayout);
  }

  adaptLayout = dimensions => {
    this.setState({
      cardWidth: getCourseWidth(dimensions.window.width),
    });
  };

  render() {
    const {
      title,
      image,
      logo,
      caption,
      subtitle,
      avatar,
      author,
    } = this.props;
    const { cardWidth } = this.state;
    return (
      <View style={[styles.container, { width: cardWidth }]}>
        <View style={styles.cover}>
          <Image style={styles.image} source={image} />
          <Image style={styles.logo} source={logo} resizeMode="contain" />

          <Text style={styles.subTitle}>{subtitle}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.content}>
          <Image style={styles.avatar} source={avatar} />
          <View style={styles.wrapper}>
            <Text style={styles.caption}>{caption}</Text>
            <Text style={styles.author}>Taught by {author}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Course;
