import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ isLogged, setIsLogged ] = useState(false);
    const [ user, setUser ] = useState(null);
    // The "user" state variable can contain a structure like the following:
    // { userId: 56, name: "Pedro Remoaldo", role: "Administrator" }
    // To access any of this properties on a component we need to reference them like:
    // user.userId

    const login = (userData) => {
        setIsLogged(true);
        setUser(userData);
    }

    const logout = () => {
        setIsLogged(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isLogged, user, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;