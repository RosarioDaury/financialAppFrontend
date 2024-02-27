import { StyleSheet} from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { FontSizes } from '../../Styles/GlobalStyles';

export const Styles = StyleSheet.create({
    Header: {
        backgroundColor: StandardTheme.DarkBlue,
        paddingVertical: 70,
        paddingHorizontal: 25,
        gap: 20,
        position: 'relative',
        alignItems: 'center'
    },
    username: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        user: {
            alignItems: 'center',
            gap: 5,
            text: {
                color: 'white'
            }
        },
        name: {
            fontSize: FontSizes.small,
            color: StandardTheme.White,
            fontWeight: 'bold'
        }
    },
    lastestIncome: {
        paddingVertical: 20,
        gap: 5,
        width: '50%',
        text:{ color: 'white', fontSize: 15 },
        amount: { color: StandardTheme.White, fontSize: 28, fontWeight: 'bold'}
    },
    incomeTrackContainer: {
        position: 'absolute',
        left:0,
        right:0,
        top: 240,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
    },
    incomeTrack: {
        width: '70%',
        backgroundColor: '#ffff',
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 15,
        gap: 5,
        shadowColor: StandardTheme.DarkBlue,
        shadowOpacity: .1,
        shadowRadius: .5,
        shadowOffset: {
            height: 2,
            width: 2
        },
    },
    Income: {
        paddingVertical: 10,
        alignItems: 'center',
        gap: 10,
        text:{ color: StandardTheme.DarkBlue, fontSize: 15 },
        amount: { color: StandardTheme.Green, fontSize: 20, fontWeight: 'bold'}
    },
    Outcome: {
        paddingVertical: 10,
        alignItems: 'center',
        gap: 10,
        text:{ color: StandardTheme.DarkBlue, fontSize: 15 },
        amount: { color: StandardTheme.Red, fontSize: 20, fontWeight: 'bold' }
    },
    chartContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 50,
        width: '98%',
        padding: 20,
        paddingTop: 25,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: StandardTheme.DarkBlue
    },
    chartTitle: {
        color: StandardTheme.White,
        fontWeight: 'bold',
        fontSize: FontSizes.normal
    }
})