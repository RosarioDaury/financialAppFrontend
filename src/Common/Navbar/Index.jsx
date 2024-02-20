import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontSizes } from '../../Styles/GlobalStyles';

function Navbar() {
    return(
        <View style={styles(StandardTheme.DarkBlue).container}>

            <View style={styles(StandardTheme.DarkBlue).tab}>
                <Entypo name="home" size={25} color={StandardTheme.White} />
                <Text style={styles(StandardTheme.White).text}>Home</Text>
            </View>

            <View style={styles(StandardTheme.DarkBlue).tab}>
                <MaterialIcons name="category" size={17} color={StandardTheme.Grey} />
                <Text style={styles(StandardTheme.Grey).text}>Category</Text>
            </View>


            <View style={styles(StandardTheme.DarkBlue).tab}>
                <FontAwesome5 name="money-check" size={17} color={StandardTheme.Grey}/>
                <Text style={styles(StandardTheme.Grey).text}>Transaction</Text>
            </View>

            <View style={styles(StandardTheme.DarkBlue).tab}>
                <AntDesign name="profile" size={17} color={StandardTheme.Grey}/>
                <Text style={styles(StandardTheme.Grey).text}>Profile</Text>
            </View>
            
        </View>
    )
}


const styles = (textColor) => StyleSheet.create({
    container: {
        backgroundColor: '#041e42e9',
        width: '100%',
        height: 75,
        position:'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 40,
    },
    tab: {
        alignItems: 'center'
    },
    text:{
        fontSize: FontSizes.xsmall,
        color: textColor
    }
})

export default Navbar;
