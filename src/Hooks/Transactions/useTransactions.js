import { useCallback, useEffect, useState, useContext } from "react";
import TransactionServices from "../../Services/TransactionServices";
import { AuthContext } from "../../Context/UserContext";

const SERVICE = new TransactionServices();

const useTransactions = ({filters = {}}) => {
    const { User, IsAuth } = useContext(AuthContext);
    const [Transactions, setTransactions] = useState([]);
    const [Total, setTotal] = useState()
    const [error, setError] = useState(null)

    const fetchTransactions = useCallback (async ({filters}) => {
        try{
            if(Object.keys(filters).length > 0){
                const {data, message} = await SERVICE.GetTransactions({token: User.token, filters})
                setTransactions(data)
            }   
        } catch(e) {
            console.log(e)
            setTransactions([])
            setTotal(0)
            setError(e)
        }
    }, 
    [setTransactions])
    

    useEffect(() => {
		fetchTransactions({filters})
	}, [fetchTransactions])

    return {
        Transactions,
        Total,
        error
    }

}

export default useTransactions