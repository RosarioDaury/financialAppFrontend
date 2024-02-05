import { StyleSheet } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { FontSizes } from '../../Styles/GlobalStyles';

export const Styles = StyleSheet.create({
    Header: {
        backgroundColor: StandardTheme.DarkBlue,
        paddingVertical: 40,
        paddingHorizontal: 30,
        gap: 20,
        position: 'relative',
        alignItems: 'center'
    },
    username: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        user: {
            alignItems: 'center',
            gap: 5,
            text: {
                color: 'white'
            }
        },
        name: {
            fontSize: FontSizes.small,
            color: StandardTheme.White
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
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: -60,
        alignItems: 'center',
    },
    incomeTrack: {
        backgroundColor: StandardTheme.White,
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        gap: 20,
        shadowColor: StandardTheme.DarkBlue,
        shadowOpacity: .2,
        shadowRadius: 1,
        shadowOffset: {
            height: 3,
            width: 3
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
    StatsContainer: {
        marginTop: 75,
        marginBottom: 75,
        gap: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})