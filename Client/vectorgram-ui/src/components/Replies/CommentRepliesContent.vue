<template>
  <div class="media mt-3">
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
            :to="{ name: 'Profile', params: { id: reply.author_id } }"
          >
            {{reply.author}}
          </router-link>
          <!-- date of reply -->
          <span class="text tex-dark"><small>{{reply.created_at}}</small></span>
        </div>
        
        <div v-if="check" @click="status = !status" class="col-1 text text-danger cursor">
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
        </div>
      </div>
      
      <!-- reply body -->
      <p>{{reply.comment}}</p> 

      <!-- Comment delete modal -->
      <CommentDeleteModal 
        :status="status"
        :id="reply.id"
        type="reply"
      />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import CommentDeleteModal from "../Comments/CommentDeleteModal"

  export default {
    name: 'CommentRepliesContent',
    props: ['reply'],
    components: {
      CommentDeleteModal
    },
    data() {
      return {
        status: false,
      }
    },
    computed: {
      ...mapState('users', [
        'initialState'
      ]),
      check() {
        return (this.initialState.user.id == this.reply.author_id)
          ? true : false;
      }
    }
  }
</script>