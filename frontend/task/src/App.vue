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
      axios.post(this.apiUrl, newTask)
          .then(response => {
            console.log("Added task!");
            console.log(response.data.data);
            this.allTasks = [...this.allTasks, response.data.data];
            this.$message({
              message: 'Success: Added task!',
              type: 'success'
            });
          })
          .catch(err => {
            this.$message.error("Failed to add task.");
            console.log(err);
          });
    },
    async deleteTask(taskId) {
      this.allTasks = this.allTasks.filter(task => task.id !== taskId);
      axios.delete(this.apiUrl + taskId)
          .then(response => {
            console.log(response.data.message);
            this.$message({
              message: 'Success: Deleted task!',
              type: 'success'
            });
          })
          .catch(err => {
            this.$message.error("Failed to delete task.");
            console.log(err);
          });
    },
    async doneTask(task) {
      axios.put(this.apiUrl + task.id, {is_done: task.is_done}) 
          .then(response => {
            console.log("Updated task!");
            console.log(response.data.data);
            this.$message({
              message: 'Success: Updated task!',
              type: 'success'
            });
          })
          .catch(err => {
            this.$message.error("Failed to update task.");
            console.log(err);
          });
    },
  },
  beforeCreate() {
      if (process.env.VUE_APP_SERVERLESS && process.env.VUE_APP_SERVERLESS == "true") {
        this.apiUrl = "/.netlify/functions/tasks/";
      } else {
        this.apiUrl = "/api/tasks/";
      }
      axios.get(this.apiUrl)
          .then(response => {
            console.log("Got tasks!");
            console.log(response.data.data);
            this.allTasks = response.data.data;
            this.isLoading = false;
          })
          .catch(err => {
            this.$message.error("Failed to get task data.");
            console.log(err);
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
