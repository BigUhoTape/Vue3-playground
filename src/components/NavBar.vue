<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue3</div>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Posts</MyButton>
      <MyButton @click="$router.push('/about')" style="margin-left: 15px;">About</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar.vue"
}
</script>

<style scoped>
.navbar {
  height: 60px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>