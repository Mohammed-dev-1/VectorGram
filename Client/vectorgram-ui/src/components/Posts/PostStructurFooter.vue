<template>
  <div class="card-footer d-flex text-muted">
    <div class="cursor">
      <b-icon scale="1.5" icon="hand-thumbs-up"></b-icon>
      <span class="ml-2 mr-3 font-weight-bold">0</span>
    </div>
    
    <div @click="setLoader" class="cursor">
      <b-icon scale="1.5" icon="chat-right-dots"></b-icon>
      <span class="ml-2 font-weight-bold">
        {{FooterContent.comments}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['FooterContent'],    
    methods: {
      setLoader() {
        this.$store.commit('tools/SET_LOADER', true);
        this.$router.push({ 
          name: 'BlogPost', 
          params: { id: this.FooterContent.id } 
        })
      }
    }
  }
</script>