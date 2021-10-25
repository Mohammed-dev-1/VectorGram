<template>
  <div>
    <PostsContent 
      :posts="posts"
      :messageShow="messageShow"
      v-if="!loaderStatus"
    /> 
  </div>
</template>

<script>
  import PostsContent from "@/components/Posts/PostsContent";
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        posts: [],
        messageShow: true
      }
    },
    components: {
      PostsContent
    },
    computed: {
      ...mapState('tools', [
        'loaderStatus'
      ])
    },
    beforeCreate() {
      this.$store.dispatch('posts/getAllPosts')
        .then(()=> {
          // this.$store.commit('tools/SET_LOADER', true);
          this.posts = this.$store.state.posts.posts;
        })
    },
  }
</script>