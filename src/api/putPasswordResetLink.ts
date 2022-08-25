import { climateApi } from './apiHelper';

export type putPasswordResetLinkPayload = {
    passwordResetLinkUuid: string;
    newPassword: string;
    confirmPassword: string;
};

export type putPasswordResetLinkResponse = {
    message?: string;
    error?: string | { field: string[] };
};

export const putPasswordResetLink = async ({
    passwordResetLinkUuid,
    newPassword,
    confirmPassword,
}: putPasswordResetLinkPayload): Promise<putPasswordResetLinkResponse> => {
    const url = `/password-reset/${passwordResetLinkUuid}`;

    try {
        // Make request for token
        const request = await climateApi.put(url, {
            newPassword,
            confirmPassword,
        });
        return request.data;
    } catch (err) {
        throw err;
    }
};
