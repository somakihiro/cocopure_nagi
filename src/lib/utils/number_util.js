// 数値を料金表示するためにカンマで区切る
export function separate(num) {
  return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
