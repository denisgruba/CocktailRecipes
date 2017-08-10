<template @addFavourite="console.log('tet')">
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>{{$route.params.ingredient ? spaceThis($route.params.ingredient) : 'All'}}</h5>
            <a class="waves-effect waves-light btn blue" @click="toggleImageFilter"><i class="material-icons left">broken_image</i>{{this.filterImagesOut ? 'Show Missing Images' : 'Hide Missing Images'}}</a>
        </div>
        <ul class="pagination">
            <li v-for="ingredient in ingredients" :class="$route.params.ingredient == underscoreThis(ingredient.strIngredient1) ? 'active' : 'waves-effect'">
                <router-link :to="{ name: 'ListIngredientSelected', params: { ingredient:  underscoreThis(ingredient.strIngredient1) }}">
                    {{ingredient.strIngredient1}}
                </router-link>
            </li>
        </ul>
        <div v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3 drink-container">
            <drink-card :drink="drink" :favs="favouritesID" @fave="addFavourite" @unfave="removeFavourite"></drink-card>
        </div>
    </div>
</template>

<script>
import Ingredients from '../models/Ingredients';
import FetchList from '../models/FetchList';

export default {
    data() {
        return {
            ingredients: {},
            drinks: [],
            favouritesID: [],
            favouritesObjects: [],
            filterImagesOut: false,
        }
    },
    methods: {
        addFavourite (object) {
            this.favouritesID.push(object.idDrink);
            this.favouritesObjects.push(object);
        },
        removeFavourite (object) {
            this.favouritesID.splice( this.favouritesID.indexOf(object.idDrink), 1 );
            this.favouritesObjects = this.favouritesObjects.filter( function(el) {
                if(el.idDrink !== object.idDrink){
                    return true
                } else return false;
            });
        },
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
        toggleImageFilter () {
            this.filterImagesOut=!this.filterImagesOut;
        }
    },
    created() {
        this.getIngredientsList();
        this.updateDrinks();
        this.favouritesID = favouritesID;
        this.favouritesObjects = favouritesObjects;
    },
    watch: {
        '$route' (to, from) {
            this.updateDrinks();
        },
        favouritesID () {
            favouritesID = this.favouritesID;
            Vue.ls.set('favouritesID', favouritesID);
        },
        favouritesObjects () {
            favouritesObjects = this.favouritesObjects;
            Vue.ls.set('favouritesObjects', favouritesObjects);
        }
    },
    computed: {
        drinksFiltered: function () {
            if(this.filterImagesOut){
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
