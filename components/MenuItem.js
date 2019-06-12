import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'expo';

const MenuItem = ({ icon, title, text }) => (
  <View
    style={{
      flexDirection: 'row',
      marginVertical: 15,
      alignItems: 'center',
    }}
  >
    <View
      style={{
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon.Ionicons name={icon} size={24} color="#546bfb" />
    </View>
    <View
      style={{
        paddingLeft: 20,
      }}
    >
      <Text
        style={{
          color: '#3c4560',
          fontSize: 24,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: '#3c4560',
          fontWeight: '600',
          opacity: 0.6,
          marginTop: 5,
        }}
      >
        {text}
      </Text>
    </View>
  </View>
);

export default MenuItem;
