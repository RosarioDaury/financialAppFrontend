import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [User, setUser] = useState({});
    const [IsAuth, setIsAuth] = useState(false);

    const value = {User, setUser, IsAuth, setIsAuth};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export {AuthContext, AuthProvider};
