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
  </div>
</template>

<script>
import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedAndSearchedPosts} from "@/hooks/useSortedAndSearchedPosts";

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
      sortOptions: [
        {value: 'title', name: 'By Title'},
        {value: 'body', name: 'By Body'},
      ],
    }
  },
  methods: {},
  setup (props) {
    const {posts, totalPages, isPostsLoading} = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
  }
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