import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { StandardTheme } from "../../../Styles/Theme";
import { FontSizes } from "../../../Styles/GlobalStyles";
import {formatDateOnly, formatTimeOnly} from "../../../Utils/formatDate";
import formatCurrency from "../../../Utils/formatCurrency";


const ExpensesCardDetailed = ({data}) => {
    return(
        <View style={styles.container}>
            <View style={styles.transaction}>
                <View
                    style={{
                        width: '58%',
                        gap: 2
                    }}
                >
                    <Text style={styles.title}>{data?.title}</Text>
                    <Text style={styles.description}>{data?.description}</Text>
                </View>

                <View>
                    <Text style={styles.amount}>{formatCurrency({amount: data.amount, decimals: true})}</Text>
                    <Text style={styles.description}>{data.date ? formatDateOnly(data.date) : ''}</Text>
                    <Text style={styles.description}>{data.date ? formatTimeOnly(data.date) : ''}</Text> 
                </View>
            
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
    transaction: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: FontSizes.normal,
        fontWeight: 'bold'
    }, 
    description: {
        color: StandardTheme.Grey
    },
    amount: {
        color: StandardTheme.Red,
        fontWeight: 'bold'
    }
});


export default ExpensesCardDetailed