import JWT from 'expo-jwt';
import {SECRET_KEY} from '@env';
import ApiService from '../Services/ApiServices';
const Service = new ApiService();
const HandleAuth = (body, setState, setAuth) => {
    Service.AuthUser(body)
    .then(result => {
        const {User, IsAuth} = result;

        if(IsAuth){
            let UserData = JWT.decode(User, SECRET_KEY);
            setState({...UserData, token: User});
            setAuth(true);
            return
        }
        setState({});
        setAuth(false);
    })
    .catch(error => {
        console.log(error);
    })
}   

export default HandleAuth;