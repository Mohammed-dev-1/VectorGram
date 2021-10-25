<template>
  <div class="row shadow-sm p-4 mt-4 mb-4">
    <form class="col" @submit.prevent="update" >
      <div class="h3 text text-primary font-weight-bold mb-3">
        Personal Setting
      </div>
      <div class="form-group">
        <b-input-group size="1.5" class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <input type="text" class="form-control" v-model="username" placeholder="Change your name">
        </b-input-group>
        <span class="text text-danger" v-if="false">Title is required</span>
      </div>

      <div class="form-group">
        <b-input-group size="1.5" class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="globe"></b-icon>
          </b-input-group-prepend>
          <b-form-input type="text" v-model="url" placeholder="Change your url"></b-form-input>
        </b-input-group>
        <span class="text text-danger" v-if="false">Title is required</span>
      </div>

      <div class="form-group">
        <textarea
          class="form-control"
          placeholder="Change your description"
          v-model="description"
          cols="30"
          rows="10"
        ></textarea>
        <span class="text text-danger" v-if="false">Body is required</span>
      </div>
      <button :disabled="showButton" type="submit" class="btn btn-success">Update</button>
    </form>
  </div>
</template>

<script>
import Header from "../../services/profile/header.service";

export default {
  beforeCreate() {
    this.$store.commit('tools/SET_LOADER', false);
  },
  computed: {
    showButton() {
      return (this.description||this.username||this.url)?false:true;
    }
  },
  data() {
    return {
      description: Header.profile().description,
      username: Header.profile().profile_name,
      url: Header.profile().url
    }
  },
  methods: {
    update() {
      const form = {
        username: this.username,
        description: this.description,
        url: this.url
      }
      this.$store.dispatch('profile/updateBio', form)
        .then(()=> {
          this.$router.push({
            name: 'Profile',
            params: { id: Header.profile().id }
          })
        })
    }
  }
}
</script>