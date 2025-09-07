import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=> {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, [])

  const login = (userData) => {
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true)
    setUser(userData)
  }
  
  const logout = () => {
    localStorage.setItem("isLoggedIn", "false")
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}