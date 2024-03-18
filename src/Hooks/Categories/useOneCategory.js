import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import CategoryServices from "../../Services/CategoryServices";

const SERVICE = new CategoryServices();

const useCategory = ({id}) => {
    const { User } = useContext(AuthContext);
    const [Category, setCategory] = useState([]);
    const [error, setError] = useState(null)

    const fetchCategory = useCallback (async ({id}) => {
        try{
            const {data} = await SERVICE.GetOneCategory({token: User.token, categoryId: id})
            setCategory(data);
        } catch(e) {
            console.log(e.response.data)
            setCategory([])
            setError(e.response.data.error)
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