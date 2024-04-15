import {BASE_URL, SECRET_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import JWT from 'expo-jwt';

class EmailHandler {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    SendEmail = async ({body}) => {
        console.log(`${this.BASE_URL}/email/send`)
        const token = await AsyncStorage.getItem('token')
        let user = JWT.decode(token, SECRET_KEY, {timeSkew: 30});
        body.to = user.email;
        return await axios.post(
            `${this.BASE_URL}/email/send`,
            body,
            {
                headers: {token}
            }
        )
    }

}


export default EmailHandler;