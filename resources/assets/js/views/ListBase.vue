/**
 * Displays The list of drinks depending on whether they are alcoholic or not.
 * Allows to filter out the Drinks that have no image available.
 */
<template @addFavourite="console.log('tet')">
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>{{$route.params.base ? spaceThis($route.params.base) : 'All'}}</h5>
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
        spaceThis (text) {
            return text.replace("_", " ");
        },
        updateDrinks () {
            if(this.$route.params.base){
                    FetchList.byBase(this.$route.params.base)
                        .then(response => this.drinks = response.data.drinks);
            }
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
                return this.drinks.filter( function(el) {
                    if(el.strDrinkThumb){
                        return true
                    } else return false;
                });
            } else return this.drinks;
        }
    }
}
</script>
