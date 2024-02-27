import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import CategoryServices from "../../Services/CategoryServices";

const SERVICE = new CategoryServices();

const useCategoriesChart = () => {
    const { User, IsAuth } = useContext(AuthContext);
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    const fetchCategoriesChart = useCallback (async () => {
        try{
            const {data: categories} = await SERVICE.GetCategories({token: User.token, filters: {}})
            const {success, data: categoryData, message} = categories

            if(!success) {
                setData({});
                setError(message);
                return
            }

            let dataArray = [];
            let labelsArray = [];

            categoryData.map(el => {
                labelsArray.push(el.name);
                dataArray.push((el.total / el.limit) * 100);
            })

            setData({
                labels: labelsArray,
                datasets: [
                    {
                        data: dataArray,
                    },
                ],
            });

        } catch(e) {
            setCategories([]);
            setError(message);
        }
    }, 
    [setData])
    

    useEffect(() => {
		fetchCategoriesChart()
	}, [fetchCategoriesChart])

    return {
        data,
        fetchCategoriesChart,
        error
    }

}

export default useCategoriesChart