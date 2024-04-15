import {BASE_URL, SECRET_KEY} from '@env';
import axios from 'axios';
import { generateQueryString } from '../Utils/generateQuery';

class ReminderServices {
    constructor() {
        this.BASE_URL = BASE_URL
    }

    GetReminder = async ({token, filters}) => {
        try{
            console.log(`${this.BASE_URL}/reminder/get${generateQueryString(filters)}`)
            const {data} = await axios.get(`${this.BASE_URL}/reminder/get${generateQueryString(filters)}`,{ headers: { token }})
            console.log('REMINDER', data)
            return data
        } catch(error) {
            return error.response.data
        }
    }

    GetReminderById = async({token, id}) => {
        try{
            console.log(`${this.BASE_URL}/reminder/get/${id}`)
            const {data} = await axios.get(`${this.BASE_URL}/reminder/get/${id}`,{ headers: { token }})
            return data
        } catch(error) {
            return error.response.data
        }
    }

    GetReminderIntervals = async () => {
        try{
            console.log(`${this.BASE_URL}/interval/get`)
            const {data} = await axios.get(`${this.BASE_URL}/interval/get`);
            console.log('REMINDER INTERVALS', data)
            return data
        } catch(error) {
            return error.response.data
        }
    }

    CreateReminder= async ({body, token}) => {
        console.log(`${this.BASE_URL}/reminder/create`)
        return await axios.post(`${this.BASE_URL}/reminder/create`, body, { headers: { token }})
    }

    UpdateReminder = async ({token, id, body}) => {
        console.log(`${this.BASE_URL}/reminder/update/${id}`)
        return await axios.put(`${this.BASE_URL}/reminder/update/${id}`, body, { headers: { token }})
    }

    DeleteReminder = async ({token, id}) => {
        console.log(`${this.BASE_URL}/reminder/delete/${id}`)
        return await axios.delete(`${this.BASE_URL}/reminder/delete/${id}`,{ headers: { token }})
    }

    CreateReminderNotification = async ({notification}) => {
        console.log(`${this.BASE_URL}/reminder/notification/create`)
        return await axios.post(`${this.BASE_URL}/reminder/notification/create`, notification);
    }

    UpdateReminderNotification = async ({currentId, newId}) => {
        console.log(`${this.BASE_URL}/reminder/notification/update`)
        return await axios.put(`${this.BASE_URL}/reminder/notification/update`, {currentId, newId});
    }

    DeleteReminderNotification = async ({id}) => {
        console.log(`${this.BASE_URL}/reminder/notification/delete/${id}`)
        return await axios.delete(`${this.BASE_URL}/reminder/notification/delete/${id}`);

    }
}

export default ReminderServices;