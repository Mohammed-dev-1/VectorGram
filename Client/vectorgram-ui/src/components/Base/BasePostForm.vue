<template>
  <form class="col" @submit.prevent="updatePost" enctype="multipart/form-data" >
        <div class="form-group">
          <input
            :class="{ 'border border-danger': (!$v.title.required||!$v.title.minLength) }"
            class="form-control"
            type="text"
            v-model.trim="$v.title.$model"
            placeholder="What do you think ?"
          >
          <span class="text text-danger" v-if="!$v.title.required">Title is required</span>
          <span class="text text-danger" v-if="!$v.title.minLength">Title must have at least {{$v.title.params.minLength.min}} letters.</span>
        </div>

        <div class="form-group">
          <textarea
            :class="{ 'border border-danger': (!$v.body.required||!$v.body.minLength) }"
            class="form-control"
            placeholder="Type something you like..."
            v-model.trim="$v.body.$model"
            cols="30"
            rows="10"
          ></textarea>
          <span class="text text-danger" v-if="!$v.body.required">Body is required</span>
          <span class="text text-danger" v-if="!$v.body.minLength">Body must have at least {{$v.body.params.minLength.min}} letters.</span>
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
            :class="{ 'border border-danger': !$v.category.required }"
            class="p-2 bg-light text-dark border rounded"
            v-model.trim="$v.category.$model"          
          >
            <option 
              v-for="category in categorys"
              :key="category.id"
              :value="category.id"
            >{{category.value}}</option>
          </select>
          <span class="text text-danger pl-3" v-if="!$v.category.required">Category is required</span>
        </div>
        <hr>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
</template>

<script>
  import { PostValidation } from "../../mixins/PostValidation"

  export default {
    mixins: [PostValidation]
  }
</script>