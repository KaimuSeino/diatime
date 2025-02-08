/**
 * ログインしていないユーザーでもアクセス可能
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
]

/**
 * ログイン認証に使用されるルートの配列
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

export const apiAuthPrefix = "/api/auth"

export const DEFALT_LOGIN_REDIRECT = "/recorder"