import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StandardTheme } from "../../../Styles/Theme";
import { FontSizes } from "../../../Styles/GlobalStyles";

const OutcomeCard = ({data}) => {
    return(
        <View style={styles.container}>
            <MaterialCommunityIcons name="account-cash" size={24} color={StandardTheme.Red} />

            <View style={{width: '35%'}}>
                <Text style={styles.title}>{data?.Title || ""}</Text>
                <Text style={styles.date}>{data?.Date || ""}</Text>
            </View>

            <View>
                <Text style={styles.date}>-${data?.Amount || ""}</Text>
            </View>
        </View>
        
    )
} 


const styles = StyleSheet.create({
    container: {
        backgroundColor: StandardTheme.White,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        flexDirection: 'row',
        marginHorizontal: 10,
        gap: 30,
        borderRadius: 20,
        width: 270
    },
    title: {
        fontSize: FontSizes.medium,
        color: StandardTheme.Red
    },
    date: {
        fontSize: FontSizes.small,
        color: StandardTheme.Grey
    }
})


export default OutcomeCard