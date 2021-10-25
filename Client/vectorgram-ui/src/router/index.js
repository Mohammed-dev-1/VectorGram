import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '../views/Auth/Register';
import Login from '../views/Auth/Login';
import Main from '../views/Home/Main';
import Posts from '../views/Home/Posts';
import BlogPost from '../views/Home/BlogPost';
import Profile from '../views/Home/Profile';
import Setting from '../views/Home/Setting';
import Search from '../views/Home/Search';
import page404 from '../views/page404';


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'Page404',
      component: page404 
    },
    {
      path: '',
      name: 'Main',
      component: Main,
      children: [
        // this page return all posts, home page
        {
          path: '',
          name: 'Posts',
          component: Posts
        },
        // this page return content of post and comment
        {
          path: 'post/:id',
          name: 'BlogPost',
          component: BlogPost
        },
        // profile page
        {
          path: 'profile/:id',
          name: 'Profile',
          component: Profile
        },
        {
          path: 'setting',
          name: 'Setting',
          component: Setting
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})

router.beforeEach((to,from,next)=> {
  const publicPages = ['Login', 'Register'];  
  const authRequired = publicPages.includes(to.name);
  const loggedIn = localStorage.getItem('user');

  if(!loggedIn && !authRequired) next({ name: 'Login' });
  else if(loggedIn && authRequired) next({ name: 'Main' });
  else next();
})


export default router