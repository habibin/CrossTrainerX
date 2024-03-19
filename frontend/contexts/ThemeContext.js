import React from "react";

// set the defaults
const ThemeContext = React.createContext({
  theme: "default",
  setTheme: () => {}
});

export default ThemeContext;