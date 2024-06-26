import { View, FlatList, Text, Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const Carousel = ({items}) => {
    return(
        <View style={styles.carouselContainer}>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    item
                )}
                style={styles.list}
                ItemSeparatorComponent={() => <View style={{width: 5}} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    carouselContainer: {
      width: '100%',
      alignSelf: 'center',
      marginTop: 20
    },
    carouselItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  

export default Carousel