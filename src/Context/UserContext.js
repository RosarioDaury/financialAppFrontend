import { createContext, useState } from "react";
import UserServices from "../Services/UserServices";
import { Alert } from "react-native";
import JWT from 'expo-jwt';
import {SECRET_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Service = new UserServices();

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [User, setUser] = useState({});
    const [IsAuth, setIsAuth] = useState(false);

    const logOut = async () => {
        setUser({});
        setIsAuth(false);
        await AsyncStorage.removeItem('token')
    }

    const logIn = ({body}) => {
        Service.AuthUser(body)
        .then(async (result) => {
            const {token, auth} = result;
            if(auth){

                try{
                    let userData = JWT.decode(token, 'ROSD12', {timeSkew: 30});
                    setUser({...userData, token: token});
                    setIsAuth(true);    
                    await AsyncStorage.setItem('token', token);
                } catch(err) {
                    Alert.alert(err);
                    console.log(err)
                }
                
            } else {
                setUser({});
                setIsAuth(false);
            }  
        })
        .catch(error => {
            Alert.alert(error);
        })
    }   

    const setUserFromToken = async ({token}) => {
        let userData = JWT.decode(token, SECRET_KEY, {timeSkew: 30});
        setUser({...userData, token: token})
        setIsAuth(true);
    }

    const value = {User, setUser, IsAuth, setIsAuth, logOut, logIn, setUserFromToken };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export {AuthContext, AuthProvider};
