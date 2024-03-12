import { StyleSheet, Dimensions } from "react-native";
import { StandardTheme } from "../../Styles/Theme";
import { FontSizes } from "../../Styles/GlobalStyles";
const { width, height } = Dimensions.get('window');

export const reminderStyles = StyleSheet.create({
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
        color: StandardTheme.Purple
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
        width: width,
    },  
    Header:{
        marginTop: 40,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    LogoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginVertical: 35,
    },  
    IconContainer: {
        borderColor: StandardTheme.White,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        color: StandardTheme.Grey,
        textAlign: 'center'
    },
    InputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: 35
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
        gap: 5,
        width: '40%',
        alignSelf:'flex-end',
        marginTop: 100
    },
    ContainerCategory: {
        padding: 25,
        zIndex: 10,
        backgroundColor: StandardTheme.DarkBlue,
        width: width
    },
    backForm: {
        marginTop: 50,
        marginBottom: 20,
    }
})