/**
 * Performs search for matching names in the API on update of the search input.
 */
<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Search By Name</h4>
            <h5 v-if="this.searchString">Name Contains "{{this.searchString}}"</h5>
            <h6 v-if="searchString && drinks!=null">Found {{drinks.length}}:</h6>
            <div class="input-field">
                <i class="material-icons prefix">search</i>
                <label for="searchString">Search</label>
                <input type="text" id="searchString" class="validate" v-model="searchString">
            </div>
        </div>
        <div v-if="drinks" v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3">
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
            searchString: '',
        }
    },
    methods: {
        updateDrinks () {
            if(this.searchString)
            FetchList.byLetter(this.searchString)
            .then(response => this.drinks = response.data.drinks);
            else
            this.drinks = [];
        },
        toggleImageFilter () {
            this.filterImagesOut=!this.filterImagesOut;
        }
    },
    created() {
        this.updateDrinks();
    },
    watch: {
        searchString () {
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
        },
    }

}
</script>
