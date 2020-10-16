import axio from 'axios';

const getFeed = async (sessionId: string): Promise<any> => {
  // Set up the call
  const API_HOST =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL;
  const FEED_ENDPOINT = '/feed';
  const REQUEST_URL = `${API_HOST}${FEED_ENDPOINT}?session-id=${sessionId}`;
  try {
    // Call the api
    const response = await axio.get(REQUEST_URL);
    const data = response.data;
    console.log(data);
    return data;
    // Return the response object
  } catch (err) {
    // handle errors
    console.error(`Error`, err.message);
  }
};

export default getFeed;
