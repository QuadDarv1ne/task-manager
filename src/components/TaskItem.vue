<template>
  <li class="list-group-item d-flex flex-column">
    <div v-if="!isEditing">
      <div class="d-flex justify-content-between">
        <div>
          <strong :class="{ 'text-decoration-line-through': editedTask.completed }">{{ editedTask.text }}</strong>
          <div class="text-muted">{{ formatDate(editedTask.dueDate) }}</div>
          <div>
            <input type="checkbox" v-model="editedTask.completed" @change="toggleCompletion"> Выполнено
          </div>
        </div>
        <div>
          <button class="btn btn-info btn-sm mr-2" @click="startEditing">Изменить</button>
          <button class="btn btn-danger btn-sm" @click="removeTask">Удалить</button>
        </div>
      </div>
      <div class="mt-2">
        <p>{{ editedTask.description }}</p>
      </div>
    </div>
    <EditTaskModal v-if="isEditing" :task="editedTask" @close="cancelEditing" @update-task="saveChanges" />
  </li>
</template>

<script>
import EditTaskModal from './EditTaskModal.vue';

export default {
  name: 'TaskItem',
  components: {
    EditTaskModal
  },
  props: {
    task: Object,
    index: Number
  },
  data() {
    return {
      isEditing: false,
      editedTask: { ...this.task } // Создаем копию пропа task
    };
  },
  methods: {
    removeTask() {
      this.$emit('remove-task', this.index);
    },
    startEditing() {
      this.isEditing = true;
    },
    saveChanges(updatedTask) {
      this.$emit('update-task', { index: this.index, updatedTask });
      this.isEditing = false;
    },
    cancelEditing() {
      this.isEditing = false;
      this.editedTask = { ...this.task }; // Возвращаем копию task
    },
    toggleCompletion() {
      this.$emit('update-task', { index: this.index, updatedTask: { ...this.editedTask } });
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  },
  watch: {
    task: {
      handler(newTask) {
        this.editedTask = { ...newTask }; // Обновляем локальную копию, если task изменился
      },
      deep: true
    }
  }
};
</script>
