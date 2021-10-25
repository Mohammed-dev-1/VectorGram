<template>
  <div class="row shadow-sm p-4 mt-3 mb-3" v-if="showPostForm">
    <form class="col" @submit.prevent="createPost" enctype="multipart/form-data" >
      <div class="form-group">
        <input
          class="form-control"
          type="text"
          v-model="title"
          placeholder="What do you think ?"
        >
        <span class="text text-danger" v-if="false">Title is required</span>
      </div>

      <div class="form-group">
        <textarea
          class="form-control"
          placeholder="Type something you like..."
          v-model="body"
          cols="30"
          rows="10"
        ></textarea>
        <span class="text text-danger" v-if="false">Body is required</span>
      </div>
      <div class="form-group">
        <input
          placeholder="select image"
          type="file"
          class="btn btn-light"
          accept="image/*"
          @change="previewImage"
        >
      </div>
      <div class="form-group">
        <select
          class="p-2 bg-light text-dark border rounded"
          v-model="category"          
        >
          <option 
            v-for="category in categorys"
            :key="category.id"
            :value="category.id"
          >{{category.value}}</option>
        </select>
        <span class="text text-danger pl-3" v-if="false">Category is required</span>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import { PostValidation } from "../../mixins/PostValidation"

  export default {
    mixins: [PostValidation]
  }
</script>