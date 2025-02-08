import { PrismaClient } from "@prisma/client"

// グローバル変数にPrismaClientを格納
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// PrismaClientインスタンスの生成・または再利用
export const db = globalForPrisma.prisma || new PrismaClient()

// 開発完了では、生成したPrismaClientインスタンスをグローバル変数に格納
// ホットリロード時にPrismaClientインスタンスが再生成されるのを防ぐ
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db
}
