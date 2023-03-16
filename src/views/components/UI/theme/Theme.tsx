import "./theme.scss";

const Theme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) localStorage.setItem("theme", "light");
  theme && document.documentElement.setAttribute("data-theme", theme);

  const isDarkTheme = () => {
    if (theme === "dark") return true
    if (theme === "light") return false
  };

  const trans = () => {
    document.documentElement.classList.add("transition");
    const timeOut = window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 1000);
    return () => window.clearTimeout(timeOut);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      localStorage.setItem("theme", "dark");
      trans();
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      trans();
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  return (
    <div className="layout__theme-switch">
      <input
        type="checkbox"
        id="theme-switcher"
        name="theme-switcher"
        defaultChecked={isDarkTheme()}
        onChange={handleCheckbox}
      />
      <label htmlFor="theme-switcher" aria-hidden="true">
        Theme Toggle
      </label>
    </div>
  );
}

export default Theme;