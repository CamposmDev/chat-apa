// import { useNavigate } from "react-router-dom";
import { UserApi } from "../../api/axios";
import { createContext, useState } from "react";

const AuthActionType = {
    LOGIN: 'LOGIN',
    REGISTER: "REGISTER",
    LOGOUT: "LOGOUT"
}

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [auth, setAuth] = useState({
        user: null
    })

    // eslint-disable-next-line
    // const nav = useNavigate()

    const authReducer = (action) => {
        const { type, payload } = action
        switch (type) {
            case AuthActionType.LOGIN: {
                console.log('login user')
                return setAuth({
                    user: payload.user
                });
            }
            case AuthActionType.REGISTER: {
                return setAuth({
                    user: payload.user
                });
            }
            case AuthActionType.LOGOUT: {
                return setAuth({
                    user: null
                });
            }
            default: {
                return auth;
            }
        }
    }

    auth.loginUser = async function(payload) {
        const res = await UserApi.loginUser(payload)
        if (res.status === 200) {
            // nav('/')
            authReducer({
                type: AuthActionType.LOGIN,
                payload: {
                    user: res.data.user
                }
            })
        }
    }

    auth.registerUser = async function(payload) {
        const res = await UserApi.registerUser(payload)
        if (res.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER,
                payload: { 
                    user: res.data.user
                }
            })
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