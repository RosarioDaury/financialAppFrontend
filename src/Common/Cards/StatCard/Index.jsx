import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import Styles from './Styles';
import { StandardTheme } from '../../../Styles/Theme';
import formatCurrency from '../../../Utils/formatCurrency';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const StatCard = ({data}) => {
    const [Color, setColor] = useState(null)

    useEffect(() => {
        if(data.name.toLowerCase().includes('healt') || data.name.toLowerCase().includes('salud')){
            setColor(StandardTheme.Red)
        } else if(data.name.toLowerCase().includes('bills') || data.name.toLowerCase().includes('responsability') || data.name.toLowerCase().includes('cuentas')) {
            setColor(StandardTheme.DarkBlue)
        } else if(data.name.toLowerCase().includes('food') || data.name.toLowerCase().includes('comida')) {
            setColor(StandardTheme.Yellow)
        } else if(data.name.toLowerCase().includes('credit') || data.name.toLowerCase().includes('card') || data.name.toLowerCase().includes('tarjeta') || data.name.toLowerCase().includes('personal') ) {
            setColor(StandardTheme.Golden)
        } else {
            setColor(StandardTheme.Grey)
        }

    }, [])


    return(  
        <View style={Styles.Container}>

            <Text style={Styles.title}>
                {data.name}
            </Text>

            <AnimatedCircularProgress
                    size={60}
                    width={4}
                    fill={Math.floor((data.total / data.limit) * 100)}
                    tintColor= {Color}
                    backgroundColor= '#a6a6a651'
                    prefill={0}
                    lineCap="round"
                    duration={0}
            >
                {
                    (fill) => {
                            return(
                                <Text style={{fontWeight: 'bold'}}>
                                    {fill}%
                                </Text>
                            )
                        }
                }
            </AnimatedCircularProgress>

            <Text style={Styles.total}>{formatCurrency({amount: data?.total, decimals: false}) ||'$0.00'}</Text>
        </View>
        
    )
}

export default StatCard;