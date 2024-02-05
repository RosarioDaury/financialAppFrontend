import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
import { generateQueryString } from '../Utils/generateQuery';

class CategoryServices {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetCategories = async ({token}) => {
        return await axios.get(
            `${this.BASE_URL}/categories/get/user`,
            {
                headers: {
                    usertoken: token
                }
            }
        )
    }


    GetOneCategory = async ({token, categoryId}) => {
        return await axios.get(
            `${this.BASE_URL}/categories/get/one?category=${categoryId}`,
            {
                headers: {
                    usertoken: token
                }
            }
        )
    }
}


export default CategoryServices;