<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Добавить задачу</h5>
          <button type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="taskText">Описание задачи</label>
            <input v-model="taskText" id="taskText" class="form-control" placeholder="Описание задачи" />
          </div>
          <div class="form-group">
            <label for="taskDescription">Подробное описание</label>
            <textarea v-model="taskDescription" id="taskDescription" class="form-control" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="dueDate">Дата и время выполнения</label>
            <input v-model="dueDate" type="datetime-local" id="dueDate" class="form-control" />
          </div>
          <div class="form-group form-check">
            <input type="checkbox" v-model="completed" id="completedCheck" class="form-check-input">
            <label for="completedCheck">Выполнено</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Отмена</button>
          <button type="button" class="btn btn-primary" @click="addTask">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTaskModal',
  data() {
    return {
      taskText: '',
      taskDescription: '',
      dueDate: '',
      completed: false
    };
  },
  methods: {
    addTask() {
      if (this.taskText.trim() && this.taskDescription.trim() && this.dueDate) {
        this.$emit('add-task', {
          text: this.taskText,
          description: this.taskDescription,
          dueDate: this.dueDate,
          completed: this.completed
        });
        this.taskText = '';
        this.taskDescription = '';
        this.dueDate = '';
        this.completed = false;
      } else {
        alert('Пожалуйста, заполните все поля.');
      }
    }
  }
};
</script>
