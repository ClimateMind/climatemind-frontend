import parseUrl from "url-parse"

export function isDevelopment(): boolean {
    const urlHostname = parseUrl(process.env.REACT_APP_API_URL as string, true).hostname;

    if (urlHostname === 'localhost' || urlHostname === '127.0.0.1' || process.env.NODE_ENV === 'development') {
        return true;
    }
    return false
}