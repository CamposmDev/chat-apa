import { UserApi } from "../../api/axios";
import { createContext, useEffect, useState } from "react";

const AuthActionType = {
    LOGIN: 'LOGIN',
    REGISTER: "REGISTER",
    LOGOUT: "LOGOUT"
}

const AuthContext = createContext({})

const AuthContextProvider = (props) => {
    const [auth, setAuth] = useState({
        userId: null,
        loggedIn: false
    })

    useEffect(() => {
        console.log(auth)
    }, [auth])

    const authReducer = (action) => {
        const { type, payload } = action
        switch (type) {
            case AuthActionType.LOGIN: {
                return setAuth({
                    userId: payload.userId,
                    loggedIn: true
                })
            }
            case AuthActionType.REGISTER: {
                return setAuth({
                    userId: payload.userId,
                    loggedIn: true
                });
            }
            case AuthActionType.LOGOUT: {
                return setAuth({
                    userId: null,
                    loggedIn: false
                });
            }
            default: {
                return auth;
            }
        }
    }
    
    auth.loginUser = async function(payload) {
        try {
            const res = await UserApi.loginUser(payload)
            if (res.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN,
                    payload: {
                        userId: res.data.userId
                    }
                })
            }
        } catch (err) {
            console.log(err)
            // if (err.response.status === 400) {
                // console.log(err.response.message)
            // }
        }
        
    }

    auth.registerUser = async function(payload) {
        try {
            const res = await UserApi.registerUser(payload)
            if (res.status === 201) {
                authReducer({
                    type: AuthActionType.REGISTER,
                    payload: { 
                        userId: res.data.userId
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    auth.logoutUser = async function() {
        const res = await UserApi.logoutUser()
        if (res.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT
            })
        }
    }

    auth.getUsername = async function(userId) {
        try {
            const res = await UserApi.getUsername(userId);
            if (res.status === 200) {
                return res.data.username;
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthContextProvider
}