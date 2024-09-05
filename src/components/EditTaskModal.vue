<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Редактировать задачу</h5>
          <button type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="editTaskText">Описание задачи</label>
            <input v-model="editedTask.text" id="editTaskText" class="form-control" />
          </div>
          <div class="form-group">
            <label for="editTaskDescription">Подробное описание</label>
            <textarea v-model="editedTask.description" id="editTaskDescription" class="form-control" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="editDueDate">Дата и время выполнения</label>
            <input v-model="editedTask.dueDate" type="datetime-local" id="editDueDate" class="form-control" />
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="completedCheck" v-model="editedTask.completed">
            <label class="form-check-label" for="completedCheck">Задача выполнена</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Отмена</button>
          <button type="button" class="btn btn-primary" @click="saveChanges">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditTaskModal',
  props: {
    task: Object
  },
  data() {
    return {
      editedTask: { ...this.task }
    };
  },
  methods: {
    saveChanges() {
      if (this.editedTask.text.trim() && this.editedTask.description.trim() && this.editedTask.dueDate) {
        this.$emit('update-task', this.editedTask);
      } else {
        alert('Пожалуйста, заполните все поля.');
      }
    }
  }
};
</script>
