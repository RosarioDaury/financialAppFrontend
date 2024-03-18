import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
import { generateQueryString } from '../Utils/generateQuery';

class ReminderServices {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetReminder = async ({token, filters}) => {
        try{
            const {data} = await axios.get(`${this.BASE_URL}/reminder/get${generateQueryString(filters)}`,{ headers: { token }})
            return data
        } catch(error) {
            return error.response.data
        }
    }

    GetReminderIntervals = async () => {
        try{
            const {data} = await axios.get(`${this.BASE_URL}/interval/get`);
            return data
        } catch(error) {
            return error.response.data
        }
    }

    CreateReminder= async ({body, token}) => {
        return await axios.post(`${this.BASE_URL}/reminder/create`, body, { headers: { token }})
    }

    UpdateReminder = async ({token, id, body}) => {
        try{
            const {data} = await axios.put(`${this.BASE_URL}/reminder/update/${id}`, body, { headers: { token }})
            return data
        } catch(error) {
            return e.response.data
        }
    }

    DeleteReminder = async ({token, id}) => {
        try{
            const {data} = await axios.delete(`${this.BASE_URL}/reminder/delete/${id}`,{ headers: { token }})
            return data
        } catch(error) {
            return e.response.data
        }
    }
}

export default ReminderServices;