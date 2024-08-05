import { useState, useEffect } from "react"
import api from "../api"
import Task from "../components/Task"
import "../styles/Home.css"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pl';
import ExpiredTask from "../components/ExpiredTask"
import Navbar from "../components/Navbar";


function Tasks() {
    const [tasks, setTasks] = useState([])
    const [description, setDescription] = useState("")
    const [taskTitle, setTaskTitle] = useState("")
    const [expirationDate, setExpirationDate] = useState(new Date)

    const [showFormFlag, setShowFormFlag] = useState(false)


    useEffect(() => {
        getTasks();
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        setShowFormFlag(false)
        createTask(e)
        getTasks()
    }



    // TASKS

    const getTasks = () => {
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => data.sort(function(a, b){
                return new Date(b.expiration_date) - new Date(a.expiration_date)
            }).reverse())
            .then((data) => {setTasks(data)})
            .catch((err) => console.log(err))
            
    }

    const deleteTask = (id) => {
        api
            .delete(`/api/tasks/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted successfully")
                else alert("Failed to delete task")
                getTasks()
            })
            .catch((error) => alert(`error: ${error}`))
    }

    const createTask = (e) => {
        e.preventDefault()

        api
            .post("/api/tasks/", {title: taskTitle, description: description, expiration_date: expirationDate})
            .then((res) => {
                if (res.status === 201) alert("Task created successfully!")
                else alert("Failed to create a task")
                getTasks()
            })
            .catch((error) => alert(error))
    }



    return (
        <>  {showFormFlag ? true && 
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="taskTitle">Title:</label>
                    <input 
                        type="text"
                        id="taskTitle"
                        name="taskTitle"
                        placeholder="Task title"
                        required
                        onChange={(e) => setTaskTitle(e.target.value)}
                        value={taskTitle}
                    />
                    <label htmlFor="description">Description:</label>
                    <br />
                    <textarea 
                        id="description"
                        name="description"
                        placeholder="Task description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                        <DateTimePicker disablePast
                            label="Expiration date"
                            placeholder="Choose date and time"
                            views={['year', 'month', 'day', 'hours', 'minutes']}
                            timeSteps={{ hours: 1, minutes: 1}}
                            onChange={(e) => setExpirationDate(e)}
                        />
                    </LocalizationProvider>
                    <input type="submit" value="Submit"/>
                </form>
                <button className="form-cancel-button" onClick={() => setShowFormFlag(false)}>CANCEL</button>
            </div> 
            :
            <div>
                <button className="form-task-button" onClick={() => setShowFormFlag(true)}>CREATE NEW TASK</button>
            </div> 
            }
            
            
            <div>
                <h2>Tasks</h2>
                {tasks.map(task =>
                (new Date(task.expiration_date) > new Date()) ? 
                    <Task task={task} onDelete={deleteTask} key={task.id} />
                    :
                    <ExpiredTask task={task} onDelete={deleteTask} key={task.id}  />
                )}
            </div>
        </>
    )
}

export default Tasks
