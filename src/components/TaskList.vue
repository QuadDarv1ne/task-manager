<template>
  <div>
    <ul class="list-group">
      <TaskItem
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        :index="index"
        @remove-task="removeTask"
        @update-task="updateTask"
      />
    </ul>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  name: 'TaskList',
  components: {
    TaskItem
  },
  props: {
    tasks: Array
  },
  methods: {
    removeTask(index) {
      this.$emit('remove-task', index);
    },
    updateTask({ index, updatedTask }) {
      this.$emit('update-task', { index, updatedTask });
    }
  }
};
</script>
