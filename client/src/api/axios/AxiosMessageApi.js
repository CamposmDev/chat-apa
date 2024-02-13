import AxiosApi from "./AxiosApi";

export default class AxiosMessageApi {
    /**
     * Fetches messages associated with given user id
     * @param {string} userId User ID that we want to get messages from 
     * @returns {Promise<import("axios").AxiosResponse<any, any>>}
     */
    async getMessagesFrom(userId) {
        return AxiosApi.get(`/messages/${userId}`)
    }
}

