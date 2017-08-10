<template @addFavourite="console.log('tet')">
    <div class="row">
        <div class="col s12 m12">
            <h4>Favorite Drinks</h4>
        </div>
        <div v-for="drink in favouritesObjects" class="col s12 m6 l4 xl3">
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
        spaceThis (text) {
            return text.replace("_", " ");
        },
        updateDrinks () {
            if(this.$route.params.base)
                FetchList.byBase(this.$route.params.base)
                    .then(response => this.drinks = response.data.drinks);
            else
                this.drinks = {};
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
