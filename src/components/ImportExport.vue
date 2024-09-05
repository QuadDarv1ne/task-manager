<template>
  <div>
    <!-- Экспортировать задачи (JSON) -->
    <button class="btn btn-primary mb-2" @click="exportTasks('json')">Экспортировать JSON</button>
    
    <!-- Экспортировать задачи (CSV) -->
    <button class="btn btn-primary mb-2" @click="exportTasks('csv')">Экспортировать CSV</button>
    
    <!-- Импортировать задачи -->
    <button class="btn btn-secondary mb-2" @click="importTasks">Импортировать</button>
  </div>
</template>

<script>
import Papa from 'papaparse';

export default {
  name: 'ImportExport',
  methods: {
    exportTasks(format) {
      if (format === 'json') {
        const jsonTasks = JSON.stringify(this.$parent.tasks);
        const blob = new Blob([jsonTasks], { type: 'application/json; charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tasks.json';
        a.click();
        URL.revokeObjectURL(url);
      } else if (format === 'csv') {
        const csv = Papa.unparse(this.$parent.tasks, { header: true });
        const blob = new Blob([csv], { type: 'text/csv; charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tasks.csv';
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.type === 'application/json') {
          const reader = new FileReader();
          reader.onload = (e) => {
            const tasks = JSON.parse(e.target.result);
            this.$parent.tasks = tasks;
            this.$parent.saveTasks();
          };
          reader.readAsText(file, 'UTF-8');
        } else if (file.type === 'text/csv') {
          Papa.parse(file, {
            header: true,
            complete: (results) => {
              this.$parent.tasks = results.data;
              this.$parent.saveTasks();
            },
            encoding: 'UTF-8'
          });
        } else {
          alert('Пожалуйста, загрузите файл в формате JSON или CSV.');
        }
      }
    },
    importTasks() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json, .csv';
      input.onchange = (e) => this.handleFileUpload(e);
      input.click();
    }
  }
};
</script>

<style scoped>
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

button {
  width: 200px; /* Устанавливаем фиксированную ширину для кнопок */
}
</style>
