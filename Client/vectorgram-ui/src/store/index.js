import Vue from 'vue'
import Vuex from 'vuex'
import {users} from "./Modules/users.module";
import {profile} from "./Modules/profile.module";
import {posts} from "./Modules/posts.module";
import {comments} from "./Modules/comments.module";
import {commentReplies} from "./Modules/commentReplies.module";
import {tools} from "./Modules/tools.module";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    profile,
    posts,
    comments,
    commentReplies,
    tools
  }
})
