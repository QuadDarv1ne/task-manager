<template>
  <div class="theme-switcher">
    <button
      v-for="theme in themes"
      :key="theme"
      class="btn theme-btn"
      :class="{'active': currentTheme === theme}"
      @click="setTheme(theme)"
    >
      {{ theme.charAt(0).toUpperCase() + theme.slice(1) }} Тема
    </button>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      themes: ['light', 'dark', 'blue', 'orange', 'purple'],
      currentTheme: localStorage.getItem('theme') || 'light'
    };
  },
  methods: {
    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.currentTheme = theme;
    }
  },
  created() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }
}
</script>

<style scoped>
.theme-switcher {
  display: flex;
  gap: 10px;
  margin: 10px;
}

.theme-btn {
  background-color: #3995f8;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s, transform 0.3s;
}

.theme-btn.active {
  background-color: #3683d6;
}

.theme-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>
