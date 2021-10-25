import { mapState } from "vuex";

export const CommentValidation = {
  data() {
    return {
      comment: '',
      reply: '',
      message: {
        type: 'DANGER',
        message: 'Pleas Complete !'
      }
    }
  },
  computed: {
    ...mapState('posts', [
      'postContent'
    ]),
    authorPost() {
      return "Leave a comment to " + this.postContent.author
    },
    authorComment() {
      return "Reply to " + this.commentAuthor
    },
    checkComment() {
      return this.comment ? false : true;
    },
    checkReply() {
      return this.reply ? false : true;
    }
  },
  methods: {
    createComment() {
      if(this.comment) {
        const req = {
          post_id: this.postContent.id,
          comment: this.comment
        }
        this.$store.dispatch('comments/createComment', req)
          .then(()=>{
            this.$store.dispatch(
              'comments/getComments',
              this.postContent.id
            )
          })
        this.comment = null;
      } else {
        this.$store.commit(
          'comments/SET_MESSAGE',
          this.message
        )
      }
    },
    createReply() {
      if(this.reply) {
        const req = {
          comment_id: this.id,
          comment: this.reply
        }
        console.log(req);
        this.$store.dispatch('commentReplies/createReply', req)
          .then(()=>{
            this.$store.dispatch(
              'comments/getComments',
              this.postContent.id
            )
          })
        this.reply = null;
      } else {
        this.$store.commit(
          'commentReplies/SET_MESSAGE',
          this.message
        )
      }
    }
  }
}