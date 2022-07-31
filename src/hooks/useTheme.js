import { useLayoutEffect, useState } from "react";


export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useLayoutEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return {theme, setTheme}
}