import express from 'express'

const app = express()

import { router } from './router'

app.use(router)

app.listen(3000)