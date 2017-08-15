/**
* Template for the Navigation Component Display all the available links.
* Also pulls the list of Categories available for the Left sideNav.
*/
<template>
    <div class="navbar-fixed">
        <nav class="blue">
            <ul id="slide-out" class="side-nav fixed">
                <li><a class="disabled">View Bases:</a></li>
                <li v-for="base in bases" v-if="base.strAlcoholic">
                    <router-link :to="{ name: 'ListBase', params: { base:  underscoreThis(base.strAlcoholic) }}">
                        {{base.strAlcoholic}}
                    </router-link>
                </li>
                <li><a class="disabled">Filters:</a></li>
                <li @click="toggleThumbs">
                    <a v-if="hideThumbs" class="cursor-pointer">Show Results with Missing Images</a>
                    <a v-else class="cursor-pointer">Hide Results with Missing Images</a>
                </li>
            </ul>
            <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">tune</i></a>
            <div class="nav-wrapper">
                <ul class="left">
                    <router-link to="/" exact tag="li"><a>Home</a></router-link>
                    <router-link to="/Search" exact tag="li"><a>Search</a></router-link>
                    <router-link to="/List/Favorites" exact tag="li"><a>Favourites <span v-if="favouritesID.length">({{favouritesID.length}})</span></a></router-link>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import Base from '../models/Base';

export default {
    data() {
        return {
            bases: {},
        }
    },
    methods: {
        underscoreThis (text) {
            return text.replace(/ /g,"_");
        },
        clearLocalStorage () {
            Vue.ls.clear();
        },
        toggleThumbs () {
            store.commit('toggleThumbs');
        },
    },
    created() {
        Base.all()
        .then(response => this.bases = response.data.drinks);
        $(document).ready(function(){
            $(".button-collapse").sideNav();
        });
    },
    computed: {
        hideThumbs () {
            return store.state.hideThumbs;
        },
        favouritesID () {
            return store.state.favouritesID;
        },
    },
}
</script>
