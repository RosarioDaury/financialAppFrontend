import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
//LocalURL: string = 'http://192.168.0.107:3000';

class UserServices {
    constructor() {
        this.BASE_URL = BASE_URL
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
                        User: data,
                        IsAuth: success
                    });
                })
                .catch(error => {
                    reject(error);
                })
            }
        )
    }

    CreateUser = async (body) => {
        const {Message, error} = await axios.post(`${BASE_URL}/user/create`, body);
        return {Message, error}
    }

}

export default UserServices;