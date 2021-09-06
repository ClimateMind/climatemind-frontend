import axios, { AxiosResponse } from 'axios';
import { getAppSetting } from "../getAppSetting";

const getEmail = async (jwt : {accessToken : string}) : Promise<Response> => {
    const API_HOST = getAppSetting('REACT_APP_API_URL');

    const HEADERS = { Authorization : jwt.accessToken ? `Bearer ${jwt.accessToken}` : ''};

    try {
        const resp = await axios.get(`${API_HOST}/email`, { headers: HEADERS })
        return resp.data.currentEmail;
    } catch (err) {
        console.log(err);
        throw err;
    };
};