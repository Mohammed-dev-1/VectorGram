import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex';

export const PostValidation = {
  data() {
    return {
      title: '',
      body: '',
      post_image: null,
      categorys: [
        {
          id: 1,
          value: 'Memes'
        }
      ],
      category: '',
    }
  },
  validations: {
    title: required,
    body: required,
    category: required
  },
  computed: {
    ...mapState('profile',[
      'profileInfo'
    ]),
    ...mapState('users', [
      'initialState'
    ]),
    showPostForm() {
      return (this.initialState.user.id == this.profileInfo.user_id)
        ? true : false;
    }
  },
  methods: {
    previewImage(e) {
      this.post_image = e.target.files[0];
    },
    createPost() {
      // this.$v.$touch();

      if(
          (this.title&&this.body&&this.category) ||
          (this.title&&this.body) ||
          (this.title&&this.category) ||
          (this.category&&this.body)
        ) {
        let fd = new FormData();
        fd.append('title', this.title);
        fd.append('body', this.body);
        fd.append('post_image', this.post_image);
        fd.append('category_id', this.category);
        
        this.$store.dispatch('posts/createPost', fd)
          .then(()=> {
              // this.$store.dispatch('posts/getProfilePosts', this.profileInfo.user_id);
            },
          )

        this.title = null;
        this.body = null;
        this.post_image = null;
        this.category = null;
      }
      else {
        const err = {
          type: 'DANGER',
          message: 'Pleas complete!'
        }
        this.$store.commit('tools/SET_MESSAGE', err);
      }
    }
  }
}