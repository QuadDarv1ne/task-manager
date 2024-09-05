<template>
  <div class="input-group mb-3">
    <input v-model="taskText" class="form-control mb-2" placeholder="Task description" />
    <textarea v-model="taskDescription" class="form-control mb-2" placeholder="Detailed description" rows="3"></textarea>
    <input v-model="dueDate" type="datetime-local" class="form-control mb-2" />
    <button class="btn btn-primary" @click="addTask" :disabled="!taskText.trim() || !taskDescription.trim() || !dueDate">Add</button>
  </div>
</template>

<script>
export default {
  name: 'AddTask',
  data() {
    return {
      taskText: '',
      taskDescription: '',
      dueDate: ''
    }
  },
  methods: {
    addTask() {
      if (this.taskText.trim() && this.taskDescription.trim() && this.dueDate) {
        this.$emit('add-task', { text: this.taskText, description: this.taskDescription, dueDate: this.dueDate });
        this.taskText = '';
        this.taskDescription = '';
        this.dueDate = '';
      }
    }
  }
}
</script>
