import axios from "axios";
import md5 from "md5";
import { config } from "./APIConfig";

const baseURL = config.BASE_URL;
const publicKey = config.PUBLIC_KEY;
const privateKey = config.PRIVATE_KEY;

export const getRequest = async (path, params) => {

    const queryString  = convertObjectToQueryString(params);

    const timestamp = Math.round(new Date().getTime()/1000).toString();
    const hash = md5(`${timestamp}${privateKey}${publicKey}`);

    const URL = `${baseURL}/${path}?${queryString}&apikey=${publicKey}&hash=${hash}&ts=${timestamp}`;

    const result = axios.get(URL);

    return result;
}


const convertObjectToQueryString = (params) => {
    
    let queryString = "";

    for(let param in params) {

        queryString += params[param]? `${param}=${params[param]}&` : "";
    }

    return queryString? queryString: "";
}


