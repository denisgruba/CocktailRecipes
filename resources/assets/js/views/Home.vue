/**
 * Page view for the Home, pulls a list of random drinks.
 */
<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>Find Inspiration with this set of Random Drinks:</h5>
        </div>
        <div v-for="drink in drinks" class="col s12 m6 l4 xl3 drink-container">
            <drink-card :drink="drink[0]" :favs="favouritesID" @fave="addFavourite" @unfave="removeFavourite"></drink-card>
        </div>
    </div>
</template>

<script>
import Base from '../models/Base';

export default {
    data() {
        return {
            drinks: [],
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
            for(var i = 0; i < 12; i++){
                Base.random()
                    .then(response => this.drinks.push(response.data.drinks));
            }
        }
    },
    created() {
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
    }
}
</script>
