import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
import { generateQueryString } from '../Utils/generateQuery';

class TransactionServices {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetTransactions = async ({token, filters}) => {
        if(filters) {
            return await axios.get(
                `${this.BASE_URL}/transactions/get${generateQueryString(filters)}`,
                {
                    headers: {
                        usertoken: token
                    }
                }
            )
        } else {
            return await axios.get(
                `${this.BASE_URL}/get/all`, 
                {
                    headers: {
                        usertoken: token
                    }
                }
            )
        }
    }
}


export default TransactionServices;