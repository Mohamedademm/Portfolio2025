import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    isDark: localStorage.getItem('theme') === 'dark',
    toggleTheme: () => set((state) => {
        const newIsDark = !state.isDark

        if (newIsDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }

        return { isDark: newIsDark }
    }),
    initTheme: () => set(() => {
        const hasTheme = 'theme' in localStorage
        const savedTheme = localStorage.getItem('theme')
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        const shouldBeDark = hasTheme ? savedTheme === 'dark' : systemDark

        if (shouldBeDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        return { isDark: shouldBeDark }
    })
}))
