<template>
  <div>
    <img 
      class="card-img-top" 
      height="300" 
      width="900" 
      alt="Post Image"
      :src="BodyContent.post_image" 
    >
    <!-- end image of Post -->

    <!-- start conetnt of Post -->
    <div class="card-body">
      <h2 class="card-title">{{BodyContent.title}}</h2>
      <p class="card-text">{{BodyContent.body}}</p>
      <p class="card-text text-primary">#{{BodyContent.category}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['BodyContent']    
  }
</script>