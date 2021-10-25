<template>
  <div class="col-lg-8">
    <!-- Post header -->
    <BlogPostHeader />

    <!-- Comment Form -->
    <CommentForm />
            
    <!-- Single Comment -->
    <Comments />
  </div>
</template>

<script>
  import BlogPostHeader from "../Posts/BlogPostHeader";
  import CommentForm from "../Comments/CommentForm";
  import Comments from "../Comments/Comments";

  export default {
    name: 'BaseBlogPost',
    components: {
      BlogPostHeader,
      CommentForm,
      Comments
    },
  }
</script>