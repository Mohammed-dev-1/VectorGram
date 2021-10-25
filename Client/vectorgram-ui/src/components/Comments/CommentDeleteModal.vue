<template>
  <b-modal v-model="status" title="Are you sure ?" hide-footer>
    <form @submit.prevent="deleteComment(id)">
      <button type="submit" class="btn btn-danger mr-2">Delete</button>
      <div @click="status=false" class="btn btn-light">Cancel</div>
    </form>
  </b-modal>  
</template>

<script>
  export default {
    props: ['status', 'id', 'type'],
    methods: {
      deleteComment(id) {
        const postID = this.$route.params.id;

        if(this.type == "comment") {
          this.$store.dispatch('comments/deleteComment', id)
            .then(()=> {
              this.$store.dispatch('comments/getComments', postID)
              this.status = false;
            })
        } 
        else if(this.type == "reply") {
          this.$store.dispatch('commentReplies/deleteReply', id)
            .then(()=> {
              this.$store.dispatch('comments/getComments', postID)
              this.status = false;
            })

        }
      }
    } 
  }
</script>