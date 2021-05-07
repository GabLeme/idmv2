import express from 'express'
import setupRoutes from './routes'
import { bodyParser } from './body-parser'
const app = express()
bodyParser(app)
setupRoutes(app)
export default app