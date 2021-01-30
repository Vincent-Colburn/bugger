<template>
  <div class="container-fluid BoardDetailsPage">
    <div class="col-12">
      <span>Title</span> <span> <b>Close Ticket</b> </span><i class="fa fa-times-circle" aria-hidden="true" v-if="state.account.email == bug.creatorEmail" @click="closeBug"></i>
      <h1> Status: {{ state.bug.closed }} </h1>
      <h1 :contenteditable="state.editBug" @blur="editBug">
        {{ state.bug.title }}  <i class="fa fa-pencil border mx-2" aria-hidden="true" v-if="state.account.email == bug.creatorEmail" @click="state.editBug = !state.editBug, editBug(e)"></i>
      </h1>
      <br>
      <p :contenteditable="state.editBugBody" @blur="editBugBody">
        {{ state.bug.description }}
      </p> <i class="fa fa-pencil border mx-2" aria-hidden="true" v-if="state.account.email == bug.creatorEmail" @click="state.editBugBody = !state.editBugBody, editBugBody(e)"></i>
      <div class="col-">
        <p> Join the Conversation </p>
        <form action="form-inline border " @submit.prevent="createNote">
          <div class="row justify-content-left">
            <div class="col-4 pr-0">
              <input
                type="text"
                name="content"
                id="content"
                v-model="state.newNote.content"
                class="form-control d-flex"
                aria-describedby="title"
                placeholder="Enter your note here..."
              />
            </div>
            <div class="col-1 pl-0">
              <button type="submit" class="btn btn-success">
                +
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="row">
      <NoteComponent v-for="note in notes" :key="note.id" :note-props="note" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
import { logger } from '../utils/Logger'
export default {
  name: 'BugDetailspage',
  props: {
    bugProps: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),
      bug: computed(() => AppState.activeBug),
      newNote: {
        content: ''
        // bug: route.params.id
      }
    })
    onMounted(async() => {
      try {
        await bugService.getOne(route.params.id)
      } catch (error) {
        logger.error(error)
      }
      // this is for the notes once I get that far, when ready uncomment line 16
      try {
        // console.log('this should be your bug id', route.params.id)
        await noteService.getNotes(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      async createNote() {
        try {
          const bug = route.params.id
          const creatorEmail = state.account.email
          const content = state.newNote.content
          const newNote = { content, bug, creatorEmail }
          noteService.createNote(newNote)
          state.newNote.content = ''
        } catch (error) {
          logger.error(error)
        }
      },
      async closeBug() {
        try {
          const choice = confirm('Are you sure you want to close this Ticket? it is not reversable.')
          if (choice === true) {
            bugService.closeBug(state.bug)
          } else {
            alert('You chose.... poorly....')
          }
        } catch (error) {
          logger.error(error)
        }
      },

      async editBug(e) {
        // console.log('this is your new inner text', e)
        if (state.bug.closed === false) {
          bugService.editBug(state.bug, e.target.innerText)
        } else {
          alert('I cant let you do that, Star fox!')
        }
      },

      async editBugBody(e) {
        // console.log('this is your new inner text', e)
        if (state.bug.closed === false) {
          bugService.editBugBody(state.bug, e.target.innerText)
        } else {
          alert('I cant let you do that star fox!')
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
