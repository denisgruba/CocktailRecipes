/**
 * Page view for the Home, pulls a list of random drinks.
 */
<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>Find Inspiration with this set of Random Drinks:</h5>
        </div>
        <div v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3 drink-container">
            <drink-card :drink="drink" :favs="favouritesID"></drink-card>
        </div>
    </div>
</template>

<script>
import Base from '../models/Base';

export default {
    data() {
        return {
            drinks: [],
        }
    },
    methods: {
        updateDrinks () {
            for(var i = 0; i < 12; i++){
                Base.random()
                    .then(response => this.drinks.push(response.data.drinks[0]));
            }
        }
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
