<template>
  <div>
    <h1>Post Page</h1>
    <MyInput
        v-model="searchQuery"
        placeholder="Search"
        v-focus
    />
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
        :posts="sortedAndSearchedPosts"
        @deletePost="deletePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Loading</div>
    <div v-intersection="loadingMorePosts" class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--        v-for="pageNumber in totalPages"-->
    <!--        :key="pageNumber"-->
    <!--        class="page"-->
    <!--        :class="{-->
    <!--          'current-page': page === pageNumber-->
    <!--        }"-->
    <!--        @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import axios from 'axios';

//Components
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
//Components

export default {
  components: {
    MyInput,
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
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0
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
        const { data, headers } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(headers['x-total-count'] / this.limit);
        this.posts = data;
      } catch (e) {
        alert('Error');
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadingMorePosts () {
      try {
        this.page += 1;
        const { data, headers } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...data];
      } catch (e) {
        alert('Error');
      }
    },
    // async changePage (page) {
    //   this.page = page;
    //   await this.fetchPosts();
    // }
  },
  mounted () {
    this.fetchPosts();
  },
  computed: {
    sortedPosts () {
      return [...this.posts].sort((post1, post2) =>  post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPosts () {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
}
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  transition: .4s;
  cursor: pointer;
}
.current-page {
  border: 2px solid teal;
  background: teal;
  color: white;
  transition: .4s;
}

.observer {
  height: 30px;
}
</style>