import MoonOIcon from "@rsuite/icons/legacy/MoonO";
import SunOIcon from "@rsuite/icons/legacy/SunO";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "rsuite";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <Button appearance="subtle" onClick={toggleTheme}>
      <>
        {theme === "dark" && (
          <SunOIcon className="text-white animate__animated animate__zoomIn" />
        )}
        {theme === "light" && (
          <MoonOIcon className="text-black animate__animated animate__zoomIn" />
        )}
      </>
    </Button>
  );
};
export default ToggleTheme;
