
import { Pressable, View, Text} from "react-native";
import { StandardTheme } from "../../Styles/Theme";

const UpdateDeleteHide = ({data, handleUpdate}) => {
    return(
        <View
            style={{
                width: 320,
                height: '83%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center'
            }}
        >
            <Pressable
                style={{
                    padding: 20,
                    backgroundColor: StandardTheme.Green,
                    height: '100%',
                    flex: 1,
                    borderTopLeftRadius: 15,
                    borderBottomStartRadius: 10,
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}
                onPress={() => {
                    handleUpdate({id: data.id})
                }}
            >
                <Text style={{fontWeight: 'bold', color: 'white'}}>Update</Text>
            </Pressable>

            <Pressable
                style={{
                    padding: 20,
                    backgroundColor: StandardTheme.Red,
                    flex: 1,
                    height: '100%',
                    borderTopRightRadius: 15,
                    borderBottomEndRadius: 10,
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                }}
                onPress={() => {
                    handleUpdate({id: data.id})
                }}
            >
                <Text style={{fontWeight: 'bold', color: 'white'}}>Delete</Text>
            </Pressable>
        </View>
    )
}

export default UpdateDeleteHide;