import "./Sidebar.css";
import {FiHome, FiClipboard, FiBarChart2, FiLogOut} from "react-icons/fi";
import {useNavigate, useLocation} from "react-router-dom";

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login", {replace: true});
  };
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="logo">
          <div className="logo-icon">✓</div>
          <h2>TaskFlow</h2>
        </div>

        <nav className="menu">
          <div
            className={
              location.pathname === "/dashboard" ? "menu-item active" : "menu-item"
            }
            onClick={() => handleNavigate("/dashboard")}
          >
            <FiHome />
            Dashboard
          </div>

          <div
            className={
              location.pathname === "/tasks" ? "menu-item active" : "menu-item"
            }
            onClick={() => handleNavigate("/tasks")}
          >
            <FiClipboard />
            Tasks
          </div>

          <div
            className={
              location.pathname === "/analytics"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => handleNavigate("/analytics")}
          >
            <FiBarChart2 />
            Analytics
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="avatar">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "U"}
            </div>

            <div className="user-info">
              <h4>{user?.name || "User"}</h4>
              <p>{user?.email || "user@email.com"}</p>
            </div>
          </div>

          <button className="logout-btn" onClick={logout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
