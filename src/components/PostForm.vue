<template>
  <div>
    <form @submit.prevent>
      <h4>Create Post</h4>
      <MyInput
          v-focus
          v-model="post.title"
          placeholder="title"
      />
      <MyInput
          v-model="post.body"
          type="text"
          placeholder="description"
      />
      <MyButton
          @click="createPost"
          style="align-self: flex-end"
      >
        Create
      </MyButton>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
export default {
  components: {MyInput, MyButton},
  data () {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost () {
      this.post.id = Date.now();
      this.$emit('createPost', this.post);
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>