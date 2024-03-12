import { useCallback, useEffect, useState, useContext } from "react";
import ReminderServices from "../../Services/ReminderServices";
import { AuthContext } from "../../Context/UserContext";

const SERVICE = new ReminderServices();

const useReminders = ({filters = {}}) => {
    const { User } = useContext(AuthContext);
    const [Reminders, setReminders] = useState([]);
    const [Pagination, setPagination] = useState({});
    const [error, setError] = useState(null);

    const fetchReminders = useCallback (async ({filters}) => {
        try {
            const {data, pagination, success, message} = await SERVICE.GetReminder({token: User.token, filters});

            if(!success) {
                console.log(message);
                setReminders([]);
                setPagination({});
                setError(message);
            }

            setReminders(data)
            setPagination(pagination)
        } catch(error) {
            console.log(error);
            setReminders([]);
            setPagination({});
            setError(error);
        }
    }, [setReminders])

    useEffect(() => {
        fetchReminders({filters})
    }, [fetchReminders])

    return {
        Reminders,
        Pagination,
        fetchReminders,
        error
    }
}

export default useReminders;