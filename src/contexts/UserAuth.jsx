import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState({
        id: null,
        username: '',
        email: '',
        address: '',
        isAuthenticated: false, // Default to logged out
    });

    // Load user data from localStorage on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.isAuthenticated) {
                setUser(parsedUser);
            }
        }
    }, []);

    // Save user data to localStorage whenever it changes
    useEffect(() => {
        if (user.isAuthenticated) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (userData) => {
        setUser({
            ...userData,
            isAuthenticated: true,
        });
    };

    const logout = () => {
        setUser({
            id: null,
            username: '',
            email: '',
            address: '',
            isAuthenticated: false,
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
