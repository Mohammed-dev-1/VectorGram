// import {  required, minLength  } from 'vuelidate/lib/validators'

// export const PostUpdateValidation = {
//   props: ['status', 'content'],
//   data() {
//     return {
//       titleUpdate: this.content.title,
//       categoryUpdate: this.content.category,
//       post_imageUpdate: this.content.post_image,
//       bodyUpdate: this.content.body,
      
//       categorysUpdate: [
//         {
//           id: 1,
//           value: 'Memes'
//         }
//       ]
//     }
//   },
//   validations: {
//     titleUpdate: {
//       required,
//       minLength: minLength(4)
//     },
//     bodyUpdate: {
//       required,
//       minLength: minLength(4)
//     },
//     categoryUpdate: required,
//   },
//   methods: {
//     previewImage(e) {
//       this.post_imageUpdate = e.target.files[0];
//     },
//     updatePost() {
//       this.$v.$touch();

//       if(!this.$v.$invalid) {
//         let fd = new FormData();
//         fd.append('title', this.titleUpdate);
//         fd.append('body', this.bodyUpdate);
//         fd.append('post_image', this.post_imageUpdate);
//         fd.append('category_id', this.categoryUpdate);
//         console.log('req post', fd);
        
//         this.$store.dispatch('posts/updatePost', fd, this.content.id)
//           .then(()=> {
//             this.titleUpdate = null;
//             this.bodyUpdate = null;
//             this.post_imageUpdate = null;
//             this.categoryUpdate = null;
//             this.status = false;
//           })
//       }
//       else {
//         const err = 'Pleas Complete!'
//         this.$store.commit('posts/SET_MESSAGE', err);
//       }
//     }
//   }
// }