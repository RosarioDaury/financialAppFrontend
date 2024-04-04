import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
import { Alert } from 'react-native';
class UserServices {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetUser = async ({token}) => {
        const data = await axios.get(`${BASE_URL}/user/get`, {headers: {token}});
        return data;
    }

    GetUserTypes = async () => {
        const {success, data, error} = await axios.get(`${BASE_URL}/user/get/types`);
        return {success, data, error}
    }

    AuthUser = (body) => {
        return new Promise(
            function (resolve, reject) {
                axios.post(`${BASE_URL}/user/auth`, body)
                .then(response => {
                    const {data, success} = response.data;
                    resolve({
                        token: data,
                        auth: success
                    });
                })
                .catch(error => {
                    reject(error.response.data.error);
                })
            }
        )
    }

    CreateUser = async (body) => {
        const data = await axios.post(`${BASE_URL}/user/create`, body);
        return data
    }

    updateUser = async ({token, body}) => {
        try{
            const {data} = await axios.put(`${BASE_URL}/user/update`, body, { headers: {token}});
            return data;
        } catch(error) {
            console.log(err.response.data.error);
            Alert.alert(err.response.data.error);
        }
        
    }

}

export default UserServices;