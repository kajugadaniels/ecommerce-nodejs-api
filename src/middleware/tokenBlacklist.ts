const tokenBlacklist: Set<string> = new Set();

export const blacklistToken = (token: string) => {
    tokenBlacklist.add(token);
};

export const isTokenBlacklisted = (token: string): boolean => {
    return tokenBlacklist.has(token);
};
