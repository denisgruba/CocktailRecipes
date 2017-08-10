<template>
    <div class="navbar-fixed">
        <nav class="blue">
            <ul id="slide-out" class="side-nav fixed">
                <li><a href="" class="disabled">View Bases:</a></li>
                <li v-for="base in bases" v-if="base.strAlcoholic">
                    <router-link :to="{ name: 'ListBase', params: { base:  underscoreThis(base.strAlcoholic) }}">
                        {{base.strAlcoholic}}
                    </router-link>
                </li>
            </ul>
            <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">tune</i></a>
            <div class="nav-wrapper">
                <ul class="left">
                    <router-link to="/" exact tag="li"><a>Home</a></router-link>
                    <router-link to="/List" exact tag="li"><a>List</a></router-link>
                    <router-link to="/List/Favorites" exact tag="li"><a>Favorites</a></router-link>
                </ul>
                <ul class="right">
                    <li>
                        <a @click="clearLocalStorage">Remove All Favorites</a>
                    </li>
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
            bases: {}
        }
    },
    methods: {
        underscoreThis (text) {
            return text.replace(/ /g,"_");
        },
        clearLocalStorage () {
            Vue.ls.clear();
        }
    },
    created() {
        Base.all()
            .then(response => this.bases = response.data.drinks);
            $(document).ready(function(){
                $(".button-collapse").sideNav();
            });
    }
}
</script>
