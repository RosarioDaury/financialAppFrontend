import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
import { Alert } from 'react-native';
class UserServices {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetUser = async ({token}) => {
        console.log(`${BASE_URL}/user/get`)
        const data = await axios.get(`${BASE_URL}/user/get`, {headers: {token}});
        console.log(data)
        return data;
    }

    GetUserTypes = async () => {
        console.log(`${BASE_URL}/user/get/types`)
        const {success, data, error} = await axios.get(`${BASE_URL}/user/get/types`);
        console.log(success, data, error)
        return {success, data, error}
    }

    AuthUser = (body) => {
        console.log(`${BASE_URL}/user/get/types`)
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
        console.log(`${BASE_URL}/user/create`)
        const data = await axios.post(`${BASE_URL}/user/create`, body);
        return data
    }

    updateUser = async ({token, body}) => {
        try{
            console.log(`${BASE_URL}/user/update`)
            const {data} = await axios.put(`${BASE_URL}/user/update`, body, { headers: {token}});
            return data;
        } catch(error) {
            console.log(err.response.data.error);
            Alert.alert(err.response.data.error);
        }
        
    }

}

export default UserServices;