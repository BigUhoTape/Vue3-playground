import axios from "axios";
import { ref, onMounted } from 'vue';

export function usePosts (limit) {
    const posts = ref([]);
    const totalPages = ref(0);
    const isPostsLoading = ref(true);
    const fetching = async () => {
        try {
            isPostsLoading.value = true;
            const { data, headers } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: 1,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(headers['x-total-count'] / limit);
            posts.value = data;
        } catch (e) {
            alert('Error');
        } finally {
            isPostsLoading.value = false;
        }
    };

    onMounted(fetching);

    return { posts, isPostsLoading, totalPages }
}