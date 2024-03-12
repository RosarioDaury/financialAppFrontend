import { StyleSheet } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';

const Styles = StyleSheet.create({
    Container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0
    },
    Icon: {
        padding: 15,
        width: 50,
        height: 50,
        borderRadius: 25,
        zIndex: 10,
        backgroundColor: 'white',
        shadowColor: StandardTheme.DarkBlue,
        shadowOpacity: 0.2,
        shadowRadius: .5,
        shadowOffset: {
            height: .2,
            width: .2
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },  
    InputContainer: {
        position: 'relative',
        right: 25,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 15,
    },
    Input: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 35,
        color: StandardTheme.DarkBlue
    }

})

export default Styles;