const oneMonth = 60 * 60 * 24 * 30;

export const buildCookie = (cookieName: string, cookieVal: string, maxAge = oneMonth) => {
  const cookieArgs = [
    `${cookieName}=${cookieVal}`,
    `Domain=localhost`,
    `Path=/`,
    'HttpOnly',
    `Max-Age=${maxAge}`,
  ]
  return cookieArgs.join('; ')
}
