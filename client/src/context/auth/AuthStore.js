import { MessageApi, UserApi } from "../../api/axios";
import AuthActionType from "./AuthAction";

export default class AuthStore {
    /**
     * 
     * @param {{userId: string, isLoggedIn: boolean}} auth
     * @param {(auth: {userId: string, isLoggedIn: boolean}) => void} setAuth 
     */
    constructor(auth = { userId: null, isLoggedIn: false }, setAuth = ({userId: string, isLoggedIn: boolean }) => { }) {
        this._auth = auth;
        this._setAuth = setAuth;
    }

    get userId() {
        return this._auth.userId;
    }

    get isLoggedIn() {
        return this._auth.isLoggedIn;
    }

    /**
     * 
     * @param {{type: AuthActionType, payload?: {userId?: string, isLoggedIn?: boolean}}} action 
     */
    authReducer(action) {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.Login: {
                return this._setAuth({
                    userId: payload.userId,
                    isLoggedIn: true
                })
            }
            case AuthActionType.Register: {
                return this._setAuth({
                    userId: payload.userId,
                    isLoggedIn: true
                });
            }
            case AuthActionType.Logout: {
                return this._setAuth({
                    userId: null,
                    isLoggedIn: false
                });
            }
            default: {
                return this._auth;
            }
        }
    }

    /**
     * 
     * @param {{credential: string, password: string}} payload 
     */
    async login(payload) {
        try {
            const res = await UserApi.loginUser(payload)
            if (res.status === 200) {
                this.authReducer({
                    type: AuthActionType.Login,
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

    async register(payload) {
        try {
            const res = await UserApi.registerUser(payload)
            if (res.status === 201) {
                this.authReducer({
                    type: AuthActionType.Register,
                    payload: { 
                        userId: res.data.userId
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    async logout() {
        const res = await UserApi.logoutUser();
        if (res.status === 200) {
            this.authReducer({
                type: AuthActionType.Logout
            })
        }
    }

    /**
     * 
     * @param {string} userId 
     * @returns {Promise<string>} 
     */
    async getUsernameById(userId) {
        try {
            const res = await UserApi.getUsernameById(userId);
            if (res.status === 200) {
                return res.data.username;
            }
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Fetches all users that exist
     * @returns {Promise<Array<Object> | null>}
     */
    async getUsers() {
        try {
            const res = await UserApi.getUsers();
            if (res.status === 200) {
                return res.data.users;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    }

    async getMessagesFrom(userId) {
        try {
            const res = await MessageApi.getMessagesFrom(userId);
            if (res.status === 200) {
                return res.data.messages;
            }
        } catch (err) {
            console.log(err);
        }
        return null
    }
}