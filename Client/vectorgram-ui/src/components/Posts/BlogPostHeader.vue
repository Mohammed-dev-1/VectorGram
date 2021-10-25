<template>
  <div>
    <!-- Title -->
    <h1 class="mt-4">
      {{postContent.title}}
    </h1>
    
    <!-- Author -->
    <p class="lead font-weight-400">
      {{postContent.author}} | {{postContent.created_at}}
    </p>
    
    <!-- Post Content -->
    <p class="lead pt-2">
      {{postContent.body}}
    </p>
    
    <!-- Category of post -->
    <p class="text text-primary">
      #{{postContent.category}}
    </p>
    <!-- Preview Image -->
    <img 
      class="img-fluid rounded" 
      :src="postContent.post_image" 
      alt="post-image"
    >
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState('posts', [
        'postContent'
      ])
    }  
  }
</script>