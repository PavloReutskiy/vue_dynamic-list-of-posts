<script>
  import { getPosts } from './api/posts';
  import AppHeader from './components/AppHeader.vue';
  import Loader from './components/Loader.vue';
  import ErrorMessage from './components/ErrorMessage.vue';

  export default {
    components: {
      AppHeader,
      Loader,
      ErrorMessage,
    },
    data() {
      return {
        posts: [],
        isLoading: false,
        errorMessage: '',
      }
    },
    mounted() {
      this.isLoading = true;
      getPosts()
        .then(({ data }) => {
          this.posts = data;
          this.isLoading = false;
          this.errorMessage = '';
        })
        .catch((error) => {
          this.errorMessage = `Unable to load posts: ${error.message}`
          this.isLoading = false;
        })
    }
  }
</script>

<template>
  <AppHeader />

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box is-success">
            <div class="block">
              <div class="block is-flex is-justify-content-space-between">
                <p class="title">Posts</p>
                <button 
                  type="button" 
                  class="button is-link" 
                  aria-label="Add new post"
                >
                  Add New Post
                </button>
              </div>

              <Loader v-if="isLoading" />

              <table 
                v-else-if="posts.length > 0"
                class="table is-fullwidth is-striped is-hoverable is-narrow" 
              >
                <thead>
                  <tr class="has-background-link-light">
                    <th>ID</th>
                    <th>Title</th>
                    <th class="has-text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="post of posts" :key="post.id">
                    <td>{{ post.id }}</td>
                    <td>{{ post.title }}</td>
                    <td class="has-text-right is-vcentered">
                      <button 
                        type="button" 
                        class="button is-link" 
                        aria-label="Open post"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <ErrorMessage
                v-else-if="errorMessage"
                class="is-danger"
              >
                <p>{{ errorMessage }}</p>
              </ErrorMessage>

              <h3 
                v-else
                class="mt-2 has-text-centered" 
              >
                No posts yet
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .container {
    margin: 0 auto;
    position: relative;
    width: auto;
  }
  .section {
    padding: 3rem 1.5rem;
  }
</style>
