"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    const onClick = () => {
        router.push("/recorder")
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Hello, DIATIME!</h1>
            <p className="text-lg mt-4">This is a Next.js with Tailwind CSS template.</p>
            <Button onClick={onClick} className="mt-8">
                はじめる
            </Button>
        </div>
    )
}