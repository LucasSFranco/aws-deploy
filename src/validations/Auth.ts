import Joi from 'joi'
import { compare } from 'bcryptjs'

import { PASSWORD_STRENGTH } from '../constants'
import { client } from '../../prisma/client'

export class AuthValidation {
  static register = Joi.object({
    username: Joi
      .string()
      .max(64)
      .required(),
    email: Joi
      .string()
      .email()
      .max(256)
      .external(AuthValidation.checkEmailUniqueness)
      .required(),
    password: Joi
      .string()
      .pattern(PASSWORD_STRENGTH)
      .min(8)
      .max(32)
      .required(),
    confirmPassword: Joi
      .string()
      .required()
      .valid(Joi.ref('password'))
  }).custom((data) => ({
    username: data.username,
    email: data.email,
    password: data.password
  }))

  static async checkEmailUniqueness (email: string) {
    const user = await client.user.findUnique({
      where: { email }
    })

    if (user) {
      throw new Joi.ValidationError(
        '"email" is already registered',
        [
          {
            message: '"email" is already registered',
            path: ['email'],
            type: 'email.alreadyRegistered',
            context: {
              key: 'email',
              label: 'email',
              value: email
            }
          }
        ],
        { value: email }
      )
    }
  }
}
