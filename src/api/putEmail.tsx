import axios from 'axios';
import { getAppSetting } from "../getAppSetting";

const putEmail = async (updateEmailObj: { newEmail: string, confirmNewEmail: string, password: string }, accessToken: string) : Promise<void> => {
    // Init call
    const API_HOST = getAppSetting('REACT_APP_API_URL');

    // Define variables
    const { newEmail, confirmNewEmail, password } = updateEmailObj;
    const HEADERS = { Authorization: accessToken ? `Bearer ${accessToken}` : ''};
    const BODY = {
        newEmail : newEmail,
        confirmEmail : confirmNewEmail,
        password : password
    };

    // Call API
    try {
        return await axios.put(`${API_HOST}/email`, BODY, { headers : HEADERS });
    } catch (err) {
        console.log({err : err.message})
        throw err;
    };
};

export default putEmail;