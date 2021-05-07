import { AddUserController } from '../../presentation/controllers/user/add-user-controller'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route.adapter'
import { UpdateUserController } from '../../presentation/controllers/user/update-user-controller'

export default (router: Router): void => {
  router.post('/user', adaptRoute(new AddUserController()))
  router.patch('/user', adaptRoute(new UpdateUserController()))
}