import { useEffect, useState } from 'react';

export const useDarkMode = () => {
    
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved : 'light';
    });

    
    useEffect(() => {
        const root = window.document.documentElement;
        console.log("Root : ", root);
        

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    // Toggle function
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
};
