<template>
  <div>
    <CommentRepliesContent 
      v-for="reply in replies"
      :key="reply.id"
      :reply="reply"
    />
  </div>
</template>

<script>
  import CommentRepliesContent from "../Replies/CommentRepliesContent"
  import { mapState } from 'vuex';

  export default {
    name: 'Replies',
    components: {
      CommentRepliesContent
    },
    computed: {
      ...mapState('commentReplies', [
        'replies'
      ]),
    },    
  }
</script>