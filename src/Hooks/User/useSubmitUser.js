import { useCallback, useState } from "react";
import UserServices from "../../Services/UserServices";
import { Alert } from "react-native";
const Service = new UserServices()

const useSubmitUser = () => {
    const [Error, setError] = useState(null)
    const [Success, setSuccess] = useState(null)

    const submitForm = async (form) => {
        try{
            delete form.passwordConfirm
            const data = await Service.CreateUser(form);
        } catch(error) {
            console.log(data.response.data.error)
            setError(data.response.data.error)
            Alert.alert('Error while creating user')
        }
        
        
    }

    const createUser = async ({form}) => {
        await submitForm(form)
    }

    return {
        createUser,
        Error,
        Success
    }
    
}

export default useSubmitUser