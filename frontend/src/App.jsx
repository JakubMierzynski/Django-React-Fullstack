import react from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Tasks from "./pages/Tasks"
import Notes from "./pages/Notes"
import Navbar from "./components/Navbar"
import "./styles/index.css"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}


function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}


function App() {
  return ( 
  <>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/login"
          element={<Login />}
        />
        <Route 
          path="/logout"
          element={<Logout />}
        />
        <Route
          path="/register"
          element={<RegisterAndLogout />}
        />
        <Route 
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App
