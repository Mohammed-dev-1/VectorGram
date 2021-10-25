<template>
  <div>
    <div v-if="comments[0]">
      <CommentContent 
        v-for="comment in comments" 
        :key="comment.id"
        :comment="comment"
      />
    </div>
    <div v-else class="card">
      <div class="card-body">
        <p class="text text-dark font-weight-bold">There is no comment in this post yet!</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CommentContent from "./CommentContent";
  export default {
    components: {
      CommentContent
    },
    computed: {
      ...mapState('comments', [
        'comments'
      ])
    },
    beforeCreate() {
      const postId = this.$route.params.id;
      this.$store.dispatch('comments/getComments', postId);
    }
  }
</script>