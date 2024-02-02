import AxiosApi from "./AxiosApi";

export default class AxiosUserApi {
    async loginUser(payload) {
        return AxiosApi.post('/user/login', payload)
    }

    async registerUser(payload) {
        return AxiosApi.post('/user/register', payload)
    }

    async logoutUser() {
        return AxiosApi.post('/user/logout')
    }

    async getUsername(userId) {
        return AxiosApi.get(`/user/username/${userId}`)
    }
}

