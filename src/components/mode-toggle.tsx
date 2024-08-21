"use client"
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "next-themes"

export function ModeToggle() {
    const [isDarkMode, setDarkMode] = useState(false);
    const { setTheme } = useTheme()

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
