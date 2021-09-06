import axios from 'axios';
import { getAppSetting } from "../getAppSetting";

export const getEmail = async (jwt : string) : Promise<Response> => {
    const API_HOST = getAppSetting('REACT_APP_API_URL');

    const HEADERS = { Authorization : jwt ? `Bearer ${jwt}` : ''};

    try {
        const resp = await axios.get(`${API_HOST}/email`, { headers: HEADERS })
        return resp.data.currentEmail;
    } catch (err) {
        console.log(err);
        throw err;
    };
};