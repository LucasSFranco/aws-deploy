import { sign } from 'jsonwebtoken'

export const generateRefreshToken = (userId: string) => {
  return sign({}, process.env.REFRESH_TOKEN_SECRET!, {
    subject: userId,
    expiresIn: 1209600 // 14 days
  })
}
