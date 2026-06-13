import {useEffect, useState} from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import TaskModal from "../components/TaskModal/TaskModal";
import {FiSearch} from "react-icons/fi";
import {toast} from "react-toastify";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import TaskDrawer from "../components/TaskDrawer/TaskDrawer";

import {
  FiClipboard,
  FiClock,
  FiLoader,
  FiCheckCircle,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTask, setDrawerTask] = useState(null);

  const fetchStats = async () => {
    try {
      const {data} = await API.get("/tasks/stats");
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const {data} = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshDashboard = () => {
    fetchStats();
    fetchTasks();
  };

  useEffect(() => {
    const loadDashboard = async () => {
      await Promise.all([fetchStats(), fetchTasks()]);
    };

    loadDashboard();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ? true : task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${taskToDelete._id}`);
      toast.success("Task deleted successfully");
      refreshDashboard();
      setDeleteModal(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="dashboard">
        <div className="search-row">
          <div className="search-box">
            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setSelectedTask(null);
              setShowModal(true);
            }}
          >
            + Add Task
          </button>
        </div>

        <div className="filter-row">
          <button
            className={
              filterStatus === "All" ? "filter-btn active-filter" : "filter-btn"
            }
            onClick={() => setFilterStatus("All")}
          >
            All
          </button>

          <button
            className={
              filterStatus === "Pending"
                ? "filter-btn active-filter"
                : "filter-btn"
            }
            onClick={() => setFilterStatus("Pending")}
          >
            Pending
          </button>

          <button
            className={
              filterStatus === "In Progress"
                ? "filter-btn active-filter"
                : "filter-btn"
            }
            onClick={() => setFilterStatus("In Progress")}
          >
            In Progress
          </button>

          <button
            className={
              filterStatus === "Completed"
                ? "filter-btn active-filter"
                : "filter-btn"
            }
            onClick={() => setFilterStatus("Completed")}
          >
            Completed
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <FiClipboard className="card-icon" />
            <h3>Total Tasks</h3>
            <span>{stats.total}</span>
          </div>

          <div className="stat-card">
            <FiClock className="card-icon" />
            <h3>Pending</h3>
            <span>{stats.pending}</span>
          </div>

          <div className="stat-card">
            <FiLoader className="card-icon" />
            <h3>In Progress</h3>
            <span>{stats.inProgress}</span>
          </div>

          <div className="stat-card">
            <FiCheckCircle className="card-icon" />
            <h3>Completed</h3>
            <span>{stats.completed}</span>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task._id}>
                    <td>
                      <span
                        className="task-link"
                        onClick={() => {
                          setDrawerTask(task);
                          setDrawerOpen(true);
                        }}
                      >
                        {task.title}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status ${
                          task.status === "Pending"
                            ? "pending"
                            : task.status === "In Progress"
                              ? "progress"
                              : "completed"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="action-btn"
                        onClick={() => {
                          setSelectedTask(task);
                          setShowModal(true);
                        }}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => {
                          setTaskToDelete(task);
                          setDeleteModal(true);
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No matching tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Task Cards */}
        <div className="mobile-task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div className="mobile-task-card" key={task._id}>
                <h4
                  className="mobile-task-title"
                  onClick={() => {
                    setDrawerTask(task);
                    setDrawerOpen(true);
                  }}
                >
                  {task.title}
                </h4>

                <div className="mobile-task-meta">
                  <span
                    className={`status ${
                      task.status === "Pending"
                        ? "pending"
                        : task.status === "In Progress"
                          ? "progress"
                          : "completed"
                    }`}
                  >
                    {task.status}
                  </span>

                  <span className="mobile-task-date">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </span>
                </div>

                <div className="mobile-actions">
                  <button
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTask(task);
                      setShowModal(true);
                    }}
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskToDelete(task);
                      setDeleteModal(true);
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="mobile-task-card">
              <p>No matching tasks found</p>
            </div>
          )}
        </div>

        <TaskModal
          isOpen={showModal}
          selectedTask={selectedTask}
          onClose={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
          onTaskCreated={refreshDashboard}
        />

        <DeleteModal
          isOpen={deleteModal}
          taskTitle={taskToDelete?.title}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDelete}
        />

        <TaskDrawer
          isOpen={drawerOpen}
          task={drawerTask}
          onClose={() => setDrawerOpen(false)}
          onEdit={(task) => {
            setDrawerTask(null);
            setDrawerOpen(false);

            setSelectedTask(task);
            setShowModal(true);
          }}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
