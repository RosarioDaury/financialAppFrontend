import { useCallback, useEffect, useState, useContext } from "react";
import TransactionServices from "../../Services/TransactionServices";
import { AuthContext } from "../../Context/UserContext";

const SERVICE = new TransactionServices();

const useTransactionsByType = ({filters = {}, type}) => {
    const { User } = useContext(AuthContext);
    const [Transactions, setTransactions] = useState([]);
    const [Pagination, setPagination] = useState({});
    const [error, setError] = useState(null)

    const fetchTransactions = useCallback (async ({filters, type}) => {
        try{
            const {data: response} = await SERVICE.GetTransactionsByType({type, token: User.token, filters})
            const {data, pagination, success, message} = response;
            setTransactions(data);
            setPagination(pagination);

            if(!success) {
                setTransactions([]);
                setPagination({});
                setError(message);
            }
        } catch(e) {
            console.log(e.response.data);
            setTransactions([]);
            setPagination({});
            setError(e.response.data.message);
        }
    }, 
    [setTransactions])
    

    useEffect(() => {
		fetchTransactions({filters, type})
	}, [fetchTransactions])

    return {
        Transactions,
        Pagination,
        fetchTransactions,
        error
    }

}

export default useTransactionsByType