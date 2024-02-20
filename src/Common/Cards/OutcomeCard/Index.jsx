import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StandardTheme } from "../../../Styles/Theme";
import { FontSizes } from "../../../Styles/GlobalStyles";
import useTransactionsByType from "../../../Hooks/Transactions/useTransactionsByType";
import Carousel from "../../Carousel/Index";
import {formatDateOnly} from "../../../Utils/formatDate";
import formatCurrency from "../../../Utils/formatCurrency";

const OutcomeCard = ({data}) => {
    return(
        <View style={styles.container}>

            <View style={{flexDirection: 'row', gap: 15}}>
                <MaterialCommunityIcons name="account-cash" size={35} color={StandardTheme.Red} />

                <View>
                    <Text style={styles.title}>{data?.title || ""}</Text>
                    <Text style={styles.date}>{formatDateOnly(data.date) || ""}</Text>
                </View>
            </View>

            

            <View>
                <Text style={styles.date}>-{formatCurrency(data?.amount) || ""}</Text>
            </View>
        </View>
        
    )
} 

const OutcomeCardsSlider = () => {
    const { Transactions, Pagination} = useTransactionsByType({filters: {}, type: 2})
    
    if(Transactions.length == 0 ) {
        return (
            <View>
                <Text>Not Transactions</Text>
            </View>
        )
    }

    return (
        <Carousel 
            items={ 
                Transactions.map(el => {
                    return (
                        <OutcomeCard data={el} key={el.id}/>
                    )
                })
            }
        />
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: StandardTheme.White,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        flexDirection: 'row',
        marginHorizontal: 10,
        gap: 30,
        borderRadius: 20,
        width: 290,
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


export default OutcomeCardsSlider