import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  Easing,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';

import { contentfulClient } from '../App';
import Card from '../components/Card';
import { NotificationIcon } from '../components/Icons';
import Logo from '../components/Logo';
import Course from '../components/Course';
import Menu from '../components/Menu';
import Avatar from '../components/Avatar';

const styles = StyleSheet.create({
  loadingViewCard: {
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
    justifyContent: 'center',
  },
  subtitle: {
    color: '#b8bece',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 20,
    marginTop: 20,
    textTransform: 'uppercase',
  },
  titleBar: {
    width: '100%',
    marginTop: 50,
    paddingLeft: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f3f5',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

const logos = [
  {
    image: require('../assets/logo-framerx.png'),
    text: 'Framer X',
  },
  {
    image: require('../assets/logo-figma.png'),
    text: 'Figma',
  },
  {
    image: require('../assets/logo-studio.png'),
    text: 'Studio',
  },
  {
    image: require('../assets/logo-react.png'),
    text: 'React',
  },
  {
    image: require('../assets/logo-swift.png'),
    text: 'Swift',
  },
  {
    image: require('../assets/logo-sketch.png'),
    text: 'Sketch',
  },
];

const cards = [
  {
    title: 'React Native for Designers',
    image: require('../assets/background11.jpg'),
    subtitle: 'React Native',
    caption: '1 of 12 sections',
    logo: require('../assets/logo-react.png'),
  },
  {
    title: 'Styled Components',
    image: require('../assets/background12.jpg'),
    subtitle: 'React Native',
    caption: '2 of 12 sections',
    logo: require('../assets/logo-react.png'),
  },
  {
    title: 'Props and Icons',
    image: require('../assets/background13.jpg'),
    subtitle: 'React Native',
    caption: '3 of 12 sections',
    logo: require('../assets/logo-react.png'),
  },
  {
    title: 'Static Data and Loop',
    image: require('../assets/background14.jpg'),
    subtitle: 'React Native',
    caption: '4 of 12 sections',
    logo: require('../assets/logo-react.png'),
  },
];

const courses = [
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 sections',
    image: require('../assets/background13.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'Meng To',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Design and interactive prototype',
  },
  {
    title: 'React for Designers',
    subtitle: '12 sections',
    image: require('../assets/background11.jpg'),
    logo: require('../assets/logo-react.png'),
    author: 'Meng To',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Learn to design and code a React site',
  },
  {
    title: 'Design and Code with Framer X',
    subtitle: '10 sections',
    image: require('../assets/background14.jpg'),
    logo: require('../assets/logo-framerx.png'),
    author: 'Meng To',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Create powerful design and code components for your app',
  },
  {
    title: 'Design System in Figma',
    subtitle: '10 sections',
    image: require('../assets/background6.jpg'),
    logo: require('../assets/logo-figma.png'),
    author: 'Meng To',
    avatar: require('../assets/avatar.jpg'),
    caption:
      'Complete guide to designing a site using a collaborative design tool',
  },
];

function mapStateToProps(state) {
  return {
    action: state.action,
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: 'OPEN_MENU',
      }),
  };
}

class HomeScreen extends React.Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    cards: [],
    isLoading: false,
  };

  async componentWillMount() {
    this.setState({
      isLoading: true,
    });
    try {
      const response = await contentfulClient.getEntries({
        content_type: 'cards',
      });
      let cardsArray = response.items;
      if (cards.length > 1) {
        cardsArray = response.items.sort((a, b) => {
          if (parseInt(a.fields.caption[0]) < parseInt(b.fields.caption[0])) {
            return -1;
          }
          if (parseInt(a.fields.caption[0]) > parseInt(b.fields.caption[0])) {
            return 1;
          }
          return 0;
        });
        console.log('cardsArray', cardsArray);
      }

      this.setState({
        cards: cardsArray,
        isLoading: false,
      });
      console.log('content', response.items);
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      console.log(error);
    }
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);

    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('light-content', true);
    }
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    const {
      props: { action },
      state: { scale, opacity },
    } = this;
    if (action === 'openMenu') {
      Animated.timing(scale, {
        duration: 300,
        toValue: 0.9,
        easing: Easing.in(),
      }).start();
      Animated.spring(opacity, {
        toValue: 0.5,
      }).start();
      StatusBar.setBarStyle('light-content', true);
    }
    if (action === 'closeMenu') {
      Animated.timing(scale, {
        duration: 300,
        toValue: 1,
        easing: Easing.in(),
      }).start();
      Animated.spring(opacity, {
        toValue: 1,
      }).start();
      StatusBar.setBarStyle('dark-content', true);
      if (Platform.OS === 'android') {
        StatusBar.setBarStyle('light-content', true);
      }
    }
  };

  render() {
    const {
      props: { openMenu, name, navigation },
      state: { scale, opacity, cards, isLoading },
    } = this;
    const containerScale = {
      transform: [
        {
          scale,
        },
      ],
    };
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <Menu />
        <Animated.View style={[styles.container, containerScale, { opacity }]}>
          <SafeAreaView>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 22,
              }}
            >
              <View style={styles.titleBar}>
                <Avatar openMenu={openMenu} name={name} />
                <NotificationIcon
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 5,
                  }}
                />
              </View>
              <ScrollView
                horizontal
                style={{
                  flexDirection: 'row',
                  paddingVertical: 20,
                  paddingRight: 20,
                  paddingLeft: 12,
                  paddingTop: 30,
                }}
                contentContainerStyle={{
                  paddingRight: 20,
                }}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((item, index) => (
                  <Logo key={index} text={item.text} image={item.image} />
                ))}
              </ScrollView>
              <Text style={styles.subtitle}>
                {`Continue learning`.toUpperCase()}
              </Text>
              <ScrollView
                horizontal
                style={{
                  paddingBottom: 30,
                  flexDirection: 'row',
                }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: 20,
                }}
              >
                {isLoading ? (
                  <View style={styles.loadingViewCard}>
                    <ActivityIndicator
                      style={{
                        alignSelf: 'center',
                      }}
                      size="large"
                      color="#0000ff"
                    />
                  </View>
                ) : (
                  cards.map((item, index) => {
                    const {
                      title,
                      image: {
                        fields: {
                          file: { url },
                        },
                      },
                      caption,
                      logo,
                      content,
                      subtitle,
                    } = item.fields;

                    const cardsItem = {
                      title: title.content[0].content[0].value,
                      caption,
                      subtitle,
                      image: `https:${url}`,
                      logo: `https:${logo.fields.file.url}`,
                      content,
                    };

                    return (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() =>
                          navigation.push('Section', {
                            section: cardsItem,
                          })
                        }
                      >
                        <Card
                          title={cardsItem.title}
                          image={cardsItem.image}
                          caption={cardsItem.caption}
                          logo={cardsItem.logo}
                          subtitle={cardsItem.subtitle}
                        />
                      </TouchableOpacity>
                    );
                  })
                )}
              </ScrollView>
              <Text style={styles.subtitle}>
                {`Popular courses`.toUpperCase()}
              </Text>
              <ScrollView
                style={{
                  paddingBottom: 30,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {courses.map((item, index) => (
                    <Course
                      key={index}
                      title={item.title}
                      image={item.image}
                      logo={item.logo}
                      author={item.author}
                      avatar={item.avatar}
                      subtitle={item.subtitle}
                      caption={item.caption}
                    />
                  ))}
                </View>
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
