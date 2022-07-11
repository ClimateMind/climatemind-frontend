import { climateApi } from "./apiHelper";

type updateNamePayload = {
    userARating: number;
    state: number;
    receiverName: string;
    conversationId: string
}

type updateNameResponse = {
    userARating: number;
    state: number;
    conversationId: string;
    receiverName: string;
}

export const putOneConversation = async ({
    userARating,
    state,
    receiverName,
    conversationId
}: updateNamePayload): Promise<updateNameResponse> => {

    const url =`conversation/${conversationId}`

    try {
        const response = await climateApi.put(
            url,
            
        )

        return response.data
    } catch(err){
        throw err
    }

    
   
}