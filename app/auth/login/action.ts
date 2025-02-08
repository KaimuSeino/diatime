"use server"

import { signIn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mails"
import { generateVerificationToken } from "@/lib/tokens"
import { DEFALT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import { z } from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "無効なフィールドです" }
    }

    const { email, password, code } = validatedFields.data

    // メールアドレスが存在しているかどうかをチェックする
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "メールアドレスが存在しません" }
    }

    // ユーザーのメールアドレス認証が完了していない場合
    if (!existingUser.emailVerified) {
        // メール認証のトークンを作成する
        const verificationToken = await generateVerificationToken(existingUser.email)

        // 確認メールを送信する
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )

        return { success: "確認メールを送信しました" }
    }

    // TODO: ２段階認証を実装する

    try {
        // ログイン処理
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFALT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "アカウントが見つかりませんでした" }
                default:
                    return { error: "何か問題が発生しました" }
            }
        }

        throw error
    }
}
