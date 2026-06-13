import {useEffect, useState} from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import {
  FiUser,
  FiMail,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiLoader,
} from "react-icons/fi";
import "./Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      try {
        const {data} = await API.get("/tasks/stats");
        if (mounted) {
          setStats(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MainLayout>
      <div className="profile-page">
        <div className="profile-header">
          <h2>My Profile</h2>
          <p>View your account information and activity.</p>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <h2>{user?.name}</h2>
          <p>{user?.email}</p>

          <span className="member-badge">Active Member</span>
        </div>

        <div className="profile-grid">
          {/* Account Information */}

          <div className="info-card">
            <h3>Account Information</h3>

            <div className="info-item">
              <FiUser />
              <span>{user?.name}</span>
            </div>

            <div className="info-item">
              <FiMail />
              <span>{user?.email}</span>
            </div>

            <div className="info-item">
              <FiCheckCircle />
              <span>Active</span>
            </div>
          </div>

          {/* Activity Summary */}

          <div className="info-card">
            <h3>Activity Summary</h3>

            <div className="info-item">
              <FiClipboard />
              <span>Total Tasks: {stats.total}</span>
            </div>

            <div className="info-item">
              <FiCheckCircle />
              <span>Completed: {stats.completed}</span>
            </div>

            <div className="info-item">
              <FiClock />
              <span>Pending: {stats.pending}</span>
            </div>

            <div className="info-item">
              <FiLoader />
              <span>In Progress: {stats.inProgress}</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
