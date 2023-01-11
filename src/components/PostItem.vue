<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Title: </strong> {{ post.title }}</div>
      <div><strong>Description: </strong> {{ post.body }}</div>
    </div>

    <div class="post__btns">
      <MyButton
          @click="$router.push(`/posts/${post.id}`)"
      >
        Open
      </MyButton>
      <MyButton
        @click="$emit('deletePost', post)"
      >
        Delete
      </MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  name: "PostItem",
  components: {MyButton},
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
}
</style>