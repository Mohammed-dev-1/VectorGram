<template>
  <h1>tsts</h1>
  <!-- <div>
    <b-modal v-model="status" title="Update your post content" hide-footer>
      <form @submit.prevent="updatePost" enctype="multipart/form-data" >
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            v-model.trim="$v.titleUpdate.$model"
            placeholder="What do you think ?"
          >
        </div>

        <div class="form-group">
          <textarea
            class="form-control"
            placeholder="Type something you like..."
            v-model.trim="$v.bodyUpdate.$model"
            cols="20"
            rows="10"
          ></textarea>
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
            v-model.trim="$v.categoryUpdate.$model"
          >
            <option 
              v-for="category in categorysUpdate"
              :key="category.id"
              :value="category.value"
            >{{category.value}}</option>
          </select>
        </div>
        <hr>
        <button type="submit" class="btn btn-primary mr-2">Submit</button>
        <div @click="status = false" class="btn btn-danger">Cancel</div>
      </form>
    </b-modal>
  </div> -->
</template>

<script>
  // import { PostUpdateValidation } from "../../mixins/PostUpdateValidation";
  export default {
    // mixins: [PostUpdateValidation]
  }
</script>