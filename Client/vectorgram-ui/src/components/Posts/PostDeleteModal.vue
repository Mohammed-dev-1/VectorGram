<template>
  <b-modal v-model="status" title="Are you sure ?" hide-footer>
    <form @submit.prevent="deletePost(postId)">
      <button type="submit" class="btn btn-danger mr-2">Delete</button>
      <div @click="status=false" class="btn btn-light">Cancel</div>
    </form>
  </b-modal>  
</template>

<script>
  export default {
    props: ['status', 'postId'],
    methods: {
      deletePost(postId) {
        this.$store.dispatch('posts/deletePost', postId);
        this.status = false;
      }
    } 
  }
</script>