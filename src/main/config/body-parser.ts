import { Express } from 'express'
import * as parser from 'body-parser'

export const bodyParser = (app: Express) => {
    app.use(parser.urlencoded({extended: true}))
    app.use(parser.json())
}   