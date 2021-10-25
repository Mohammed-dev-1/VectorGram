<template>
    <!-- Navigation -->
    <div class="shadow-sm pl-3 pr-3">
        <b-navbar toggleable="lg" type="light" variant="#d9d9d9">
            <router-link :to="{ name: 'Posts' }">
                <b-navbar-brand @click="setLoader" class="logo-prand">VectorGram</b-navbar-brand>
            </router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- <b-navbar-nav>
                    <b-nav-item href="#">Link</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav> -->

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto p-2">
                    <!-- <NavLang /> -->
                    <div @click="search" class="d-flex cursor">
                        <div class="search-icon mt-2 center-items">
                            <b-icon icon="search"></b-icon>
                        </div>
                        <span class="mt-3 ml-2 font-weight-bold d-md-none">Search</span>
                    </div>
                    
                    <NavUserItem v-if="initialState.loggedIn"/>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    // import NavLang from "../Navigation/NavLang";
    import NavUserItem from "../Navigation/NavUserItem";
    import { mapState } from 'vuex';

    export default {
        name: 'BaseNav',
        components: {
            // NavLang,
            NavUserItem,
        },
        computed: {
            ...mapState('users', [
                'initialState'
            ])
        },
        methods: {
            setLoader() {
                this.$store.commit('tools/SET_LOADER', true)
            },
            search() {
                this.$router.push({name:'Search'})
            }
        }
    }
</script>

<style lang="scss" scoped>
div { 
    .logo-prand { 
        font-family: 'Ephesis', cursive !important; 
        font-weight: bold;
        color: $primary;
    } 
    .search-icon {
        width: 42px;
        height: 42px;
        background-color: #d9d9d9;
        background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);
        // background: $dark;
        color: $dark;
        border-radius: 100%;
        font-weight: bold;
    }
}
</style>