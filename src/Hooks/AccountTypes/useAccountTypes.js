import { useState, useCallback, useEffect } from "react";
import ApiService from "../../Services/ApiServices";
const Service = new ApiService();

const useAccountTypes = () => {
    const [accountTypes, setAccountTypes] = useState([]);
    const [error, setError] = useState(null)

    const fetchAcountTypes = useCallback(() => {
        try{
            let response = Service.GetAll('/users/types/get');
            setAccountTypes(response)
        } catch(e) {
            console.log(e);
            setAccountTypes([])
            setError(e)
        }
       
    }, [setAccountTypes])

    useEffect(() => {
		fetchAcountTypes()
	}, [fetchAcountTypes])

    return {
        accountTypes,
        setAccountTypes,
        error
    }

}


export default useAccountTypes;