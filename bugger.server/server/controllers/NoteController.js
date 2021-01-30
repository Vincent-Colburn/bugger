import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteServices'

export class NoteController extends BaseController {
  constructor() {
    super('api')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/bugs/:id/notes', this.getAll)
      // .get('/notes/:id', this.getOne)
      .post('/notes', this.createNote)
      .put('/:id', this.editNote)
      .delete('/notes/:id', this.deleteNote)
  }

  async getAll(req, res, next) {
    try {
      res.send(await noteService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  // async getOne(req, res, next) {
  //   try {
  //     res.send(await noteService.getOne(req.paramd.noteId))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.createNote(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.editNote(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.deleteNote(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
