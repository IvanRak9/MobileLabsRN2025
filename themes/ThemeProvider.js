import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Темна тема за замовчуванням

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
