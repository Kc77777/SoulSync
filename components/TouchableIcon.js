import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TouchableIcon = ({ name, size = 24, color = '#333', onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default TouchableIcon;
