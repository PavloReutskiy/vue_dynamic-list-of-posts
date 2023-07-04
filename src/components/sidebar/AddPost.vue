<script>
import { createPost } from '../../api/posts';

export default {
  data() {
    return {
      title: '',
      postBody: '',
      isSubmitted: false,
    }
  },
  emits: ['cancel', 'create'],
  computed: {
    isTitleValid() {
      return !this.isSubmitted || this.title.trim();
    },
    isPostBodyValid() {
      return !this.isSubmitted || this.postBody.trim();
    }
  },
  methods: {
    handleSubmit() {
      this.isSubmitted = true;
      if (this.isTitleValid && this.isPostBodyValid) {
        createPost(this.title, this.postBody)
          .then(({ data }) => {
            this.title = '';
            this.postBody = '';
            this.isSubmitted = false;
            this.$emit('create', data);
          })
      }
    }
  }
}
</script>

<template>
  <div class="content">
    <h2>Create new post</h2>

    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label" for="comment-author-name-title">Title</label>
        <div class="control has-icons-left has-icons-right">
          <input 
            type="text" 
            name="title" 
            id="comment-author-name-title" 
            placeholder="Post title" 
            class="input"
            :class="{ 'is-danger': !isTitleValid }"
            v-model.trim="title"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-user fa-heading"></i>
          </span>
          <span v-if="!isTitleValid" class="icon is-small is-right has-text-danger">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
          <p v-if="!isTitleValid" class="help is-danger">Title is required</p>
        </div>
      </div>
      <div class="field">
        <label class="label" for="comment-body">Write Post Body</label>
        <div class="control">
          <textarea
            name="body" 
            id="comment-body" 
            placeholder="Post body"  
            class="textarea"
            :class="{ 'is-danger': !isPostBodyValid }"
            v-model.trim="postBody"
          ></textarea>
          <p v-if="!isPostBodyValid" class="help is-danger">Body is required</p>
        </div>
      </div>


      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">Create</button>
        </div>
        <div class="control">
          <button @click="$emit('cancel')" type="reset" class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>