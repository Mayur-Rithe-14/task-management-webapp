import {useState, useRef, useEffect} from "react";
import {FiUser, FiSettings, FiLogOut, FiChevronDown} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import "./ProfileDropdown.css";

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        className="profile-trigger compact"
        onClick={() => setOpen(!open)}
      >
        <div className="DP">
          {user?.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : "U"}
        </div>

        <FiChevronDown />
      </button>

      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <strong>{user?.name}</strong>
            <small>{user?.email}</small>
          </div>

          <button
            className="dropdown-item"
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
          >
            <FiUser />
            My Profile
          </button>

          <button
            className="dropdown-item"
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
          >
            <FiSettings />
            Account Settings
          </button>

          <button className="dropdown-item logout-item" onClick={logout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
