export default class AuthActionType {
    static Login = new AuthActionType('login')
    static Register = new AuthActionType('register')
    static Logout = new AuthActionType('logout')

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        this.name = name;
    }
}