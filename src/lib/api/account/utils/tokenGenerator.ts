
const defaultChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

export const generateToken = (length = 6, chars: string = defaultChars) => {
  const charLen = chars.length - 1
  return [...Array(length).keys()].reduce(
    (all) => {
      const idx: number = Math.floor(Math.random() * charLen)
      return all.concat(chars[idx])
    }, ''
  )
}