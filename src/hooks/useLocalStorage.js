import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
    const stored = localStorage.getItem(key);
    const data = stored ? JSON.parse(stored) : initialValue;
    const [savedCharts, setSavedCharts] = useState(data);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(savedCharts));
    }, [savedCharts]);

    return [savedCharts, setSavedCharts];

}