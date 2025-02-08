"use client"

import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { CardWrapper } from "@/components/auth/card-wrapper"

import { BeatLoader } from "react-spinners"
import { newVerification } from "@/app/auth/new-verification/action"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(async () => {
        if (success || error) return;

        if (!token) {
            setError("トークンがありません！")
            return
        }

        try {
            const response = await newVerification(token)
            setSuccess(response.success)
            setError(response.error)
            console.log(response)
        } catch {
            setError("エラーが発生しました")
        }
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="あなたのメールを認証する"
            backButtonLabel="ログインに戻る"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    )
}
