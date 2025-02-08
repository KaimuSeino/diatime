"use client"

import { useState } from "react"
import { CardWrapper } from "@/components/auth/card-wrapper"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { register } from "@/app/auth/register/action"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            comfirmPassword: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")
        try {
            const response = await register(values)
            setError(response.error)
            setSuccess(response.success)

            console.log(response)
        } catch (err) {
            setError("エラーが発生しました")
        }
    }

    return (
        <CardWrapper
            headerLabel="アカウントを作成"
            backButtonLabel="すでにアカウントをお持ちですか？"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>メールアドレス</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="xxxxx@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>パスワード</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                                                <FormField
                            control={form.control}
                            name="comfirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>確認パスワード</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        アカウントを作成
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
 
export default RegisterForm