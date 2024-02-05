import { useCallback, useState } from "react";
import ApiService from "../../Services/ApiServices";
import { Alert } from "react-native";
const Service = new ApiService()
const useSubmitUser = () => {
    const [Error, setError] = useState(null)
    const [Success, setSuccess] = useState(null)

    const submitForm = async (form) => {
        delete form.passwordConfirm
        await Service.CreateUser(form)
        .then(res => {
            setSuccess(res)
        })
        .catch(err => {
            setError(err)
            Alert.alert("Error while creating new User")
        })
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