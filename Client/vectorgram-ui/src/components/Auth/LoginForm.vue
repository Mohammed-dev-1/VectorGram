<template>
   <div class="container center-items height-100">
      <div class="row">
        <!-- start form inputs -->
          <form @submit.prevent="login" class="container-form-v center-items">
            <div class="subtitle">
              <h1>Join now</h1>
            </div>
            <div class="form-input-group-v">
              <div class="input-v">
                <input 
                  :class="{ 'input-error-v' : (!$v.email.required||!$v.email.email) }"
                  class="input-value-v" 
                  type="text" 
                  v-model.trim="$v.email.$model" 
                  placeholder="Email" 
                />
                <span class="error" v-if="!$v.email.required">Email is required</span>              
                <span class="error" v-if="!$v.email.email">This is not an email format</span>              
              </div>
              <div class="input-v mb-1">
                <div class="toggle" @click="checkType">
                  <b-icon :icon="type=='password'?'eye':'eye-fill'"></b-icon>
                </div>
                <input 
                  :class="{ 'input-error-v' : (!$v.password.required||!$v.password.minLength) }"
                  class="input-value-v" 
                  :type="type" 
                  v-model.trim="$v.password.$model" 
                  placeholder="Password" 
                />
                <span class="error" v-if="!$v.password.required">Password is required</span>
                <span class="error" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}}</span>
              </div>
              <div class="switch-page">
                <div class="button-v">
                  <button 
                    type="submit" 
                    class="btn btn-block btn-primary font-weight-bold"
                  >
                  Login</button>
                </div>
                <div class="switch-page-link mt-3">
                  <router-link :to="{ name: 'Register' }" class="title">
                    You don't have an account ?
                  </router-link>
                </div>
              </div>
            </div>
          </form>
        <!-- end form inputs -->
      </div>
    </div>
</template>

<script>
  import { AuthValidation } from "../../mixins/AuthValidation";

  export default {
    name: 'LoginForm',
    mixins: [AuthValidation]
  }
</script>

<style lang="scss" scoped>
@import "./formStyle.scss";
</style>