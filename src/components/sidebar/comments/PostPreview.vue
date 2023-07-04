<script>
import NoCommentsYet from './NoCommentsYet.vue';
import ErrorMessage from '../../ErrorMessage.vue';
import { getPost } from '../../../api/posts';

export default {
  props: {
    postId: String
  },
  components: {
    NoCommentsYet,
    ErrorMessage,
  },
  data() {
    return {
      post: {},
      isLoading: false,
      errorMessage: '',
    }
  },
  watch: {
    postId(newPostId, oldPostId) {
      if (newPostId !== oldPostId) {
        this.getPost();
      }
    }
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      this.isLoading = true;
      getPost(this.postId)
        .then(({ data }) => {
          this.post = data;
          this.isLoading = false;
          this.errorMessage = '';
        })
        .catch((error) => {
          this.errorMessage = `Unable to load post: ${error.message}`
          this.isLoading = false;
        })
    }
  }
}
</script>

<template>
  <div class="content">
    <ErrorMessage
      v-if="errorMessage"
      class="is-danger"
    >
      <p>{{ errorMessage }}</p>
    </ErrorMessage>

    <div v-else className="block">
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <h2>{{ `#${post.id}: ${post.title}` }}</h2>
        <div className="is-flex">
          <span className="icon is-small is-right is-clickable">
            <i className="fas fa-pen-to-square"></i>
          </span>
          <span className="icon is-small is-right has-text-danger is-clickable ml-3">
            <i className="fas fa-trash"></i>
          </span>
        </div>
      </div>
      <p data-cy="PostBody">{{ post.body }}</p>
    </div>

    <div className="block">
      <NoCommentsYet />
    </div>
  </div>
</template>