import { useCallback, useEffect, useState } from "react";
import ReminderServices from "../../Services/ReminderServices";

const SERVICE = new ReminderServices();

const useReminderIntervals = () => {
    const [Intervals, setIntervals] = useState([]);
    const [error, setError] = useState(null);

    const fetchIntervals = useCallback (async () => {
        try {
            const {data, success, message} = await SERVICE.GetReminderIntervals();

            if(!success) {
                console.log(message);
                setIntervals([]);
                setError(message);
            }

            setIntervals(data)
        } catch(error) {
            console.log(error);
            setIntervals([]);
            setError(error);
        }
    }, [setIntervals])

    useEffect(() => {
        fetchIntervals()
    }, [fetchIntervals])

    return {
        Intervals,
        setIntervals,
        error
    }
}

export default useReminderIntervals;