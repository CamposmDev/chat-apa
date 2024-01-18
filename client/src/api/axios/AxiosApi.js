import axios from "axios";
import { BASE_URL } from "../../util/Contants";

axios.defaults.withCredentials = true;

const AxiosApi = axios.create({
    baseURL: BASE_URL
})

export default AxiosApi