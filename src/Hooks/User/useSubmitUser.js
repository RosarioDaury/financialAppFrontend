import { useCallback, useState } from "react";
import UserServices from "../../Services/UserServices";
import { Alert } from "react-native";
const Service = new UserServices()
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