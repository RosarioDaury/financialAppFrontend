import { StyleSheet } from 'react-native';

const Styles = (color) => StyleSheet.create({
    Container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: color,
        width: '100%'
    },
    Text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
    }
});

export default Styles;

