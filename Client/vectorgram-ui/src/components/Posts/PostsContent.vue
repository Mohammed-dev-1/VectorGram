<template>
  <!-- All Post Items here -->
  <div class="">
    <div v-if="posts[0]">
      <PostStructur
        v-for="post in posts"
        :key="post.id"
        :PostContent="post"
      />
    </div>

    <!-- If don't have any post you will show this message below -->
    <div v-else class="card rounded mb-4 mt-4">
      <div class="card-body">
        <h1 class="text text-danger">There is no post here.</h1>
        <p class="text text-danger" v-if="messageShow">You need to follow any user, if you want to show post.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import PostStructur from "./PostStructur";

  export default {
    name: 'PostsContent',
    components: {
      PostStructur
    },
    props: ['posts', 'messageShow'],
  }
</script>