import AxiosApi from "./AxiosApi";

export default class AxiosMessageApi {
    async getMessages(userId) {
        return AxiosApi.get(`/messages/${userId}`)
    }
}

