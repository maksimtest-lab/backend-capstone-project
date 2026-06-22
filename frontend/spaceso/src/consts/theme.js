const themes = {
    light: {
        background: '#ffffff',
        color: '#000000'
    },
    dark: {
        background: '#000000',
        color: '#ffffff'
    }
};

export default themes;
export const getTheme = (theme) => {
    return themes[theme] || themes.light;
};
export const getThemeStyles = (theme) => {
    const currentTheme = getTheme(theme);
    return {
        backgroundColor: currentTheme.background,
        color: currentTheme.color
    };
};
export const getThemeClass = (theme) => {
    return theme === 'dark' ? 'dark-theme' : 'light-theme';
};