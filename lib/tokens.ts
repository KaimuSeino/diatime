import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
    // すでに認証トークンが発行されているのかをチェックする
    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        await db.verificationToken.delete({ where: { id: existingToken.id } })
    }

    // トークンを発行
    const token = uuidv4()

    // 有効期限を設定
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    // メール認証のトークンを作成
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return verificationToken
}
