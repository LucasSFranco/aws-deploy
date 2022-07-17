import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { client } from '../../prisma/client'
import { Schema } from '../validations'
import { generateAccessToken } from '../providers/generateAccessToken'
import { generateRefreshToken } from '../providers/generateRefreshToken'

export class AuthController {
  static async handleRegister (req: Request, res: Response) {
    const data = await Schema.auth.register
      .validateAsync(req.body, { abortEarly: false })

    const passwordHash = await hash(data.password, 8)
    const createdUser = await client.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: passwordHash
      }
    })

    const refreshToken = generateRefreshToken(createdUser.id)

    res.cookie('refreshToken', refreshToken, { maxAge: 120960000, httpOnly: true })

    const accessToken = generateAccessToken(createdUser.id)

    return res
      .status(201)
      .json({ accessToken })
  }

  static async handleLogin (req: Request, res: Response) {
    const data = await Schema.auth.login
      .validateAsync(req.body, { abortEarly: false })

    const refreshToken = generateRefreshToken(data)

    res.cookie('refreshToken', refreshToken, { maxAge: 120960000, httpOnly: true })

    const accessToken = generateAccessToken(data)

    return res
      .status(200)
      .json({ accessToken })
  }
}
