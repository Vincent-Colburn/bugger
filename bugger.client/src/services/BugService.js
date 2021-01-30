import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    console.log(res.data)
  }

  async getOne(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async createBug(bugData) {
    const res = await api.post('api/bugs', bugData)
    console.log(res.data.id)
  }

  async editBug(bug, newTitle) {
    // console.log('this is your bug', bug)
    // console.log('this is your newContent', newContent)
    const newData = { title: newTitle }
    await api.put('api/bugs/' + bug.id, newData)
    this.getBugs(bug.id)
  }

  async editBugBody(bug, newBody) {
    // console.log('this is your bug', bug)
    // console.log('this is your newContent', newContent)
    const newData = { description: newBody }
    await api.put('api/bugs/' + bug.id, newData)
    this.getBugs(bug.id)
  }

  async closeBug(bug) {
    console.log('this is your bug in the service', bug)
    const bugClosed = { closed: true }
    await api.put('api/bugs/' + bug.id, bugClosed)
    this.getBugs(bug.id)
  }
}

export const bugService = new BugService()
