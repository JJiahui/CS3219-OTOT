<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Add Task</span>
        <el-button style="float: right; padding: 3px" type="text" @click="addTask">Save</el-button>
      </div>
      <div>
        <el-input style="margin: 0 0 10px 0;" placeholder="Title" v-model="title"></el-input>
        <el-input placeholder="Description" v-model="description" type="textarea"></el-input>
      </div>
    </el-card>
    <el-dialog 
      title="Invalid input"
      :visible.sync="dialogVisible"
      width="30%">
      <span>The title field cannot be empty!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Ok</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'AddTask',
  data() {
    return {
      title: '',
      description: '',
      dialogVisible: false
    }
  },
  methods: {
    addTask(e) {
      e.preventDefault();      
      if (this.title.trim().length == 0) {
        this.dialogVisible = true;
        return;
      }
      const newTask = {
        title: this.title,
        description: this.description,
        done: false
      };
      this.$emit('add-task', newTask);
      this.title = '';
      this.description = '';
    }
  }
}
</script><style scoped>
</style>