import { climateApi } from './apiHelper';

export type getPasswordResetLinkPayload = {
    passwordResetLinkUuid: string;
};

export type getPasswordResetLinkResponse = {
    message?: string;
    error?: string;
};

export const getPasswordResetLink = async ({
    passwordResetLinkUuid,
}: getPasswordResetLinkPayload): Promise<getPasswordResetLinkResponse> => {
    
    const url = `/password-reset/${passwordResetLinkUuid}`;

    try {
        const request = await climateApi.get(url);
        return request.data;
    } catch (err) {
        throw err;
    }
};
