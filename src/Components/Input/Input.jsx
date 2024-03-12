import React from 'react';
import { View, TextInput } from 'react-native';
import Styles from './Styles';
import { StandardTheme } from '../../Styles/Theme';

const Input = ({placeholder, Icon, type, onChange, value, multiline = false}) => {
    return(
        <View style={Styles.Container}>
            <View style={Styles.Icon}>
                {Icon}
            </View>
            <View style={Styles.InputContainer}>
                <TextInput 
                    multiline={multiline}
                    numberOfLines={9}
                    style={Styles.Input} 
                    placeholder={placeholder} 
                    keyboardType={type} 
                    secureTextEntry={type == 'visible-password' ? true : false}
                    onChangeText={(e) => onChange(e)}
                    value={value}
                    placeholderTextColor={StandardTheme.Grey}
                />
            </View>
        </View>
    )
}

export default Input;