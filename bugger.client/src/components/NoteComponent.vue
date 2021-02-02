<template>
  <div class="container-fluid">
    <div class="col-12 border 7px">
      <p>
        <!-- v-if="state.account.email == noteProps.creatorEmail" -->
        Note by : {{ state.account.email }} <i class="fa fa-trash text-danger" @click="deleteNote" aria-hidden="true"></i>
      </p>
      <p>  {{ noteProps.content }} </p>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
export default {
  name: 'NoteComponent',
  props: {
    noteProps: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes)
    })
    return {
      state,

      async deleteNote() {
        const choice = confirm('Are you sure you want to delete this?')
        if (choice === true) {
          noteService.deleteNote(props.noteProps)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
