<template>
  <div>
    <h1>Post Page</h1>
    <MyInput
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
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
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
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
        <div class="page__wrapper">
          <div
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            class="page"
            :class="{
              'current-page': page === pageNumber
            }"
            @click="changePage(pageNumber)"
          >
            {{ pageNumber }}
          </div>
        </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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
      isShowDialog: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadingMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
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
  },
  mounted () {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    }),
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