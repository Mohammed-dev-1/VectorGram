<template>
  <div class="media mb-2">
    <!-- user image -->
    <img 
      height="40"
      width="40"
      class="d-flex mr-3 rounded-circle" 
      src="../../assets/Images/avatar3.png" 
      alt="user-avatar"
    >
    <!-- comment body -->
    <div class="media-body">
      <!-- Comment owner info   -->
      <div class="d-flex">
        <!-- Username of comment -->
        <div class="d-flex col comment-header">
          <router-link 
            class="h5 text-dark mr-2" 
            :to="{ name: 'Profile', params: { id: comment.author_id } }"
          >
            {{comment.author}}
          </router-link>
          <!-- date of comment -->
          <span class="text tex-dark"><small>{{comment.created_at}}</small></span>
        </div>
        
        <div v-if="check" @click="status = !status" class="col-1 text text-danger cursor">
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
        </div>
      </div>
      
      <!-- Comment body -->
      <p>{{comment.comment}}</p> 

      <!-- Comment delete modal -->
      <CommentDeleteModal 
        :status="status"
        :id="comment.id"
        type="comment"
      />
      <!-- comment reply form -->
      <CommentReplyForm 
        :commentAuthor="comment.author"
        :id="comment.id"
      />  

      <!-- all replies -->
      <div v-if="comment.replies[0]">
        <CommentRepliesContent 
          v-for="reply in comment.replies"
          :key="reply.id"
          :reply="reply"
        />
      </div>
      
    </div>
  </div>
</template>

<script>
  import CommentDeleteModal from "./CommentDeleteModal"
  import CommentReplyForm from "../Replies/CommentReplyForm"
  import CommentRepliesContent from "../Replies/CommentRepliesContent"
  import { mapState } from 'vuex'

  export default {
    props: ['comment'],
    components: {
      CommentDeleteModal,
      CommentReplyForm,
      CommentRepliesContent,
    },
    data() {
      return {
        status: false
      }
    },
    computed: {
      ...mapState('users', [
        'initialState'
      ]),
      check() {
        return (this.initialState.user.id == this.comment.author_id)
          ? true : false;
      }
    }
  }
</script>