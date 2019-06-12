import React from 'react';
import { View, Text, Image } from 'react-native';

const Logo = ({ text, image }) => (
  <View
    style={{
      flexDirection: 'row',
      backgroundColor: '#fff',
      height: 60,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      shadowColor: 'rgba(0,0,0,0.05)',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 5,
      alignItems: 'center',
      marginHorizontal: 8,
      marginVertical: 10,
    }}
  >
    <Image
      style={{
        width: 36,
        height: 36,
      }}
      source={image}
      resizeMode="contain"
    />
    <Text
      style={{
        fontWeight: '600',
        fontSize: 17,
        marginLeft: 8,
      }}
    >
      {text}
    </Text>
  </View>
);

export default Logo;
