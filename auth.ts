import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db), // データベースアダプターを設定

  /**
   * セッション管理にJWTを使用
   * 
   * 参考URL: https://authjs.dev/guides/refresh-token-rotation?framework=next-js#jwt-strategy
   * Refresh Token Rotationを使用するため
   */
  session: { strategy: "jwt" },
  
  ...authConfig,
})
