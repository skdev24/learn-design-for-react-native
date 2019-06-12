import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import { Icon } from 'expo';
import MyWebView from 'react-native-webview-autoheight';
import showdown from 'showdown';

import defaultHTML from '../utils/defaultHTML';

const { width } = Dimensions.get('window');

const converter = new showdown.Converter();

const styles = StyleSheet.create({
  closeView: {
    width: 32,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  caption: {
    fontSize: 17,
    color: 'white',
    width: 300,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    width: 170,
    position: 'absolute',
    top: 78,
    left: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cover: {
    height: 375,
  },
  container: {
    flex: 1,
  },
});

const htmlStyles = `
    * {
      font-family: -apple-system, Roboto;
      margin: 0;
      padding: 0;
      font-size: 17px;
      font-weight: normal;
      color: #3c4560;
      line-height: 24px;
    }
    h2 {
      font-size: 20px;
      text-transform: uppercase;
      color: #b8bece;
      font-weight: 600;
      margin-top: 50px;
    }

    p {
      margin-top: 20px;
    }

    a {
      color: #4775f2;
      font-weight: 600;
      text-decoration: none;
    }

    strong {
      font-weight: 700;
    }
    img {
      width: 100%;
      border-radius: 10px;
      margin-top: 20px;
    }
    pre {
      padding: 20px;
      background: #212C4F;
      overflow: hidden;
      word-wrap: break-word;
      border-radius: 10px;
      margin-top: 20px;
    }

    code {
      color: white;
    }
`;

export default class SectionScreen extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam('section');
    console.log('section', section);

    const markdownToHtml = converter.makeHtml(section.content);

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar hidden />
        <View style={styles.cover}>
          <Image style={styles.image} source={{ uri: section.image }} />
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              top: 40,
              left: 40,
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={{ uri: section.logo }}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: 'rgba(255,255,255,0.8)',
                marginLeft: 5,
                textTransform: 'uppercase',
              }}
            >
              {section.subtitle}
            </Text>
          </View>
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.caption}>{section.caption}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeView}
        >
          <Icon.Ionicons
            name="ios-close"
            size={36}
            color="#4775f2"
            style={{ marginTop: -2 }}
          />
        </TouchableOpacity>
        <View>
          <MyWebView
            style={{
              width: width - 30,
              alignSelf: 'center',
              marginBottom: 50,
              marginTop: 10,
            }}
            source={{
              html: defaultHTML
                .replace('$body', markdownToHtml)
                .replace('$pureCSS', htmlStyles),
            }}
            scalesPageToFit={false}
            scrollEnabled={false}
            startInLoadingState
            ref="webview"
            onNavigationStateChange={event => {
              if (event.url.includes('http') && !event.url.includes('<html>')) {
                this.refs.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
