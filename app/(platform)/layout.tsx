import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const MainLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    // サイドバーの開閉状態をCookieを用いて永続化（ページリロードやSSRをまたいでも維持）する
    // ユーザーがサイドバーを閉じる・開く状態を再読み込み後も保てるようにする
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarTrigger />
                <main>
                    {children}
                </main>
        </SidebarProvider>
    );
}

export default MainLayout;