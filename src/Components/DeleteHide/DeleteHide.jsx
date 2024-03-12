
import { Pressable, View, Text} from "react-native";
import { StandardTheme } from "../../Styles/Theme";

const DeleteHide = ({data, handleDelete}) => {
    return(
      <View
        style={{
          width: 340,
          height: '83%',
        }}
      >
        <Pressable
          style={{
            padding: 20,
            backgroundColor: StandardTheme.Red,
            width: '90%',
            height: '100%',
            alignSelf: 'flex-end',
            borderRadius: 15,
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
          onPress={() => {
            handleDelete({id: data.id})
          }}
        >
          <Text style={{fontWeight: 'bold', color: 'white'}}>Delete</Text>
        </Pressable>
      </View>
      
    )
}

export default DeleteHide;