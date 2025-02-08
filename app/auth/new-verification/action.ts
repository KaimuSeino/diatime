"use server"

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"

export const newVerification = async (token: string) => {
    // DBに登録されているメール認証情報を取得
    const existingToken = await getVerificationTokenByToken(token)
    if (!existingToken) {
        return { error: "トークンが存在しません" }
    }

    // 有効期限をチェックする
    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
        return { error: "トークンの有効期限が切れています" }
    }

    // DBに登録されているユーザー情報を取得
    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { error: "メールアドレスが存在しません" }
    }

    // ユーザー情報にメール認証日時を記録する
    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingUser.email,
        }
    })

    return { success: "メールアドレスが確認されました" }
}
