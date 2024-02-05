import { StyleSheet } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';

export const Styles = StyleSheet.create({
    Container: {
        backgroundColor: StandardTheme.DarkBlue,
        width: '100%',
        height: '100%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 80
    },
    Frame: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 400,
        borderBottomWidth: 300,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: StandardTheme.White,
    },
    IconContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: StandardTheme.White,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Icon: {
        color: StandardTheme.White,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    ButtonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '60%',
        alignItems: 'center'
    }
})