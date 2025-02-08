import { z } from "zod";

// ログイン時のバリデーション
export const LoginSchema = z.object({
    email: z.string().email({
        message: "メールアドレスの形式が正しくありません",
    }),
    password: z.string().min(6, {
        message: "パスワードは6文字以上で入力してください",
    }),
    code: z.optional(z.string()),
})

// ユーザー登録時のバリデーション
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "メールアドレスの形式が正しくありません",
    }),
    password: z.string().min(6, {
        message: "パスワードは6文字以上で入力してください",
    }),
    comfirmPassword: z.string().min(6, {
        message: "パスワードは6文字以上で入力してください"
    })
})
