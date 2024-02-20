import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import CategoryServices from "../../Services/CategoryServices";

const SERVICE = new CategoryServices();

const useCategories = ({filters}) => {
    const { User, IsAuth } = useContext(AuthContext);
    const [Categories, setCategories] = useState([]);
    const [Pagination, setPagination] = useState({});
    const [error, setError] = useState(null);

    const fetchCategories = useCallback (async ({filters}) => {
        try{
            const {data: categories} = await SERVICE.GetCategories({token: User.token, filters })
            const {success, data, pagination, message} = categories

            if(!success) {
                setCategories([]);
                setPagination({});
                setError(message);
                return
            }

            setCategories(data);
            setPagination(pagination);

        } catch(e) {
            console.log(e)
            setCategories([])
            setError(e)
        }
    }, 
    [setCategories])
    

    useEffect(() => {
		fetchCategories({filters})
	}, [fetchCategories])

    return {
        Categories,
        Pagination,
        fetchCategories,
        error
    }

}

export default useCategories