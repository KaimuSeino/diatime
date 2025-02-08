// Split Configアプローチ
// 参考URL: https://authjs.dev/guides/edge-compatibility#middleware
// エッジ用と通常用に設定に設定を分割し、Middlewareではデータベース機能を排除
// 通常の環境ではデータベースアダプターを利用することで、両者の互換問題を解決する。

import bcrypt from "bcryptjs"
import Credentails from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        GitHub,
        Credentails({
            async authorize(credentials) {
                // ログイン時のバリデーション
                const validatedFields = LoginSchema.safeParse(credentials)

                // バリデーションチェックか完了した場合
                if (validatedFields.success) {
                    // メールアドレスとパスワードを取得する
                    const { email, password } = validatedFields.data

                    // データベースからユーザー情報を取得する
                    const user = await getUserByEmail(email)

                    // ユーザーまたはユーザーのパスワードが登録されていない場合
                    if (!user || !user.password) return null

                    // パスワードが正しいかをチェックする
                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    // パスワードが正しい場合はユーザー情報を返す
                    if (passwordsMatch) return user
                }

                // バリデーションエラーまたはパスワードが正しくない場合はnullを返す
                return null
            },
        }),
    ]
} satisfies NextAuthConfig