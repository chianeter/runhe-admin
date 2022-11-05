<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  import { Button } from 'element-ui'//局部加载   提问，开发时全局引入或局部引入，结束后改成按需加载
  export default {
    components:{
      Button
    }
  }

</script>

<style>
html,
body,
#app{
  height: 100%;
}
</style>
