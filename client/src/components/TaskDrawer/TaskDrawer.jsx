import "./TaskDrawer.css";

const TaskDrawer = ({isOpen, onClose, task, onEdit}) => {
  if (!isOpen || !task) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />

      <div className="task-drawer">
        <div className="drawer-header">
          <h2>Task Details</h2>

          <button className="drawer-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="drawer-content">
          <div className="detail-group">
            <label>Title</label>
            <p>{task.title}</p>
          </div>

          <div className="detail-group">
            <label>Description</label>
            <p>{task.description || "No description"}</p>
          </div>

          <div className="detail-group">
            <label>Status</label>

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
          </div>

          <div className="detail-group">
            <label>Due Date</label>

            <p>
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
            </p>
          </div>

          <div className="detail-group">
            <label>Created At</label>

            <p>{new Date(task.createdAt).toLocaleDateString()}</p>
          </div>

          <button className="drawer-edit-btn" onClick={() => onEdit(task)}>
            Edit Task
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskDrawer;
