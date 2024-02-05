import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import CategoryServices from "../../Services/CategoryServices";

const SERVICE = new CategoryServices();

const useCategories = () => {
    const { User, IsAuth } = useContext(AuthContext);
    const [Categories, setCategories] = useState([]);
    const [error, setError] = useState(null)

    const fetchCategories = useCallback (async () => {
        try{
            const {data, message} = await SERVICE.GetCategories({token: User.token })
            setCategories(data.data)
        } catch(e) {
            console.log(e)
            setCategories([])
            setTotal(0)
            setError(e)
        }
    }, 
    [setCategories])
    

    useEffect(() => {
		fetchCategories()
	}, [fetchCategories])

    return {
        Categories,
        error
    }

}

export default useCategories