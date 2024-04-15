import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
import { generateQueryString } from '../Utils/generateQuery';

class TransactionServices {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetTransactions = async ({token, filters}) => {
        console.log(`${this.BASE_URL}/transaction/get${generateQueryString(filters)}`)
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
        console.log(`${this.BASE_URL}/transaction/types`)
        return await axios.get(
            `${this.BASE_URL}/transaction/types`
        )
    }

    GetTransactionsByType = async ({type, token, filters}) => {
        console.log(`${this.BASE_URL}/transaction/get/type/${type}${generateQueryString(filters)}`)
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
        console.log(`${this.BASE_URL}/transaction/get/category/${type}${generateQueryString(filters)}`)
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
        console.log(`${this.BASE_URL}/transaction/types/total`)
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
        console.log(`${this.BASE_URL}/transaction/create`)
        return await axios.post(`${this.BASE_URL}/transaction/create`, body, {headers: {token}})
    }


}


export default TransactionServices;