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

  async editBug(id, bug) {
    // Cannot find by Id in order to edit. 1. owner 2. closed is false
    const updated = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: bug.creatorId }, bug, { new: true })
    if (!updated) {
      throw new BadRequest('You are not the creator, or this is not a valid bug')
    }
    return updated
  }

  async closeBug(id, bug) {
    const updated = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: bug.creatorId }, bug, { new: true })
    if (!updated) {
      throw new BadRequest('No Bug exists with that ID')
    }
    return updated
  }
}

export const bugService = new BugService()
