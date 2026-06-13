import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import {FiMenu, FiMoon, FiSun} from "react-icons/fi";

import "./Header.css";

const Header = ({setSidebarOpen, darkMode, toggleTheme}) => {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu />
        </button>
      </div>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
