import React from "react";
import "../styles/Task.css";

const Task = ({ task, onDelete }) => {
    const formattedExpirationDate = new Date(task.expiration_date).toLocaleDateString("pl-PL");
    const formattedExpirationTime = new Date(task.expiration_date).toTimeString("hh:mm").slice(0, 5);

    return (
        <div className="task-container">
            <p className="task-title">{task.title}</p>
            <p className="task-content">{task.description}</p>
            <p className="task-date">Do until: {formattedExpirationDate} {formattedExpirationTime}</p>
            <button className="delete-button" onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </div>
    );
};

export default Task;
