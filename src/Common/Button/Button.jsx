import React, {useState, useEffect, useCallback} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Styles from './Styles';

const Button = ({ color, text, action }) => { 
    return (
        <TouchableOpacity
            style={Styles(color).Container}
            onPress={action}
        >
            <Text style={Styles(color).Text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button;