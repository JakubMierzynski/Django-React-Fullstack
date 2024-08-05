import React, { useState } from "react"
import "../styles/Navbar.css"
import { useEffect } from "react"


const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        setIsLogged(localStorage.access ? true : false)
        }
    )
    

    return (
        <header className="header">
            <a href="/" className="doIt">Do IT App</a>

            <nav className="navbar">
                <a href="/">Home</a>
                <a href="/tasks">Tasks</a>
                <a href="/notes">Notes</a>
                <a href="/contact">Contact</a>
                {isLogged ? <a href="/logout">Logout</a> : <a href="/login">Login</a>}
                {!isLogged && <a href="/register">Register</a>}
            </nav>
        </header>
    )
}

export default Navbar
