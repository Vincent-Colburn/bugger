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
      <!-- <div class="dropdown open">
        <button class="btn btn-secondary dropdown-toggle"
                type="button"
                id="triggerId"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
        >
          Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="triggerId">
          <button class="dropdown-item" @click="filterBugs(false)" href="#">
            Open
          </button>
          <button class="dropdown-item" @click="closedBugs" href="#">
            Closed
          </button>
        </div>
      </div> -->
      <p> Filter by: </p>
      <br>
      <!-- <input type="checkbox" v-model="true"> -->
      <i class="fa fa-filter text-secondary" @click="filterBugs" aria-hidden="true">Filter by Status</i>
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
      bugs: computed(() => AppState.bugs),
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
      },

      closedBugs() {
        const closedBugs = computed(() => AppState.lists.filter(b => b.closed === true))
        console.log(closedBugs)
        return closedBugs
      }
      // filterBugs(choice) {
      //   console.log('this is the choice', choice)
      //   const buggers = AppState.bugs
      //   if (choice === true) {

      //   }
      //   const result = buggers.filter(buggers => buggers.closed === choice)
      //   AppState.bugs = result

      //   // wherever you're referencing to draw them, make sure you set it back to the value that you are referencing to draw them.
      // }

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
