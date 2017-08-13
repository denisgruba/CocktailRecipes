/**
 * Provides a list of drinks filtered by their ingredients.
 * It was just way to messy to use in this state.
 */
<template @addFavourite="console.log('tet')">
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>{{$route.params.ingredient ? spaceThis($route.params.ingredient) : 'All'}}</h5>
        </div>
        <ul class="pagination">
            <li v-for="ingredient in ingredients" :class="$route.params.ingredient == underscoreThis(ingredient.strIngredient1) ? 'active' : 'waves-effect'">
                <router-link :to="{ name: 'ListIngredientSelected', params: { ingredient:  underscoreThis(ingredient.strIngredient1) }}">
                    {{ingredient.strIngredient1}}
                </router-link>
            </li>
        </ul>
        <div v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3 drink-container">
            <drink-card :drink="drink" :favs="favouritesID"></drink-card>
        </div>
    </div>
</template>

<script>
import Ingredients from '../models/Ingredients';
import FetchList from '../models/FetchList';

export default {
    data() {
        return {
            ingredients: [],
            drinks: [],
        }
    },
    methods: {
        getIngredientsList (){
            Ingredients.all()
                .then(response => this.ingredients = response.data.drinks);
        },
        underscoreThis (text) {
            return text.replace(/ /g,"_");
        },
        spaceThis (text) {
            return text.replace("_", " ");
        },
        updateDrinks () {
            if(this.$route.params.ingredient)
                FetchList.byIngredient(this.$route.params.ingredient)
                    .then(response => this.drinks = response.data.drinks);
            else
                this.drinks = [];
        },
    },
    created() {
        this.getIngredientsList();
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
