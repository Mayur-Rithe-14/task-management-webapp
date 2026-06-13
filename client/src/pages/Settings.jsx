import {useState} from "react";
import MainLayout from "../layouts/MainLayout";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import API from "../services/api";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [profile, setProfile] = useState({
    name: user.name || "",
    email: user.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const {data} = await API.put("/user/profile", profile);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
        }),
      );
      toast.success("Profile updated successfully");
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error("Failed to update profile", error);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      await API.put("/user/password", passwordData);
      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <MainLayout>
      <div className="settings-page">
        <div className="settings-header">
          <h2>Settings</h2>
          <p>Manage your account preferences.</p>
        </div>

        <div className="profile-section">
          {/* Left Profile Card */}

          <div className="profile-card">
            <div className="profile-avatar">
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <h3>{profile.name}</h3>
            <p>{profile.email}</p>
            <span className="status-badge">Active Account</span>
          </div>

          {/* Right Form */}

          <div className="settings-card">
            <h3>Profile Settings</h3>

            <form onSubmit={updateProfile}>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
              />

              <button type="submit">Save Profile</button>
            </form>
          </div>
        </div>

        <div className="settings-card">
          <h3>Security</h3>

          <form onSubmit={changePassword}>
            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
            />

            <button type="submit">Update Password</button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
