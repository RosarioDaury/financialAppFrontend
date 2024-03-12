import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import formatCurrency from "../../../Utils/formatCurrency";

import { StandardTheme } from "../../../Styles/Theme";
import { FontSizes } from "../../../Styles/GlobalStyles";

const CategoryCard = ({data}) => {
    const [color, setColor] = useState(null)
    const [Icon, setIcon] = useState(null)
  
    useEffect(() => {
      if(data.name.toLowerCase().includes('healt') || data.name.toLowerCase().includes('salud')){
          setIcon(
            <View style={cardStyles({color: StandardTheme.Red}).icon}>
              <AntDesign name="heart" size={30} color={StandardTheme.White} />
            </View>
            )
          setColor(StandardTheme.Red)
      } else if(data.name.toLowerCase().includes('bills') || data.name.toLowerCase().includes('responsability') || data.name.toLowerCase().includes('cuentas')) {
          setIcon(
          <View style={cardStyles({color: StandardTheme.DarkBlue}).icon}>
            <FontAwesome5 name="money-bill-alt" size={25} color={StandardTheme.White} />
          </View>
          )
          setColor(StandardTheme.DarkBlue)
      } else if(data.name.toLowerCase().includes('food') || data.name.toLowerCase().includes('comida')) {
          setIcon(
          <View style={cardStyles({color: StandardTheme.Yellow}).icon}>
            <Ionicons name="fast-food" size={30} color={StandardTheme.White} />
          </View>
          )
          setColor(StandardTheme.Yellow)
      } else if(data.name.toLowerCase().includes('credit') || data.name.toLowerCase().includes('card') || data.name.toLowerCase().includes('tarjeta') || data.name.toLowerCase().includes('personal') ) {
          setIcon(
          <View style={cardStyles({color: StandardTheme.Golden}).icon}>
            <AntDesign name="creditcard" size={30} color={StandardTheme.White} />
          </View>
          )
          setColor(StandardTheme.Golden)
      } else {
          setIcon(
          <View style={cardStyles({color: StandardTheme.Grey}).icon}>
            <Entypo name="bookmarks" size={30} color={StandardTheme.White} />
          </View>
          )
          setColor(StandardTheme.Grey)
      }
  
    }, []);
  
    return(
      <View style={cardStyles({color: 'black'}).container}>
        <View style={cardStyles({color: 'black'}).information}>
          <View>
            <Text style={cardStyles({color: 'black'}).title}>{data?.name}</Text>
            <Text style={cardStyles({color: 'black'}).total}>{formatCurrency({amount: data?.total, decimals: true})}</Text>
            <Text style={cardStyles({color: 'black'}).limit}>{`of ${formatCurrency({amount: data?.limit, decimals: true})}` }</Text>
          </View>
          {Icon}
        </View>
  
        <Progress.Bar progress={data.total / data.limit} width={320} color={color} borderColor="white" borderRadius={15}/>
  
      </View>
    )
}

const cardStyles = ({color}) => StyleSheet.create({
  container: {
    width: 330,
    alignItems: 'center',
    gap: 20,
    alignSelf: 'center',
    backgroundColor: StandardTheme.White,
    paddingTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    marginBottom: 20
  },
  information: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    padding: 15,
    backgroundColor: color,
    borderRadius: 40,
  },
  descriptive: {

  },  
  title:{
    fontSize: FontSizes.medium,
    color: StandardTheme.Grey
  },
  total: {
    fontSize: FontSizes.normal,
    color: StandardTheme.DarkBlue,
    fontWeight: 'bold'
  },
  limit: {
    fontSize: FontSizes.small,
    color: StandardTheme.Grey
  }
})

export default CategoryCard;
