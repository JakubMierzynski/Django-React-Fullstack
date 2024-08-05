import { useState, useEffect } from "react"
import api from "../api"
import Task from "../components/Task"
import Note from "../components/Note"
import "../styles/Home.css"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    const [tasks, setTasks] = useState([])
    const [description, setDescription] = useState("")
    const [taskTitle, setTaskTitle] = useState("")
    const [expirationDate, setExpirationDate] = useState(new Date)


    useEffect(() => {
        getNotes();
        getTasks();
    }, [])


    // NOTES
    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {setNotes(data); console.log(data)})
            .catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted")
                else alert("Failed to delete note")
                getNotes()
            })
            .catch((error) => alert(`error: ${error}`))
    }

    const createNote = (e) => {
        e.preventDefault()

        api
            .post("/api/notes/", {content, title})
            .then((res) => {
                if (res.status === 201) alert("Note created")
                else alert("Failed to create a note")
                getNotes()
            })
            .catch((error) => alert(error))
    }

    // TASKS
    const getTasks = () => {
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => {setTasks(data); console.log(data)})
            .catch((err) => alert(err))
    }

    const deleteTask = (id) => {
        api
            .delete(`/api/tasks/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted")
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
                if (res.status === 201) alert("Task created")
                else alert("Failed to create a task")
                getTasks()
            })
            .catch((error) => alert(error))
    }



    return (
        <>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => 
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                )}
            </div>

            <div>
                <h2>Tasks</h2>
                {tasks.map(task =>
                    <Task task={task} onDelete={deleteTask} key={task.id} />
                )}
            </div>

            <div>
                <h2>Create a note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        required 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title}
                    />
                    <br />
                    <label htmlFor="content">Content:</label>
                    <textarea 
                        id="content" 
                        name="content" 
                        required 
                        onChange={(e) => setContent(e.target.value)} 
                        value={content}
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>
                <h2>Create a task</h2>
                <form onSubmit={createTask}>
                    <label htmlFor="taskTitle">Title:</label>
                    <input 
                        type="text"
                        id="taskTitle"
                        name="taskTitle"
                        required
                        onChange={(e) => setTaskTitle(e.target.value)}
                        value={taskTitle}
                    />
                    <label htmlFor="description">Description:</label>
                    <br />
                    <textarea 
                        id="description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker disablePast
                            label="Task expiration date and time"
                            placeholder="Choose date and time"
                            format="L HH:mm a"
                            onChange={(e) => setExpirationDate(e)}
                        />
                    </LocalizationProvider>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default Home
