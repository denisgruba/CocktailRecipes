<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Search</h4>
            <h5 v-if="this.searchString">Contains {{this.searchString}}</h5>
            <div class="input-field">
                <i class="material-icons prefix">search</i>
                <input type="text" id="searchString" class="validate" v-model="searchString">
                <label>Search</label>
            </div>
        </div>
        <div v-for="drink in drinks" class="col s12 m6 l4 xl3">
            <drink-card :drink="drink" :favs="favouritesID" @fave="addFavourite" @unfave="removeFavourite"></drink-card>
        </div>
    </div>
</template>

<script>
import FetchList from '../models/FetchList';

export default {
    data() {
        return {
            drinks: {},
            searchString: '',
            favouritesID: [],
            favouritesObjects: []
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
        }
    },
    created() {
        // this.assignAlphabet();
        this.updateDrinks();
        this.favouritesID = favouritesID;
        this.favouritesObjects = favouritesObjects;
    },
    watch: {
        '$route' (to, from) {
            this.updateDrinks();
        },
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
        }
    }

}
</script>
