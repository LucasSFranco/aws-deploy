import request from 'supertest'
import { Controller } from '../src/controllers'
import app from '../src';

const user = {
  username: 'Example',
  email: 'example@gmail.com',
  password: 'C0nnect!',
  confirmPassword: 'C0nnect!'
}

describe('Auth', () => {
  describe('Register', () => {
    it('sends an error if username is greater than 64 characters', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          ...user,
          username: '.................................................................' // 65 characters
        })
        .expect(400);

      expect(res.body).toEqual([
        {
          message: '"username" length must be less than or equal to 64 characters long',
          path: [ 'username' ],
          type: 'string.max',
          context: {
            limit: 64,
            value: '.................................................................',
            label: 'username',
            key: 'username'
          }
        }
      ])
    });

    it('sends an access token if username is less than or equal to 64 characters', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          ...user,
          username: '................................................................' // 64 characters
        })
        .expect(201)
    });

  })
})
