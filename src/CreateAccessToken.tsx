export const ACCESS_TOKEN_REFRESH_INTERVAL_MS = 10_000;

export function createFakeAccessToken(): Promise<string> {
    return new Promise((resolve) => {
        const randomPart = Math.random().toString(36).slice(2, 10);
        const token = `A-${Date.now()}-${randomPart}`;
        resolve(token);
    });
}

export default createFakeAccessToken;