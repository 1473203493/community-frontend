<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif;
  background-color: #f5f7fa;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
</style>
