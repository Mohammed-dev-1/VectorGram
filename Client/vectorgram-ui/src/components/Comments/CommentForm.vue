<template>
  <!-- Comments Form -->
  <div class="card my-4">
    <div class="card-body">
      <!-- comment lable -->
      <form @submit.prevent="createComment">
        <div class="form-group">
          <textarea 
            class="form-control" 
            :placeholder="authorPost"
            rows="3"
            v-model="comment"
          ></textarea>
        </div>
        <button 
          type="submit" 
          class="btn btn-success"
          :disabled="checkComment"
        >Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
  import { CommentValidation } from "../../mixins/CommentValidation";

  export default {
    name: 'CommentForm',
    mixins: [CommentValidation]
  }
</script>