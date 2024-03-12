import { View, StyleSheet, Text } from "react-native"
import { StandardTheme } from "../../../Styles/Theme";
import { FontSizes } from "../../../Styles/GlobalStyles";
import formatCurrency from "../../../Utils/formatCurrency";
import { formatDateOnly } from "../../../Utils/formatDate";

export default function ReminderCard({data}) {
    
    return(
        <View style={styles.container}>
            <View style={styles.reminder}>
                <View
                    style={{
                        width: '60%',
                        gap: 2
                    }}
                >
                    <Text style={styles.title}>{data?.title}</Text>
                    <Text style={styles.description}>{data?.description}</Text>
                </View>

                <View>
                    <Text style={styles.amount}>{formatCurrency({amount: data.amount, decimals: true})}</Text>
                    <Text style={styles.description}>{data?.interval?.title}</Text>
                </View>

            </View> 

            <View style={styles.nextpayment}>
                <Text style={styles.nextpaymenttitle}>Next Payment: </Text> 
                <Text>{formatDateOnly(data?.date)}</Text>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '88%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20
    },
    reminder: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: StandardTheme.Purple,
        fontSize: FontSizes.medium,
        fontWeight: 'bold'
    }, 
    description: {
        color: StandardTheme.Grey
    },
    amount: {
        color: StandardTheme.Purple,
        fontWeight: 'bold'
    },
    nextpayment: {
        flexDirection: 'row'
    },
    nextpaymenttitle: {
        fontWeight: 'bold'
    }
});