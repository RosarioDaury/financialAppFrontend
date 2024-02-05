import React from 'react';
import { View, TextInput } from 'react-native';
import Styles from './Styles';

const Input = ({placeholder, Icon, type, onChange, value}) => {
    return(
        <View style={Styles.Container}>
            <View style={Styles.Icon}>
                {Icon}
            </View>
            <View style={Styles.InputContainer}>
                <TextInput 
                    style={Styles.Input} 
                    placeholder={placeholder} 
                    keyboardType={type} 
                    secureTextEntry={type == 'visible-password' ? true : false}
                    onChangeText={(e) => onChange(e)}
                    value={value}
                />
            </View>
        </View>
    )
}

export default Input;