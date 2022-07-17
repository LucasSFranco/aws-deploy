import 'dotenv/config'
import 'express-async-errors'
import express from 'express';
import { errorHandler } from './middlewares/errorHandler'

import { router } from './router';

const app = express();

app.use(express.json())

app.use(router);

app.use(errorHandler)

export default app
