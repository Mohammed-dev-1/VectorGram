<template>
  <!-- Blog Post -->
  <PostsContent 
    :posts="posts"
    :messageShow="messageShow"
  />
</template>

<script>
  import PostsContent from "../Posts/PostsContent";

  export default {
    name: 'ProfilePosts',
    components: {
      PostsContent
    },
    data() {
      return {
        posts: [],
        messageShow: false
      }
    },
    beforeCreate() {
      let uid = this.$route.params.id;

      this.$store.dispatch('posts/getProfilePosts', uid)
        .then(()=> {
          this.posts = this.$store.state.posts.profilePosts;
        })
    }
  }
</script>