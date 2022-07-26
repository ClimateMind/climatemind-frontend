import { climateApi } from '../api/apiHelper';

export const postNewName = async ({
  conversationId,
  ...data
}: {
  conversationId: string;
  data: any;
}) => {
  const url = `/conversation/${conversationId}`;
  try {
    const request = await climateApi.get(url);

    return request.data;
  } catch (err) {
    throw err;
  }
};