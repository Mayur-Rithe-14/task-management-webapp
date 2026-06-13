import {useState, useEffect} from "react";
import API from "../../services/api";
import {toast} from "react-toastify";
import "./TaskModal.css";

const TaskModal = ({isOpen, onClose, onTaskCreated, selectedTask}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        status: selectedTask.status || "Pending",
        dueDate: selectedTask.dueDate ? selectedTask.dueDate.split("T")[0] : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedTask) {
        await API.put(`/tasks/${selectedTask._id}`, formData);
      } else {
        await API.post("/tasks", formData);
      }

      toast.success(
        selectedTask
          ? "Task updated successfully"
          : "Task created successfully",
      );

      onTaskCreated();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <div className="modal-header">
          <h2>{selectedTask ? "Edit Task" : "Create Task"}</h2>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <button type="submit" className="create-btn">
            {selectedTask ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
