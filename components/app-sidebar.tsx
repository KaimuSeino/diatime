"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ChevronUp, LogOut, Timer, User as UserIcon } from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useCurrentUser } from "@/hooks/use-current-user"

// サイドバーのメニュー項目リスト
const contentItems = [
    {
        title: "レコーダー",
        url: "/recorder",
        icon: Timer,
    }
]

interface AppSidebarProps {
    signOut: () => void;
}

const AppSidebar = ({
    signOut,
}: AppSidebarProps) => {
    const user = useCurrentUser()

    return (
        <Sidebar variant="sidebar">
            <SidebarHeader>
                <h2>App Name</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {contentItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive>
                                        <Link
                                            href={item.url}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    {user?.email}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem onClick={() => {}}>
                                    <UserIcon />
                                    <span>アカウント詳細</span>
                                </DropdownMenuItem>
                                <Separator />
                                <DropdownMenuItem onClick={signOut}>
                                    <LogOut />
                                    <span>ログアウト</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar