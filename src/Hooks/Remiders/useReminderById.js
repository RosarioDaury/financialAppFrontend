import { useCallback, useEffect, useState, useContext } from "react";
import ReminderServices from "../../Services/ReminderServices";
import { AuthContext } from "../../Context/UserContext";

const SERVICE = new ReminderServices();

const useReminderById = ({id}) => {
    const { User } = useContext(AuthContext);
    const [Reminder, setReminder] = useState({});
    const [error, setError] = useState(null);

    const fetchReminderById = useCallback(async ({id}) => {
        try {
            const {data, success, message} = await SERVICE.GetReminderById({token: User.token, id})
            const reminder = {
                ...data,
                date: new Date()
            }
            setReminder(reminder)
        } catch(error) {
            console.log(error)
            setReminder({})
            setError(error.error)
        }
    }, [setReminder])

    useEffect(() => {
        fetchReminderById({id})
    }, [fetchReminderById]);

    return {
        Reminder,
        setReminder,
        fetchReminderById,
        error,
    }
}

export default useReminderById