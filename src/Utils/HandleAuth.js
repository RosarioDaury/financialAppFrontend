import JWT from 'expo-jwt';
import {SECRET_KEY} from '@env';
import UserServices from '../Services/UserServices';
import { Alert } from 'react-native';
import SessionsDB from '../database/session';
const Service = new UserServices();
const Session = new SessionsDB();

const HandleAuth = (body, setState, setAuth) => {
    Service.AuthUser(body)
    .then(result => {
        const {User, IsAuth} = result;

        if(IsAuth){
            let userData = JWT.decode(User, SECRET_KEY);
            setState({...userData, token: User});
            setAuth(true);
            Session.saveSession({id: userData.id, token: User})
            return
        }
        setState({});
        setAuth(false);
    })
    .catch(error => {
        Alert.alert(error.message);
        console.log(error);
    })
}   


export default HandleAuth;