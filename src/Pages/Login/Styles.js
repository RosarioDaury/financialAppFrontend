import { StyleSheet } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';

export const Styles = StyleSheet.create({
    Container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },  
    Frame: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 150,
        borderRightWidth: 0,
        borderTopWidth: 150,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: StandardTheme.DarkBlue,
    },
    Header:{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: 80
    },
    LogoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginVertical: 80
    },  
    IconContainer: {
        borderColor: StandardTheme.DarkBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Icon: {
        color: StandardTheme.DarkBlue,
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
        shadowColor: StandardTheme.DarkBlue,
    },
    textLogo: {
        textAlign: 'center',
        fontSize: 40,
        color: StandardTheme.DarkBlue,
        fontWeight: 'bold'
    },

    InputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '80%',
        marginBottom: 65
    },
    ButtonContainer: {
        width: '50%',
        marginBottom: 25
    },
    SignInContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 25
    }
})