import { useContext } from "react";
import { ThemeContext } from "@/context/theme/ThemeContext";
import "./theme.scss";

const Theme = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  if (!theme) localStorage.setItem("theme", "light");
  theme && document.documentElement.setAttribute("data-theme", theme);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme('dark')
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
      setTheme('light')
    }
  }

  return (
    <div className="layout__theme-switch">
      <input
        type="checkbox"
        id="theme-switcher"
        name="theme-switcher"
        defaultChecked={theme === "dark" ? true : false}
        onChange={handleCheckbox}
      />
      <label htmlFor="theme-switcher" aria-hidden="true">
        Theme Toggle
      </label>
    </div>
  );
}

export default Theme;