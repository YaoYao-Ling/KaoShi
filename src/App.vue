<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.app-wrapper {
  overflow-y: scroll;
}
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
}
* {
  padding: 0;
  margin: 0;
  font-weight: normal;
  font-size: 14px;
  list-style: none;
}
</style>
