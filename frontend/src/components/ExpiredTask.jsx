import React from "react";
import "../styles/ExpiredTask.css"


const Task = ({ task, onDelete }) => {
    const formattedExpirationDate = new Date(task.expiration_date).toLocaleDateString("pl-PL");
    const formattedExpirationTime = new Date(task.expiration_date).toTimeString("hh:mm").slice(0, 5);

    
    return (
        <div className="expired-task-container">
            <p className="alert">EXPIRED</p>
            <p className="expired-task-title">{task.title}</p>
            <p className="expired-task-content">{task.description}</p>
            <p className="expired-task-date">Do until: {formattedExpirationDate} {formattedExpirationTime}</p>
            <button className="delete-button" onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </div>
    );
};

export default Task;