<template>
  <div id="app" >
    <el-container v-loading="isLoading">
      <el-header>My Task List</el-header>
      <el-main>
    <TasksView v-bind:allTasks="allTasks" 
        v-on:delete-task="deleteTask"
        v-on:done-task="doneTask"
        />
    <AddTask v-on:add-task="addTask"/>
      </el-main>
  </el-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TasksView from './components/TasksView.vue'
import AddTask from './components/AddTask.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    // HelloWorld
    TasksView, AddTask
  },
  methods: {
    async addTask(newTask) {
      axios.post("/api/tasks/", newTask)
          .then(response => {
            console.log("Added task!");
            console.log(response.data.data);
            this.allTasks = [...this.allTasks, response.data.data];
          });
    },
    async deleteTask(taskId) {
      this.allTasks = this.allTasks.filter(task => task._id !== taskId);
      axios.delete("/api/tasks/" + taskId)
          .then(response => {
            console.log(response.data.message);
          });
    },
    async doneTask(task) {

        console.log("done task: " + task.is_done);
      axios.put("/api/tasks/" + task._id, {is_done: task.is_done}) 
          .then(response => {
            console.log("Updated task!");
            console.log(response.data.data);
          });
    },
  },
  beforeCreate() {
      axios.get('/api/tasks')
          .then(response => {
            console.log("Got tasks!");
            console.log(response.data.data);
            this.allTasks = response.data.data;
            this.isLoading = false;
          });
  },
  data() {
    return {
      isLoading: true,
      allTasks: [
        // {
        //   id: 1,
        //   title: 'Go workout',
        //   description: 'a',
        //   done: false
        // },
        // {
        //   id: 2,
        //   title: 'Do laundry',
        //   description: 'b',
        //   done: false
        // },
        // {
        //   id: 3,
        //   title: 'Cook food',
        //   description: 'c',
        //   done: false
        // },
        // {
        //   id: 4,
        //   title: 'Clean up room',
        //   description: 'd',
        //   done: false
        // },
        // {
        //   i: 5,
        //   title: 'Finish work',
        //   description: 'e',
        //   done: false
        // }
      ],
    }
  },
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-size: 18pt;
}
.el-main {
    background-color: #888f99;
}
</style>
