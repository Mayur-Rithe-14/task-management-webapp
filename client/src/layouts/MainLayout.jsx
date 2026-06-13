import {useState, useEffect} from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

import "./MainLayout.css";

const MainLayout = ({children, pageTitle}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    if (newTheme) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="layout">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-content">
        <Header
          pageTitle={pageTitle}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
