import React from 'react';
import { View , Text, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { FontSizes } from '../../Styles/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';

const Pagination = ({current, totalPages, handleNext, handlePrev}) => {
    return(
        <View style={style.container}>
            <TouchableOpacity
                disabled={current == 1 ? true : false}
                onPress={() => {
                    handlePrev()
                }}
            >
                <AntDesign name="left" size={24} color={current == 1 ? StandardTheme.Grey : 'white'} />
            </TouchableOpacity>
            <Text style={style.text}>{current} of {totalPages}</Text>
            <TouchableOpacity
                disabled={current == totalPages ? true : false}
                onPress={() => {
                    handleNext()
                }}
            >
                <AntDesign name="right" size={24} color={current == totalPages ? StandardTheme.Grey : 'white'} />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#041e42da',
        width: 'auto',
        height: '8%',
        position:'absolute',
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 40,
        alignSelf: 'center',
        paddingHorizontal: 20,
        gap: 20,
        zIndex: 1
    },
    text: {
        fontSize: FontSizes.medium,
        color: "white"
    }
})

export default Pagination;