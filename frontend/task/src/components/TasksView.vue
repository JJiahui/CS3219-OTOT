<template>
  <div>
        <Task v-bind:task="task" 
          v-for="task in allTasks" v-bind:key="task._id"
          v-on:delete-task="$emit('delete-task', task._id)"
          v-on:done-task="$emit('done-task', task)"
        />
  </div>
</template>
<script>
import Task from './Task';
export default {
  name: 'TasksView',
  components: {
    Task
  },
  props: [
    "allTasks"
  ]
}
</script>
<style scoped>
</style>