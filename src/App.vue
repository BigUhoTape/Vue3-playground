<template>
  <div class="app">
    <h1>Post Page</h1>
    <div class="app__btns">
      <MyButton
          @click="showDialog"
      >
        Create Post
      </MyButton>
      <MySelect
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <MyDialog v-model:isShow="isShowDialog">
      <PostForm
          @createPost="createPost"
      />
    </MyDialog>
    <PostList
        :posts="sortedPosts"
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
import MySelect from "@/components/UI/MySelect";
//Components

export default {
  components: {
    MySelect,
    MyButton,
    PostList,
    PostForm
  },
  data () {
    return {
      posts: [],
      isShowDialog: false,
      isPostsLoading: false,
      selectedSort: 'title',
      sortOptions: [
        {value: 'title', name: 'By Title'},
        {value: 'body', name: 'By Body'},
      ]
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
  },
  computed: {
    sortedPosts () {
      return [...this.posts].sort((post1, post2) =>  post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    }
  },
  // watch: {
  //   selectedSort (newValue) {
  //     this.posts.sort((post1, post2) =>  post1[newValue]?.localeCompare(post2[newValue]));
  //   }
  // }
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

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
</style>