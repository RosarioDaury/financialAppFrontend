import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import CategoryServices from "../../Services/CategoryServices";

const SERVICE = new CategoryServices();

const useCategory = ({id}) => {
    const { User, IsAuth } = useContext(AuthContext);
    const [Category, setCategory] = useState([]);
    const [error, setError] = useState(null)

    const fetchCategory = useCallback (async ({id}) => {
        try{
            const {data, message} = await SERVICE.GetOneCategory({token: User.token, categoryId: id})
            setCategory(data)
        } catch(e) {
            console.log(e)
            setCategory([])
            setTotal(0)
            setError(e)
        }
    }, 
    [setCategory])
    

    useEffect(() => {
		fetchCategory({id})
	}, [fetchCategory])

    return {
        Category,
        error
    }

}

export default useCategory