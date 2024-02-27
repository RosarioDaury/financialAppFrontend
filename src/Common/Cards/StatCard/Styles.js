import { StyleSheet } from 'react-native';
import {StandardTheme} from '../../../Styles/Theme';
import { FontSizes } from '../../../Styles/GlobalStyles';

const Styles = StyleSheet.create({
    Container: {
        backgroundColor: StandardTheme.White,
        width: 100,
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: StandardTheme.DarkBlue,
        gap: 15,
        marginLeft: 5
    },
    title: {
        fontWeight: 'bold'
    },
    total: {
        fontSize: FontSizes.xsmall,
        color: StandardTheme.Grey
    }
})

export default Styles;