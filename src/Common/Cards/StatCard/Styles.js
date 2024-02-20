import { StyleSheet } from 'react-native';
import {StandardTheme} from '../../../Styles/Theme';
import { FontSizes } from '../../../Styles/GlobalStyles';

const Styles = (color) => StyleSheet.create({
    Container: {
        backgroundColor: StandardTheme.White,
        width: '85%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'space-between',
        shadowColor: StandardTheme.DarkBlue,
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            height: .5,
            width: .5
        },
    },
    Category: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    Name:{
        color: color,
        fontSize: FontSizes.medium,
        fontWeight: 'bold'
    },
    Remaining: {
        color: StandardTheme.Grey,
        fontSize: FontSizes.small
    },
    TotalContainer: {
        display: 'flex',
        alignItems: "flex-end",
    },  
    Total: {
        fontSize: FontSizes.medium
    }
})

export default Styles;