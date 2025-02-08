"use server"

import { z } from "zod"
import bcrypt from "bcrypt"

import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mails"

/**
 * 
 * @param values
 * @returns 
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    // ユーザー登録時のバリデーションをチェック
    const validatedFields = RegisterSchema.safeParse(values)

    // バリデーションエラーがある場合はエラーメッセージを返す
    if (!validatedFields.success) {
        return { error: "フィールドの入力内容が正しくありません" }
    }

    // フィールドデータの取得
    const { email, password, comfirmPassword } = validatedFields.data

    // パスワードと確認パスワードが一致していない場合はエラーメッセージを返す
    if (password !== comfirmPassword) {
        return { error: "確認パスワードが正しくありません" }
    }

    // すでにメールアドレスが登録されているかを検証
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return { error: "このメールアドレスはすでに使用されています" }
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10)

    // ユーザーを作成
    await db.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    })

    // 認証情報を作成
    const verificationToken = await generateVerificationToken(email)

    // メール認証メールを送信する
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    )

    // ユーザー登録処理
    return { success: "メールアドレスに確認メールを送信しました" }
}
