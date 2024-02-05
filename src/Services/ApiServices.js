import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
//LocalURL: string = 'http://192.168.0.107:3000';

class ApiService {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetAll = async (endpoint) => {
        return await axios.get(`${BASE_URL}${endpoint}`)
    }

    AuthUser = (body) => {
        return new Promise(
            function (resolve, reject) {
                axios.post(`${BASE_URL}/users/auth`, body)
                .then(response => {
                    const {User, IsAuth} = response.data;
                    resolve({
                        User,
                        IsAuth
                    });
                })
                .catch(error => {
                    reject(error);
                })
            }
        )
    }

    CreateUser = async (body) => {
        const {Message, error} = await axios.post(`${BASE_URL}/users/create`, body);
        return {Message, error}
    }

}

export default ApiService;