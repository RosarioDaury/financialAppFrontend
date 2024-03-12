import React from 'react';
import { View, Text, Pressable} from 'react-native';
import { StyleSheet } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { AntDesign } from '@expo/vector-icons';

function Navbar({navigation}) {
    return(
        <View style={styles(StandardTheme.DarkBlue).container}>

            <Pressable
                onPress={() => {
                    navigation.navigate('Category')
                }}
                style={styles(StandardTheme.DarkBlue).tab}
            >
                <AntDesign name="menuunfold" size={22} color={StandardTheme.Grey} />
                <Text style={styles(StandardTheme.Grey).text}>Categories</Text>
            </Pressable>

            <Pressable 
                style={styles(StandardTheme.DarkBlue).tab}
                onPress={() => {
                    navigation.navigate('Incomes')
                }}
            >
                <AntDesign name="pluscircle" size={22} color={StandardTheme.Green} />
                <Text style={styles(StandardTheme.Grey).text}>Incomes</Text>
            </Pressable>

            <Pressable 
                style={styles(StandardTheme.DarkBlue).tab}
                onPress={() => {
                    navigation.navigate('Expenses')
                }}
            >
                <AntDesign name="minuscircle" size={22} color={StandardTheme.Red} />
                <Text style={styles(StandardTheme.Grey).text}>Expenses</Text>
            </Pressable>

            <Pressable 
                style={styles(StandardTheme.DarkBlue).tab}
                onPress={() => {
                    navigation.navigate('Reminders')
                }}
            >
                <AntDesign name="clockcircle" size={22} color={StandardTheme.Purple} />
                <Text style={styles(StandardTheme.Grey).text}>Reminders</Text>
            </Pressable>

            <Pressable
                onPress={() => {
                    navigation.navigate('Profile')
                }}
                style={styles(StandardTheme.DarkBlue).tab}
            >
                <AntDesign name="profile" size={25} color={StandardTheme.Blue}/>
                <Text style={styles(StandardTheme.Grey).text}>Profile</Text>
            </Pressable>
        </View>
    )
}


const styles = (textColor) => StyleSheet.create({
    container: {
        backgroundColor: '#041e42da',
        width: '99%',
        height: '9%',
        position:'absolute',
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 40,
        alignSelf: 'center'
    },
    tab: {
        alignItems: 'center',
        gap: 5
    },
    text:{
        fontSize: 10,
        color: textColor
    }
})

export default Navbar;
