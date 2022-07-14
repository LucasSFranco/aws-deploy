import { sign } from 'jsonwebtoken'

export const generateAccessToken = (userId: string) => {
  return sign({}, process.env.ACCESS_TOKEN_SECRET!, {
    subject: userId,
    expiresIn: 3600 // 1 hour
  })
}
