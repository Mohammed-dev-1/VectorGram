import { required, minLength, email } from 'vuelidate/lib/validators'
// import Header from "../services/users/header.service";

export const AuthValidation = {
  data() {
    return {
      fullname: '',
      username: '',
      email: '',
      password: '',
      type: 'password',
      errComplete: 'Pleas Complete!',
      errAuth: 'Something is warning!'
    }
  },
  validations: {
    fullname: {
      required,
      minLength: minLength(4)
    },
    username: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
  },
  methods: {
    checkType() {
      this.type = this.type==='password'?'text':'password';
    },
    login() {
      this.$v.email.$touch();
      this.$v.password.$touch();

      if(!this.$v.email.$invalid && !this.$v.password.$invalid) {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('users/login', user)
          .then(() => { 
            this.$router.push({ 
              name: 'Posts'
            })
          })
      }
      else {
        this.$store.commit('messages/SET_MESSAGE', this.errComplete);
      }
    },
    register() {
      this.$v.$touch();

      if(!this.$v.$invalid) {
        const user = {
          username: this.username,
          name: this.fullname,
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('users/register', user)
          .then(() => {
              this.$router.push({ 
                name: 'Posts'
              });
          })
      }
      else {
        this.$store.commit('messages/SET_MESSAGE', this.errComplete);
      }
    }
  },
  mounted() {
    this.$store.commit('tools/SET_LOADER', false);
  }
};