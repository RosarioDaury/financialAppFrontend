import { StyleSheet} from 'react-native';
import { FontSizes } from '../../Styles/GlobalStyles';
import { StandardTheme } from '../../Styles/Theme';

export const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '75%',
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    titleContainer:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: FontSizes.normal,
        fontWeight: 'bold',
        color: StandardTheme.DarkBlue
    },
    search: {
        width: '90%',
        alignSelf: 'center'
    },  
    categories: {
        marginTop: 30,
    }
})
