import AxiosMessageApi from "./AxiosMessageApi"
import AxiosUserApi from "./AxiosUserApi"

const UserApi = new AxiosUserApi()
const MessageApi = new AxiosMessageApi();
    
export {
    UserApi,
    MessageApi
}