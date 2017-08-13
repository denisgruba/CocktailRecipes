/**
 * Every single Favourite drink will be displayed here.
 * Drink objects are saved in a variable and then saved to Local Storage,
 * so they can persist even on a page reload.
 * Drinks without image can be filtered out.
 */
<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Favorite Drinks</h4>
            <h5 v-if=""></h5>
        </div>

        <div v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3 drink-container">
            <drink-card :drink="drink" :favs="favouritesID"></drink-card>
        </div>
    </div>
</template>

<script>
import FetchList from '../models/FetchList';

export default {
    data() {
        return {
            drinks: [],
        }
    },
    methods: {
        addFavourite (object) {
            store.commit('addFavourite', object);
        },
        removeFavourite (object) {
            store.commit('removeFavourite', object);
        },
        spaceThis (text) {
            return text.replace("_", " ");
        },
        updateDrinks () {
            if(this.$route.params.base)
                FetchList.byBase(this.$route.params.base)
                    .then(response => this.drinks = response.data.drinks);
            else
                this.drinks = [];
        },
    },
    created() {
        this.updateDrinks();
    },
    watch: {
        '$route' (to, from) {
            this.updateDrinks();
        },
    },
    computed: {
        favouritesID () {
            return store.state.favouritesID;
        },
        favouritesObjects () {
            return store.state.favouritesObjects;
        },
        hideThumbs () {
            return store.state.hideThumbs;
        },
        drinksFiltered: function () {
            if(this.hideThumbs){
                return this.favouritesObjects.filter( function(el) {
                    if(el.strDrinkThumb){
                        return true
                    } else return false;
                });
            } else return this.favouritesObjects;
        }
    }
}
</script>
