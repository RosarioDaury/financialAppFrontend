import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { Styles } from './Styles';
import Input from '../../Common/Input/Input';
import Button from '../../Common/Button/Button';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HandleAuth from '../../Utils/HandleAuth';
import { AuthContext } from '../../Context/UserContext';

const Login = ({navigation}) => {
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const {setUser, User, setIsAuth, IsAuth} = useContext(AuthContext);

    const SubmitLogin = () => {
        HandleAuth(credentials, setUser, setIsAuth)
    }

    useEffect(() => {
        // NAVIGATE TO MAIN SCREEN
    }, [IsAuth])

    if(IsAuth){
        navigation.navigate('Home')
        return
    }

    return(
        <View style={Styles.Container}>
            <View style={Styles.Frame}/>
 
            <View style={Styles.LogoContainer}>
                <View style={Styles.IconContainer}>
                    <FontAwesome5 name="user-alt" size={70} color={StandardTheme.DarkBlue} />
                </View>
                <Text style={Styles.textLogo}>Welcome Back</Text>
                <Text>Login to your account</Text>
            </View>

            <View style={Styles.InputsContainer}>
                <Input 
                    placeholder='Username' 
                    Icon={<FontAwesome5 name="user-alt" size={15} color={StandardTheme.DarkBlue} />}
                    type='email-address'    
                    onChange={(e) => setCredentials({...credentials, username: e})}
                    value={credentials.username}
                />
                <Input 
                    placeholder='Pasword' 
                    Icon={<Entypo name="lock" size={15} color={StandardTheme.DarkBlue} />}
                    type='visible-password'
                    onChange={(e) => setCredentials({...credentials, password: e})}
                    value={credentials.password}
                />
            </View>

            <View style={Styles.ButtonContainer}>
                <Button color={StandardTheme.DarkBlue} text='Log In' action={SubmitLogin}/>
            </View>

            <View style={Styles.SignInContainer}>
                <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.DarkBlue}} />
                <Text>Or</Text>
                <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.DarkBlue}} />
            </View>
            
            <View style={Styles.ButtonContainer}>
                <Button 
                    color={StandardTheme.Green} 
                    text='Create' 
                    action={() => {
                        navigation.navigate('Signup')
                    }}
                />
            </View>
        </View>
    )
}

export default Login;
