import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const TouchableText = ({ text, onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, style]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#5D5FEF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default TouchableText;
