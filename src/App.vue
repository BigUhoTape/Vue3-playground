<template>
  <div class="app">
    <h1>Post Page</h1>
    <MyButton
        @click="showDialog"
    >
      Create Post
    </MyButton>
    <MyDialog v-model:isShow="isShowDialog">
      <PostForm
          @createPost="createPost"
      />
    </MyDialog>
    <PostList
        :posts="posts"
        @deletePost="deletePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Loading</div>
  </div>
</template>

<script>
import axios from 'axios';

//Components
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
//Components

export default {
  components: {
    MyButton,
    PostList,
    PostForm
  },
  data () {
    return {
      posts: [],
      isShowDialog: false,
      isPostsLoading: false
    }
  },
  methods: {
    createPost (newPost) {
      this.posts.push(newPost);
      this.isShowDialog = false;
    },
    deletePost (postToDelete) {
      this.posts = this.posts.filter(p => p.id !== postToDelete.id);
    },
    showDialog () {
      this.isShowDialog = true;
    },
    async fetchPosts () {
      try {
        this.isPostsLoading = true;
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = data;
      } catch (e) {
        alert('Error');
      } finally {
        this.isPostsLoading = false;
      }
    }
  },
  mounted () {
    this.fetchPosts();
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>