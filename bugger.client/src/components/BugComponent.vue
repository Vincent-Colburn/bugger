<template>
  <div class="col-12">
    <router-link :to="{ name: 'BugDetailsPage', params: { id: bugProps.id}}" class="words">
      <div class="col-12 bug-component">
        <span :class="getClass()"><b>Bug:</b> {{ bugProps.title }}   <span> <b>| Reported By:</b> {{ bugProps.creatorEmail }}</span>
          <span> | <b>Status</b>: {{ bugProps.closed }} </span>
          <span><b> |  Last Modified</b> :  {{ new Date(bugProps.updatedAt).toString(Intl.DateTimeFormat.prototype.formatToParts) }} </span></span>
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
      bugs: computed(() => AppState.bugs.filter(b => b.closed === true))

    })
    return {
      state,
      async closeBoard(bugProps) {
        try {
          await bugServivce.closeBoard(props.bugProps.id)
        } catch (error) {
          logger.error(error)
        }
      },
      getClass(bugProps) {
        return {
          'text-success': props.bugProps.closed,
          'text-danger': !props.bugProps.closed
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
