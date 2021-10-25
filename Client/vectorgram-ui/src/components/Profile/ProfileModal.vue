<template>
  <b-modal v-model="status" title="Choose a profile image" hide-footer>
    <form @submit.prevent="chooseImage" enctype="multipart/form-data">
      <div class="form-group">
        <input 
          type="file" 
          class="form-control form-file"
          accept="image/*"
          @change="previewImage"
        >
      </div>

      <div class="mt-2 d-flex">
        <button 
          type="submit" 
          class="btn btn-success mr-2"
          :disabled="!profile_image"
        >Choose</button>
        <div @click="closeModal" class="btn btn-light mr-2">Cancel</div>
      </div>
    </form>
  </b-modal>
</template>

<script>
  export default {
    props: ['status'],
    data() {
      return {
        profile_image: null,
      }
    },
    methods: {
      previewImage(e) {
        this.profile_image = e.target.files[0];
      },
      chooseImage() {
        let fd = new FormData();
        fd.append('profile_image', this.profile_image);

        if(this.profile_image) {
          this.$store.dispatch('profile/changeProfileImage', fd);
          this.status = false;
        }
      },
      closeModal() {
        this.status = false;
      },
    }
  }
</script>