import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
import { generateQueryString } from '../Utils/generateQuery';

class CategoryServices {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetCategories = async ({token, filters}) => {
        return await axios.get(
            `${this.BASE_URL}/category/get${generateQueryString(filters)}`,
            {
                headers: {
                    token
                }
            }
        )
    }

    createCategory = async ({body, token}) => {
        return await axios.post(`${this.BASE_URL}/category/create`, body, {headers: {token}})
    }

    deleteCategory = async ({id, token}) => {
        return await axios.delete(`${this.BASE_URL}/category/delete/${id}`, {headers: {token}})
    }
}


export default CategoryServices;