import { useState, useCallback, useEffect } from "react";
import UserServices from "../../Services/UserServices";
const Service = new UserServices();

const useAccountTypes = () => {
    const [accountTypes, setAccountTypes] = useState([]);
    const [error, setError] = useState(null)

    const fetchAcountTypes = useCallback(async () => {
        try{
            let {data: response} = await Service.GetUserTypes();
            let {success, data, error} = response
            if(error){
                console.log(error)
                setError(error)
                setAccountTypes([])
                return
            }
            setError(null);
            setAccountTypes(data);
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