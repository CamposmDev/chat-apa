 import { MessageApi, UserApi } from "../../api/axios";
import AuthActionType from "./AuthAction";

/**
 * @typedef {Object} AuthType
 * @property {string} userId
 * @property {boolean} isLoggedIn
 */

//  * @property {Array<Object>} onlineUsers
//  * @property {Array<Object>} offlineUsers
//  * @property {string | null} selectedUserId
//  * @property {Array<Object>} messages

/**
 *  @typedef {(auth: AuthType) => void} AuthFunction
 */

export default class AuthStore {
    /**
     * @param {AuthType} auth
     * @param {AuthFunction} setAuth 
     */
    constructor(auth={userId: '', isLoggedIn: false}, setAuth=() => {}) {
        /** @type {AuthType}*/
        this._auth = auth;
        /** @type {AuthFunction} */
        this._setAuth = setAuth;
        /** @type {WebSocket | null} */
        // this._ws = null;
    }

    get userId() {
        return this._auth.userId;
    }

    get isLoggedIn() {
        return this._auth.isLoggedIn;
    }

    /**
     * @param {{type: AuthActionType, payload?: {userId?: string, isLoggedIn?: boolean, onlineUsers?: Array<String>, offlineUsers?: Array<String>, selectedUserId?: string, messages?: Array<Object>}}} action 
     */
    authReducer(action) {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.Login: {
                return this._setAuth({
                    ...this._auth,
                    userId: payload.userId,
                    isLoggedIn: true,
                })
            }
            case AuthActionType.Register: {
                return this._setAuth({
                    ...this._auth,
                    userId: payload.userId,
                    isLoggedIn: true
                });
            }
            case AuthActionType.Logout: {
                return this._setAuth({
                    ...this._auth,
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
     * Fetches all users that currently exist
     * @returns {Promise<Array<Object> | null>}
     */
    async getAllUsers() {
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

    /**
     * Fetches all messages from associated with given user id
     * @param {string} userId 
     * @returns {Promise<Array<Object> | null>}
     */
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