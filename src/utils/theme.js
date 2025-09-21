export function getTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) return theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('dark');
    if (theme === 'dark') document.body.classList.add('dark');
}