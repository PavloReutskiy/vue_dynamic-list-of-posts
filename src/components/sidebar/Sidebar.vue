<script>
import AddPost from './AddPost.vue';
import PostPreview from './comments/PostPreview.vue';

export default {
  props: {
    postId: String
  },
  data() {
    return {
      id: this.postId
    }
  },
  watch: {
    postId(newPostId) {
      this.id = newPostId;
    }
  },
  components: {
    AddPost,
    PostPreview,
  },
  emits: ['cancel', 'create'],
  methods: {
    handlePostCreated(newPost) {
      this.id = newPost.id;
      this.$emit('create', newPost);
    }
  }
}
</script>

<template>
  <div class="tile is-parent is-8-desktop Sidebar Sidebar--open">
    <div class="tile is-child box is-success ">
      <PostPreview v-if="id" :postId="id" @cancel="$emit('cancel')" />
      <AddPost v-else @cancel="$emit('cancel')" @create="handlePostCreated" />
    </div>
  </div>
</template>

<style scoped>
.Sidebar {
  overflow: hidden;
  opacity: 0;
  transition-property: max-width, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  @media (min-width: 769px) {
    max-width: 0;
  }
}

.Sidebar--open {
  opacity: 1;

  @media (min-width: 769px) {
    max-width: 50%;
  }
}
</style>