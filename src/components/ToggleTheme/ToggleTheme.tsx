import { loadStyleSheet } from "components/Theme/Theme";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button, Icon } from "rsuite";

const ToggleTheme = () => {
  const [isToggleThemeEnable, setIsToggleThemeEnable] = useState<boolean>(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setIsToggleThemeEnable(true);
    }, 1000);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setIsToggleThemeEnable(false);
    loadStyleSheet(newTheme, setTheme);
  };

  return (
    <Button
      appearance="link"
      disabled={!isToggleThemeEnable}
      onClick={toggleTheme}
    >
      <>
        {theme === "dark" && (
          <Icon
            icon="sun-o"
            className="text-white animate__animated animate__slow animate__zoomIn"
            componentClass="span"
            size="lg"
          />
        )}
        {theme === "light" && (
          <Icon
            icon="moon-o"
            className="text-black animate__animated animate__slow animate__zoomIn"
            componentClass="span"
            size="lg"
          />
        )}
      </>
    </Button>
  );
};
export default ToggleTheme;
