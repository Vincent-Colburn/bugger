import { AppState } from '../AppState'
import { api } from './AxiosService'

class NoteService {
  async getNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data

    // console.log('should be your notes homie', res.data)
  }

  async createNote(newNote) {
    await api.post('api/notes', newNote)
    this.getNotes(newNote.bug)
  }

  async deleteNote(entireNote) {
    // console.log('should be your note id', entireNote)
    await api.delete('api/notes/' + entireNote.id)
    this.getNotes(entireNote.bug)
  }
}

export const noteService = new NoteService()
