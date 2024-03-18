import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
import { generateQueryString } from '../Utils/generateQuery';

class TransactionServices {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetTransactions = async ({token, filters}) => {
        return await axios.get(
            `${this.BASE_URL}/transaction/get${generateQueryString(filters)}`,
            {
                headers: {
                    token: token
                }
            }
        )
    }

    GetTransactionTypes = async () => {
        return await axios.get(
            `${this.BASE_URL}/transaction/types`
        )
    }

    GetTransactionsByType = async ({type, token, filters}) => {
        return await axios.get(
            `${this.BASE_URL}/transaction/get/type/${type}${generateQueryString(filters)}`,
            {
                headers: {
                    token: token
                }
            }
        )
    }

    GetTransactionsByCategory = async ({type, token, filters}) => {
        return await axios.get(
            `${this.BASE_URL}/transaction/get/category/${type}${generateQueryString(filters)}`,
            {
                headers: {
                    token: token
                }
            }
        )
    }

    GetTransactionsTotals = async ({token}) => {
        return await axios.get(
            `${this.BASE_URL}/transaction/types/total`,
            {
                headers: {
                    token: token
                }
            }
        )
    }

    CreateTransaction = async ({body, token}) => {
        // "date" : "",
        // "title" : "",
        // "description" : "",
        // "amount" : "",
        // "type_id" : "",
        // "category_id" : ""
        return await axios.post(`${this.BASE_URL}/transaction/create`, body, {headers: {token}})
    }


}


export default TransactionServices;