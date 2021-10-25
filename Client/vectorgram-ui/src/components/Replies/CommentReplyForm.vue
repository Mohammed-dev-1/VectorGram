<template>
  <form @submit.prevent="createReply">
    <div class="form-group mt-2 mb-2">
      <textarea
          :placeholder="authorComment"
          v-model="reply"
          class="form-control"
          rows="1"
      ></textarea>
    </div>
    <button
      :disabled="checkReply" 
      type="submit" 
      class="btn btn-sm btn-primary"
    >Reply</button>
  </form>
</template>

<script>
  import { CommentValidation } from '../../mixins/CommentValidation'
  export default {
    mixins: [CommentValidation],
    props: ['commentAuthor', 'id'],
  }
</script>