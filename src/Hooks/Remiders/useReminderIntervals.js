import { useCallback, useEffect, useState } from "react";
import ReminderServices from "../../Services/ReminderServices";

const SERVICE = new ReminderServices();

const useReminderIntervals = () => {
    const [Intervals, setIntervals] = useState([]);
    const [error, setError] = useState(null);

    const fetchIntervals = useCallback (async () => {
        try {
            setIntervals([{id: 1, interval: 7, title: "Weekly"}, {id: 2, interval: 15, title: "Biweekly"}, {id: 3, interval: 30, title: "Monthly"}])
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