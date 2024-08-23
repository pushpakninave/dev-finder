"use client"
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "next-themes"

export function ModeToggle() {

    const [isDarkMode, setDarkMode] = useState(false);
    const { setTheme } = useTheme()

    useEffect(() => {
        // get system theme mode and set it accordingly.
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(darkModeQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setDarkMode(e.matches);
            setTheme(e.matches ? 'dark' : 'light');
        }

        darkModeQuery.addEventListener('change', handleChange);
        return () => darkModeQuery.removeEventListener('change', handleChange);
    }, [setTheme]);

    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(checked);
        if (checked) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }
    return (
        <DarkModeSwitch
            onChange={toggleDarkMode}
            checked={isDarkMode}
        />
    )
}
