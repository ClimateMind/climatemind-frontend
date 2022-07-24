import { climateApi } from '../api/apiHelper';

export type nameChange = {
  name: string;
};

export const postNewName = async (name: String): Promise<nameChange> => {
  const url = '/conversations/:conversationId';
  try {
    const request = await climateApi.put(url, name);
    return request.data;
  } catch (err) {
    throw err;
  }
};