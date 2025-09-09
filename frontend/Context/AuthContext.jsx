import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
    try{
      setUser(user)
    } catch(err){
      setUser(null)
      console.log(user, err)
    }

    setIsLoading(false)
  }, [])

  const login = (userData) => {
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("user", JSON.stringify(userData))
    setIsLoggedIn(true)
    setUser(userData)
  }
  
  const logout = () => {
    localStorage.setItem("isLoggedIn", "false")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}