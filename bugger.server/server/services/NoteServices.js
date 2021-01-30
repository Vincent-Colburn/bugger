import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async getAll(query) {
    return await dbContext.Notes.find(query).populate('creator')
  }

  // async getOne(noteId) {
  //   const noteFound = await dbContext.Notes.findById(noteId).populate('creator')
  //   if (!noteFound) {
  //     throw new BadRequest('No note exists with that ID')
  //   }
  //   return noteFound
  // }

  async createNote(body) {
    return await dbContext.Notes.create(body)
  }

  async editNote(id, title) {
    const updated = await dbContext.Notes.findByIdAndUpdate(id, title, { new: true })
    if (!updated) {
      throw new BadRequest('No Note exists with that ID')
    }
  }

  async deleteNote(id) {
    const deleted = await dbContext.Notes.findByIdAndDelete(id)
    console.log('this should be your deleted stuf', deleted)
  }
}

export const noteService = new NoteService()
