<template>
  <div class="div container-fluid">
    <div class="row mx-3">
      <h1>Current Bugs Page</h1>
      <div class="col-12">
        <form action="form-inline border " @submit.prevent="createBug">
          <div class="row justify-content-center">
            <div class="col-4 pr-0">
              <input
                type="text"
                name="title"
                id="title"
                v-model="state.newBug.title"
                class="form-control d-flex"
                aria-describedby="title"
                placeholder="Bug Name..."
              />
              <input
                type="text"
                name="description"
                id="description"
                v-model="state.newBug.description"
                class="form-control d-flex"
                aria-describedby="title"
                placeholder="Bug Description..."
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
    </div>
    <div class="row">
      <BugComponent v-for="bug in bugs" :key="bug.id" :bug-props="bug" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  props: {
    bugProps: { type: Object, required: true }
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      newBug: {}
    })

    onMounted(async() => {
      try {
        await bugService.getBugs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      async createBug() {
        try {
          const creatorEmail = state.account.email
          const title = state.newBug.title
          const description = state.newBug.description
          const newBug = { creatorEmail, title, description }
          console.log('this is your new bug', newBug)
          const id = await bugService.createBug(newBug)
          state.newBug.title = ''
          state.newBug.description = ''
          router.push({ name: 'BugDetailsPage', params: { id } })
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
