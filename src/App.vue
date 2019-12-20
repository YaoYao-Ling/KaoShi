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

<style lang="scss">
*{
  padding: 0;
  margin:0;
  box-sizing: border-box;
  list-style: none;
}
html,body{
  width: 100%;
  height:100%;
}
#app{
  width: 100%;
  height:100%;
  // display: flex;
  // flex-direction: column;
}
// .top{
//   width: 100%;
//   height:100px;
// }
// .main{
//   flex:1;
//   width: 100%;
// }
</style>