import {useEffect, useState} from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import "./HomeDashboard.css";
import {
  FiTarget,
  FiClock,
  FiCheckCircle,
  FiClipboard,
  FiTrendingUp,
  FiLoader,
  FiCompass,
} from "react-icons/fi";
import {Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);
const HomeDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        const [statsRes, taskRes] = await Promise.all([
          API.get("/tasks/stats"),
          API.get("/tasks"),
        ]);

        if (!isMounted) return;

        setStats(statsRes.data);
        setTasks(taskRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const focusRate =
    stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0;

  const focusData = {
    datasets: [
      {
        data: [focusRate, 100 - focusRate],
        backgroundColor: ["#6c63ff", "#edf2f7"],
        borderWidth: 0,
      },
    ],
  };

  const recentTasks = tasks.slice(0, 5);

  return (
    <MainLayout>
      <div className="home-dashboard">
        {/* Welcome Card */}
        <div className="welcome-card">
          <div className="metric-header">
            <div className="metric-icon">
              <FiCompass />
            </div>
            <h3>Dashboard Overview</h3>
          </div>
          <h2>Welcome Back, {user?.name || "User"} 👋</h2>
          <p>
            You currently have <strong>{stats.pending}</strong> pending tasks.
          </p>
        </div>

        {/* Progress Card */}
        <div className="progress-card">
          <div className="metric-header">
            <div className="metric-icon">
              <FiTrendingUp />
            </div>

            <h3>Completion Progress</h3>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${completionRate}%`,
              }}
            />
          </div>

          <span>{completionRate}% Completed</span>
        </div>

        {/* Stats Grid */}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="card-top">
              <FiClipboard />
            </div>
            <h4>Total Tasks</h4>
            <span>{stats.total}</span>
          </div>

          <div className="stat-card">
            <div className="card-top">
              <FiClock />
            </div>
            <h4>Pending</h4>
            <span>{stats.pending}</span>
          </div>

          <div className="stat-card">
            <div className="card-top">
              <FiLoader />
            </div>
            <h4>In Progress</h4>
            <span>{stats.inProgress}</span>
          </div>

          <div className="stat-card">
            <div className="card-top">
              <FiCheckCircle />
            </div>
            <h4>Completed</h4>
            <span>{stats.completed}</span>
          </div>
        </div>

        {/* Dashboard Cards */}

        <div className="dashboard-row">
          {/* Recent Tasks */}

          <div className="dashboard-card">
            <div className="focus-header">
              <FiClock />
              <span>Recent Tasks</span>
            </div>

            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task._id} className="task-item">
                  {task.title}
                </div>
              ))
            ) : (
              <p>No tasks available.</p>
            )}
          </div>

          {/* Focus Rate */}

          <div className="dashboard-card">
            <div className="focus-header">
              <FiTarget />
              <span>Focus Rate</span>
            </div>

            <div className="focus-chart">
              <Doughnut
                data={focusData}
                options={{
                  cutout: "78%",
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: false,
                    },
                  },
                }}
              />

              <div className="focus-value">{focusRate}%</div>
            </div>

            <p className="focus-text">Tasks currently in progress</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeDashboard;
