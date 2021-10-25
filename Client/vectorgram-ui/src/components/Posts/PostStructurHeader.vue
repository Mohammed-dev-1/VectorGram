<template>
  <div class="card-header d-flex">
    <div class="pt-1">
      <img class="rounded-circle" src="../../assets/Images/avatar3.png" height="40" width="40">
    </div>
    <div class="col">
      <router-link class="text text-dark font-weight-bold" :to="{ name: 'Profile', params: { id: HeaderContent.author_id } }">
        {{HeaderContent.author}}
      </router-link>
      <br>
      <span class="text text-dark">
        <small>{{HeaderContent.created_at}}</small>
      </span>
    </div>
    <div v-if="HeaderContent.author_id == initialState.user.id">
      <div @click="status = !status" class="mt-2 mr-1 h5 text text-danger cursor">
        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
      </div>
      
      <!-- <b-dropdown class="pt-1" size="sm">
        <div v-if="false" @click="openModal" class="pl-4 text text-success cursor">
          <b-icon icon="info-circle" aria-hidden="true"></b-icon>
          <span class="pl-2">Update</span>
        </div>
        
        <b-dropdown-divider></b-dropdown-divider>

        <b-dropdown-item-button variant="danger">
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          Delete
        </b-dropdown-item-button>
      </b-dropdown> -->

      <!-- <div>
        <PostModal
          :status="status"
          :content="HeaderContent"
        />
      </div> -->

      <PostDeleteModal 
        :status="status"
        :postId="HeaderContent.id"
      />
    </div>    
  </div>
</template>

<script>
  import PostDeleteModal from "./PostDeleteModal"
  import { mapState } from 'vuex';
  
  export default {
    data() {
      return {
        status: false
      }
    },
    props: ['HeaderContent'],
    components: {
      PostDeleteModal
    },
    computed: {
      ...mapState('users', [
        'initialState'
      ])
    },
    methods: {
      // openModal() {
      //   this.status = !this.status;
      // }
    }
  }
</script>