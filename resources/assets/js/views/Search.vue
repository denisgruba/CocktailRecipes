<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Search</h4>
            <h5 v-if="this.searchString">Contains {{this.searchString}}</h5>
            <a class="waves-effect waves-light btn blue" @click="toggleImageFilter"><i class="material-icons left">broken_image</i>{{this.filterImagesOut ? 'Show Missing Images' : 'Hide Missing Images'}}</a>
            <div class="input-field">
                <i class="material-icons prefix">search</i>
                <input type="text" id="searchString" class="validate" v-model="searchString">
                <label>Search</label>
            </div>
        </div>
        <div v-if="drinks" v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3">
            <drink-card :drink="drink" :favs="favouritesID" @fave="addFavourite" @unfave="removeFavourite"></drink-card>
        </div>
    </div>
</template>

<script>
import FetchList from '../models/FetchList';

export default {
    data() {
        return {
            drinks: [],
            searchString: '',
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
        updateDrinks () {
            if(this.searchString)
            FetchList.byLetter(this.searchString)
            .then(response => this.drinks = response.data.drinks);
            else
            this.drinks = {};
        },
        toggleImageFilter () {
            this.filterImagesOut=!this.filterImagesOut;
        }
    },
    created() {
        this.updateDrinks();
        this.favouritesID = favouritesID;
        this.favouritesObjects = favouritesObjects;
    },
    watch: {
        searchString () {
            this.updateDrinks();
        },
        favouritesID () {
            favouritesID = this.favouritesID;
            Vue.ls.set('favouritesID', favouritesID);
        },
        favouritesObjects () {
            favouritesObjects = this.favouritesObjects;
            Vue.ls.set('favouritesObjects', favouritesObjects);
        },
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
