import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"

// ログイン画面のヘッダー部分
const font = Poppins({
    subsets: ['latin'],
    weight: ["600"],
})

interface HeaderProps {
    label: string
}

export const Header = ({
    label
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
                "text-2xl font-semibold",
                font.className
            )}>
                APP
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}