import "./DeleteModal.css";

const DeleteModal = ({isOpen, onClose, onConfirm, taskTitle}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <h3>Delete Task</h3>
        <p>
          Are you sure you want to delete
          <strong> {taskTitle}</strong> ?
        </p>

        <div className="delete-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="confirm-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
