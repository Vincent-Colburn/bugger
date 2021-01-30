<template>
  <div class="col-12">
    <router-link :to="{ name: 'BugDetailsPage', params: { id: bugProps.id}}" class="words">
      <div class="col-12 bug-component">
        <span>Bug: <b> {{ bugProps.title }} </b> </span> <span> Reported By: {{ bugProps.creatorEmail }}</span> <span> Status: {{ bugProps.closed }}   <span></span>
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugServivce } from '../services/BugService'

export default {
  name: 'BugComponent',
  props: {
    bugProps: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs)

    })
    return {
      state,

      closeBoard(bugProps) {
        try {
          bugServivce.closeBoard(props.bugProps.id)
        } catch (error) {
          logger.error(error)
        }
      }
      // changeColor(bugProps) {
      //   if (props.bugsProps.closed === true) {
      //     color = text-danger
      //   } else {
      //     console.log('do somethign else')
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
