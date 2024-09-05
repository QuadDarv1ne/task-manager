<template>
  <div id="app" class="container mt-4">
    <h1 class="mb-4">Менеджер задач</h1>
    <ThemeSwitcher />
    <ImportExport />
    <div class="mb-3">
      <input v-model="searchQuery" class="form-control mb-2" placeholder="Поиск задач" />
      <select v-model="filter" class="form-control mb-2">
        <option value="all">Все</option>
        <option value="completed">Выполненные</option>
        <option value="incomplete">Невыполненные</option>
      </select>
      <select v-model="sortBy" class="form-control mb-2">
        <option value="date">По дате</option>
        <option value="text">По названию</option>
      </select>
    </div>
    <button class="btn btn-primary mb-3" @click="showAddTaskModal">Добавить задачу</button>
    <TaskList
      :tasks="filteredSortedTasks"
      @remove-task="removeTask"
      @update-task="updateTask"
    />
    <AddTaskModal v-if="showAddTask" @add-task="addTask" @close="closeAddTaskModal" />
    <EditTaskModal
      v-if="showEditTask"
      :task="taskToEdit"
      @update-task="updateTask"
      @close="closeEditTaskModal"
    />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import AddTaskModal from './components/AddTaskModal.vue';
import EditTaskModal from './components/EditTaskModal.vue';
import ImportExport from './components/ImportExport.vue';

export default {
  name: 'App',
  components: {
    TaskList,
    ThemeSwitcher,
    AddTaskModal,
    EditTaskModal,
    ImportExport
  },
  data() {
    return {
      tasks: this.loadTasks(),
      showAddTask: false,
      showEditTask: false,
      taskToEdit: null,
      searchQuery: '',
      filter: 'all',
      sortBy: 'date'
    };
  },
  computed: {
    filteredSortedTasks() {
      let filteredTasks = this.tasks.filter(task => {
        if (this.filter === 'completed') return task.completed;
        if (this.filter === 'incomplete') return !task.completed;
        return true;
      });

      filteredTasks = filteredTasks.filter(task =>
        task.text.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.sortBy === 'date') {
        return filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else {
        return filteredTasks.sort((a, b) => a.text.localeCompare(b.text));
      }
    }
  },
  methods: {
    loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      return tasks;
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    addTask(task) {
      if (task.text.trim() && task.description.trim() && task.dueDate) {
        this.tasks.push({ ...task, completed: false });
        this.saveTasks();
        this.closeAddTaskModal();
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    updateTask({ index, updatedTask }) {
      this.tasks.splice(index, 1, updatedTask);
      this.saveTasks();
      this.closeEditTaskModal();
    },
    showAddTaskModal() {
      this.showAddTask = true;
    },
    closeAddTaskModal() {
      this.showAddTask = false;
    },
    showEditTaskModal(task) {
      this.taskToEdit = task;
      this.showEditTask = true;
    },
    closeEditTaskModal() {
      this.showEditTask = false;
      this.taskToEdit = null;
    }
  }
};
</script>
