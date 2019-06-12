import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: name =>
      dispatch({
        type: 'UPDATE_NAME',
        name,
      }),
  };
}

const styles = StyleSheet.create({
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  text: {
    fontSize: 20,
    color: '#3c4560',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#b8bece',
    fontWeight: '500',
  },
});

class Avatar extends Component {
  state = {
    image:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  };

  async componentWillMount() {
    const { updateName } = this.props;
    try {
      const response = await fetch(
        'https://randomuser.me/api/?nat=au,inc=gender,name,picture'
      );
      const responseJson = await response.json();

      const { name, picture } = responseJson.results[0];
      updateName(`${name.first} ${name.last}`);
      this.setState({
        image: picture.large,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const {
      props: { openMenu, name },
      state: { image },
    } = this;
    return (
      <>
        <TouchableOpacity
          onPress={openMenu}
          style={{
            marginLeft: 20,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Image source={{ uri: image }} style={styles.avatar} />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome back,</Text>
        <Text style={styles.text}>{name}</Text>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);
