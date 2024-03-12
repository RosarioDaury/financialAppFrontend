import React, {useContext} from 'react';
import { View } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { Styles } from './Styles';
import Button from '../../Components/Button/Button';
import { AuthContext } from '../../Context/UserContext';

const Landing = ({navigation}) => {
    const {setUser, User, setIsAuth, IsAuth} = useContext(AuthContext);

    if(IsAuth){
        navigation.navigate('Home')
        return
    }

    return(
        <View style={Styles.Container}>
            <View style={Styles.Frame}/>

            {/* <View style={Styles.IconContainer}>
                <Text style={Styles.Icon}>
                    Logo Here
                </Text>
            </View>
             */}

            <View style={Styles.ButtonsContainer}>
                <Button 
                    color={StandardTheme.Blue} 
                    text={"Log In"} 
                    action={() => {
                        navigation.navigate('Login')
                    }}
                />
                <Button 
                    color={StandardTheme.Green} 
                    text={"Sign Up"} 
                    action={() => {
                        navigation.navigate('Signup')
                    }}
                />
            </View>
        </View>
    )
}

export default Landing;