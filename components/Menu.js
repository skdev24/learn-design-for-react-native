import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';

const { height, width } = Dimensions.get('window');

const screenWidth = width;

let cardWidth = screenWidth;

if (screenWidth > 500) {
  cardWidth = 500;
}

function mapStateToProps(state) {
  return {
    action: state.action,
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: 'CLOSE_MENU',
      }),
  };
}

const styles = StyleSheet.create({
  closeView: {
    position: 'absolute',
    top: 120,
    zIndex: 200,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 22,
    elevation: 5,
  },
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: cardWidth,
    height: '100%',
    zIndex: 100,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
});

const items = [
  {
    icon: 'ios-settings',
    title: 'Account',
    text: 'settings',
  },
  {
    icon: 'ios-card',
    title: 'Billing',
    text: 'payments',
  },
  {
    icon: 'ios-compass',
    title: 'Learn React',
    text: 'start course',
  },
  {
    icon: 'ios-exit',
    title: 'Log out',
    text: 'see you soon!',
  },
];

class Menu extends Component {
  state = {
    top: new Animated.Value(height),
  };

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    const {
      state: { top },
      props: { action },
    } = this;

    if (action === 'openMenu') {
      Animated.spring(top, {
        toValue: 54,
      }).start();
    }
    if (action === 'closeMenu') {
      Animated.spring(top, {
        toValue: height + 100,
      }).start();
    }
  };

  render() {
    const {
      state: { top },
      props: { closeMenu, name },
    } = this;
    return (
      <Animated.View style={[styles.container, { top }]}>
        <View
          style={{
            height: 142,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../assets/background2.jpg')}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: '600',
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 13,
              marginTop: 8,
            }}
          >
            Just love developing apps.
          </Text>
        </View>
        <TouchableOpacity onPress={closeMenu} style={styles.closeView}>
          <Icon.Ionicons name="ios-close" size={44} color="blue" />
        </TouchableOpacity>
        <View
          style={{
            height,
            backgroundColor: '#f0f3f5',
            padding: 50,
          }}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.handleMenu(index);
              }}
            >
              <MenuItem icon={item.icon} title={item.title} text={item.text} />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
