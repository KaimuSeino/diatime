import { auth as middleware } from "@/auth"
import { apiAuthPrefix, authRoutes, DEFALT_LOGIN_REDIRECT, publicRoutes } from "@/routes";

export default middleware((req) => {
    // req.auth
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth

    // `/api/auth`から始まるURLの場合はtrue, それ以外はfalse
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    console.log("isApiAuthRoute: ", isApiAuthRoute)

    // ログインしていないユーザーでもアクセス可能なルートの判定
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    console.log("isPublicRoute: ", isPublicRoute)

    // `/api/auth`から始まるURLの場合アクセスを許可する
    if (isApiAuthRoute) {
      return
    }

    // 認証関連で使用するルートの判定
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    console.log("isAuthRoute: ", isAuthRoute)

    // 認証関連で使用するルートにアクセスした場合の処理
    if (isAuthRoute) {
      // ログインが完了済みの場合
      if (isLoggedIn) {
        // デフォルト設定のリダイレクト先に遷移する
        return Response.redirect(new URL(DEFALT_LOGIN_REDIRECT, nextUrl))
      }
      return
    }

    // ログインしていない かつ 未ログインでもアクセス可能なルートではない場合
    if (!isLoggedIn && !isPublicRoute) {
      // ログイン画面にリダイレクト
      return Response.redirect(new URL("/auth/login", nextUrl))
    }
})

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
}
