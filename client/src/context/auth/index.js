import { createContext, useState } from "react";
import AuthStore from "./AuthStore";

const AuthContext = createContext(new AuthStore())

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        userId: null,
        isLoggedIn: false
    })

    const store = new AuthStore(auth, setAuth);

    return (
        <AuthContext.Provider value={store}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthContextProvider
}