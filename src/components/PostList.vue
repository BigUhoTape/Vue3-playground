<template>
  <div v-if="posts.length">
    <h3>Posts List</h3>
    <PostItem
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @deletePost="$emit('deletePost', post)"
    />
  </div>
  <h2
      v-else
      style="color: red"
  >
    There is no posts
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  name: 'PostList',
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>