/**
 * 和PHP一样的时间戳格式化函数
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */
export function date (data) {
  const date = new Date(data)
  const YYYY = date.getFullYear().toString()
  const MM = (date.getMonth() + 1).toString()
  const DD = date.getDate().toString()
  return YYYY + '-' + MM + '-' + DD
}
