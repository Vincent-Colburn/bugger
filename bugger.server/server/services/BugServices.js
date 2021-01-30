import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async getAll(query) {
    return await dbContext.Bugs.find(query).populate('creator')
  }

  async getOne(id) {
    const bugFound = await dbContext.Bugs.findById(id)
    if (!bugFound) {
      throw new BadRequest('No Bug exists with that ID')
    }
    return bugFound
  }

  async createBug(body) {
    return await dbContext.Bugs.create(body)
  }

  async editBug(id, title) {
    const updated = await dbContext.Bugs.findByIdAndUpdate(id, title, { new: true })
    if (!updated) {
      throw new BadRequest('No Bug exists with that ID')
    }
  }
}

export const bugService = new BugService()
