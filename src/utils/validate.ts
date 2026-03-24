export function isEmail(value: string): boolean {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return reg.test(value)
}

export function isPhone(value: string): boolean {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(value)
}

export function isUrl(value: string): boolean {
  const reg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  return reg.test(value)
}

export function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || value === ''
}
