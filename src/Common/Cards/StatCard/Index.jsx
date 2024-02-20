import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import Styles from './Styles';
import { StandardTheme } from '../../../Styles/Theme';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import formatCurrency from '../../../Utils/formatCurrency';


const StatCard = ({data}) => {
    const [Icon, setIcon] = useState(null)
    const [Color, setColor] = useState(null)

    useEffect(() => {
        if(data.name.toLowerCase().includes('healt') || data.name.toLowerCase().includes('salud')){
            setIcon(<AntDesign name="heart" size={35} color={StandardTheme.Red} />)
            setColor(StandardTheme.Red)
        } else if(data.name.toLowerCase().includes('bills') || data.name.toLowerCase().includes('responsability') || data.name.toLowerCase().includes('cuentas')) {
            setIcon(<FontAwesome5 name="money-bill-alt" size={35} color={StandardTheme.DarkBlue} />)
            setColor(StandardTheme.DarkBlue)
        } else if(data.name.toLowerCase().includes('food') || data.name.toLowerCase().includes('comida')) {
            setIcon(<Ionicons name="fast-food" size={35} color={StandardTheme.Yellow} />)
            setColor(StandardTheme.Yellow)
        } else if(data.name.toLowerCase().includes('credit') || data.name.toLowerCase().includes('card') || data.name.toLowerCase().includes('tarjeta') || data.name.toLowerCase().includes('personal') ) {
            setIcon(<AntDesign name="creditcard" size={35} color={StandardTheme.Golden} />)
            setColor(StandardTheme.Golden)
        } else {
            setIcon(<MaterialIcons name="category" size={35} color="black" />)
            setColor('black')
        }

    }, [])


    return(
        <View style={Styles(Color).Container}>
            <View style={Styles(Color).Category}>
                {Icon || ''}
                <View>
                    <Text style={Styles(Color).Name}>{data?.name || ""}</Text>
                    <Text style={Styles(Color).Remaining}>{data.limit - data.total} left</Text>
                </View>
            </View>

            <View style={Styles(Color).TotalContainer}>
                <Text style={Styles(Color).Total}>{formatCurrency(data?.total) || 0.00}</Text>
                <Text style={Styles(Color).Remaining}>{data?.total || 0.00} of {formatCurrency(data?.limit)}</Text>
            </View>
            
        </View>
    )
}

export default StatCard;