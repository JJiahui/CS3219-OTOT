<template>
  <div v-bind:class="{ 'is_done': task.is_done }">
      <el-card class="box-card" style="margin: 10px">
        <div slot="header" class="clearfix">
          <span>{{ task.title }}</span>
          <el-button style="float: right; padding: 10px" type="danger" icon="el-icon-delete" circle
              @click="$emit('delete-task', task._id)"></el-button>
          <el-checkbox style="float: right; padding: 10px" v-model="is_done"></el-checkbox>
        </div>
        Description:
        <div class="text item"> {{ task.description }} </div>
      </el-card>
  </div>
</template>
<script>
export default {
  name: 'Task',
  props: [
      "task"
  ],
  // methods: {
  //     markComplete() {
  //       this.task.is_done = !this.task.is_done
  //       this.$emit("done-task", this.task);
  //     }
  // },
  // data() {
  //     return {
  //       // checked: this.task.is_done
  //     };
  // },
  computed: {
    is_done: {
        get: function () {
          return this.task.is_done;
        },
        set: function (newValue) {
          this.task.is_done = newValue;
          this.$emit("done-task", this.task);
        } 
   }
  }
}
</script>
<style scoped>
.is_done {
  text-decoration: line-through;
}
</style>