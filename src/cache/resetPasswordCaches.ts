export const resetCodes = new Map<string, { code: string; expiresAt: Date }>();
export const resetTokens = new Map<
  string,
  { email: string; expiresAt: Date }
>();
