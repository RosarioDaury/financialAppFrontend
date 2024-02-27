import { useCallback, useEffect, useState, useContext } from "react";
import TransactionServices from "../../Services/TransactionServices";
import { AuthContext } from "../../Context/UserContext";

const SERVICE = new TransactionServices();

const useTransactionTotals = () => {
    const { User, IsAuth } = useContext(AuthContext);
    const [IncomeTotal, setIncomeTotal] = useState([]);
    const [OutcomeTotal, setOutcomeTotal] = useState([]);
    const [error, setError] = useState(null)

    const fetchTransactionTotals = useCallback (async () => {
        try{
            const {data: response} = await SERVICE.GetTransactionsTotals({token: User.token})
            const {data, success, message} = response;
            const income = data.filter(el => el.type_id == 1);
            const outcome = data.filter(el => el.type_id == 2);
            setIncomeTotal(income[0] ?? {amount: 0, type_id: 1 });
            setOutcomeTotal(outcome[0] ?? {amount: 0, type_id: 2 });

            if(!success) {
                console.log(message);
                setIncomeTotal({amount: 0, type_id: 1 });
                setOutcomeTotal({amount: 0, type_id: 2 })
                setError(message);
            }

        } catch(e) {
            console.log(e);
            setIncomeTotal({amount: 0, type_id: 1 });
            setOutcomeTotal({amount: 0, type_id: 2 })
            setError(e);
        }
    }, 
    [setIncomeTotal])
    

    useEffect(() => {
		fetchTransactionTotals();
	}, [fetchTransactionTotals])

    return {
        IncomeTotal,
        OutcomeTotal,
        fetchTransactionTotals,
        error
    }

}

export default useTransactionTotals