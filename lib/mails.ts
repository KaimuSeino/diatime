import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.PUBLIC_DOMAIN}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "メールアドレスを確認してください",
        html: `<p>Click <a href="${confirmLink}">here</a></p>`
    })
}
