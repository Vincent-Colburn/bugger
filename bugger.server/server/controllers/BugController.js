import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugServices'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .post('', this.createBug)
      .put('/:id', this.editBug)
  }

  async getAll(req, res, next) {
    try {
      res.send(await bugService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await bugService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugService.createBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugService.editBug(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugService.editBug(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
