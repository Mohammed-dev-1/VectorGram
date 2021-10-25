<template>
  <!-- start post structur -->
  <div class="card mb-4 mt-4">
    <PostStructurHeader 
      :HeaderContent="PostContent"
    />
    
    <!-- start image of post -->
    <PostStructurBody 
      :BodyContent="PostContent"
    />
    <!-- end content of Post -->

    <!-- start date and comments of Post -->
    <PostStructurFooter 
      :FooterContent="PostContent"
    />
    <!-- end date and comments of Post -->

  </div>
  <!-- end Post structur -->
</template>

<script>
  import PostStructurHeader from "./PostStructurHeader"
  import PostStructurBody from "./PostStructurBody"
  import PostStructurFooter from "./PostStructurFooter"
  
  export default {
    name: 'PostStructur',
    props: ['PostContent'],
    components: {
      PostStructurHeader,
      PostStructurBody,
      PostStructurFooter,
    }
  }
</script>