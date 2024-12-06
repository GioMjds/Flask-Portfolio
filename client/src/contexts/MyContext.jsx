/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
    });
    const [session, setSession] = useState(false);
    const [toggleLog, setToggleLog] = useState(false);
    const [toggleSesh, setToggleSesh] = useState(false);
    const [toggleUp, setToggleUp] = useState(false);
    const [result, setResult] = useState(0);
    const [runTimer, setRunTimer] = useState(false);

    return (
        <MyContext.Provider
            value={{ toggleUp, setToggleUp, isAuthenticated, setIsAuthenticated, userDetails, setUserDetails, session, setSession, toggleLog, setToggleLog, toggleSesh, setToggleSesh, result, setResult, runTimer, setRunTimer }}
        >
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => {
    return useContext(MyContext);
};