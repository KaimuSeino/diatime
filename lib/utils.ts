import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * clsx と twMerge を組み合わせてクラス名を結合するユーティリティ関数
 *
 * - clsx: 条件付きでクラスを切り替えたり、配列やオブジェクトでクラスを指定できる。
 * - twMerge: Tailwind CSS の競合クラスを後方優先でまとめる。
 * @param inputs - 結合したいクラス名や条件付きクラスを指定した配列
 * @returns 結合・競合解消されたクラス名の文字列
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
