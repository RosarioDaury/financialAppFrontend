import { StyleSheet } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';

export const Styles = StyleSheet.create({
    Container:{
        padding: 25,
        zIndex: 10
    },  
    Frame: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 100,
        borderRightWidth: 0,
        borderTopWidth: 100,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: StandardTheme.DarkBlue,
    },
    FrameBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 200,
        borderBottomWidth: 150,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: StandardTheme.DarkBlue,
    },
    Header:{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    LogoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25,
        marginBottom: 15
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
        fontSize: 30,
        fontWeight: 'bold',
        color: StandardTheme.DarkBlue
    },
    InputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center'
    },
    Titles: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
        marginTop: 35,
        width: '80%',
        Text: {
            fontSize: 16,
            color: StandardTheme.DarkBlue
        }
    },
    ButtonContainer: {
        marginTop: 30,
        marginBottom: 50,
        gap: 5,
        width: '70%',
        alignSelf:'center'
    },
})

