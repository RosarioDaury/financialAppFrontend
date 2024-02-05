import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import Styles from './Styles';
import { StandardTheme } from '../../../Styles/Theme';
import { MaterialIcons } from '@expo/vector-icons';
import useCategory from '../../../Hooks/Categories/useOneCategory';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({data}) => {
    const [Icon, setIcon] = useState(null)
    const [Color, setColor] = useState(null)
    const {Category, error} = useCategory({id: data.id})

    useEffect(() => {
        if(data.Label.toLowerCase().includes('healt') || data.Label.toLowerCase().includes('salud')){
            setIcon(<AntDesign name="heart" size={25} color={StandardTheme.Red} />)
            setColor(StandardTheme.Red)
        } else if(data.Label.toLowerCase().includes('bills') || data.Label.toLowerCase().includes('responsability') || data.Label.toLowerCase().includes('cuentas')) {
            setIcon(<FontAwesome5 name="money-bill-alt" size={25} color={StandardTheme.DarkBlue} />)
            setColor(StandardTheme.DarkBlue)
        } else if(data.Label.toLowerCase().includes('food') || data.Label.toLowerCase().includes('comida')) {
            setIcon(<Ionicons name="fast-food" size={25} color={StandardTheme.Yellow} />)
            setColor(StandardTheme.Yellow)
        } else if(data.Label.toLowerCase().includes('credit') || data.Label.toLowerCase().includes('card') || data.Label.toLowerCase().includes('tarjeta') || data.Label.toLowerCase().includes('personal') ) {
            setIcon(<AntDesign name="creditcard" size={25} color={StandardTheme.Golden} />)
            setColor(StandardTheme.Golden)
        } else {
            setIcon(<MaterialIcons name="category" size={24} color="black" />)
            setColor('black')
        }

    }, [])

    return(
        <View style={Styles(Color).Container}>
            <View style={Styles(Color).Category}>
                {Icon || ''}
                <View>
                    <Text style={Styles(Color).Name}>{data?.Label || ""}</Text>
                    <Text style={Styles(Color).Remaining}>$1800 left</Text>
                </View>
            </View>

            <View style={Styles(Color).TotalContainer}>
                <Text style={Styles(Color).Total}>${Category?.total || 0.00}</Text>
                <Text style={Styles(Color).Remaining}>${Category?.total || 0.00} of ${data?.Limit}</Text>
            </View>
            
        </View>
    )
}

export default StatCard;