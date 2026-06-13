import {useEffect, useState} from "react";
import MainLayout from "../layouts/MainLayout";
import {
  FiClipboard,
  FiCheckCircle,
  FiLoader,
  FiClock,
  FiPieChart,
  FiTrendingUp,
} from "react-icons/fi";
import API from "../services/api";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import "./Analytics.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const {data} = await API.get("/tasks/stats");
        if (isMounted) {
          setStats(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const productivity =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const chartData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [stats.pending, stats.inProgress, stats.completed],
        backgroundColor: ["#F59E0B", "#3B82F6", "#10B981"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <MainLayout>
      <div className="analytics-page">
        <div className="analytics-header">
          <h2>Analytics</h2>
          <p>Track your productivity and task performance.</p>
        </div>

        <div className="analytics-stats">
          <div className="analytics-card">
            <div className="card-top">
              <FiClipboard />
            </div>
            <h4>Total Tasks</h4>
            <span>{stats.total}</span>
          </div>

          <div className="analytics-card">
            <div className="card-top">
              <FiCheckCircle />
            </div>
            <h4>Completed</h4>
            <span>{stats.completed}</span>
          </div>

          <div className="analytics-card">
            <div className="card-top">
              <FiClock />
            </div>
            <h4>Pending</h4>
            <span>{stats.pending}</span>
          </div>

          <div className="analytics-card">
            <div className="card-top">
              <FiLoader />
            </div>
            <h4>In Progress</h4>
            <span>{stats.inProgress}</span>
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-card">
            <div className="metric-header">
              <div className="metric-icon">
                <FiPieChart />
              </div>
              <h3>Task Status</h3>
            </div>

            <div className="chart-wrapper">
              <Doughnut
                data={chartData}
                options={{
                  animation: {
                    animateRotate: true,
                    duration: 1200,
                  },
                  cutout: "70%",
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="score-card">
            <div className="metric-header center">
              <div className="metric-icon">
                <FiTrendingUp />
              </div>
              <h3>Productivity Score</h3>
            </div>
            <div className="score-circle">{productivity}%</div>
            <p>Based on completed tasks.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
