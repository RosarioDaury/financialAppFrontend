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

export const modalStyles = StyleSheet.create({
    Container:{
        padding: 25,
        zIndex: 10,
        backgroundColor: StandardTheme.DarkBlue,
    },  
    Header:{
        marginTop: 40,
        marginBottom: 20,
        alignSelf: 'flex-end'
    },
    LogoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginVertical: 35
    },  
    IconContainer: {
        borderColor: StandardTheme.White,
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
        color: StandardTheme.White
    },
    description:{
        fontSize: 15,
        color: StandardTheme.Grey
    },
    InputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        alignItems: 'center',
        marginTop: 20
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
            color: StandardTheme.White
        }
    },
    ButtonContainer: {
        marginTop: 50,
        marginBottom: 50,
        gap: 5,
        width: '70%',
        alignSelf:'center'
    },
})