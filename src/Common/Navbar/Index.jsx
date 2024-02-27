import React from 'react';
import { View, TextInput, Text, Pressable} from 'react-native';
import { StyleSheet } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontSizes } from '../../Styles/GlobalStyles';

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

            <View style={styles(StandardTheme.DarkBlue).tab}>
                <AntDesign name="pluscircle" size={22} color={StandardTheme.Grey} />
                <Text style={styles(StandardTheme.Grey).text}>Incomes</Text>
            </View>

            <View style={styles(StandardTheme.DarkBlue).tab}>
                <AntDesign name="minuscircle" size={22} color={StandardTheme.Grey} />
                <Text style={styles(StandardTheme.Grey).text}>Expenses</Text>
            </View>

            <View style={styles(StandardTheme.DarkBlue).tab}>
                <AntDesign name="clockcircle" size={22} color={StandardTheme.Grey} />
                <Text style={styles(StandardTheme.Grey).text}>Reminders</Text>
            </View>

            <Pressable
                onPress={() => {
                    navigation.navigate('Profile')
                }}
                style={styles(StandardTheme.DarkBlue).tab}
            >
                <AntDesign name="profile" size={25} color={StandardTheme.Grey}/>
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
