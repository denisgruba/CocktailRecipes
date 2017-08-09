<template @addFavourite="console.log('tet')">
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>{{$route.params.base ? spaceThis($route.params.base) : 'All'}}</h5>
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
            favouritesID: []
        }
    },
    methods: {
        addFavourite (id) {
            this.favouritesID.push(id);
        },
        removeFavourite (id) {
            this.favouritesID.splice( this.favouritesID.indexOf(id), 1 );
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
    },
    watch: {
        '$route' (to, from) {
            this.updateDrinks();
        },
        favouritesID () {
            favouritesID = this.favouritesID;
        }
    }
}
</script>
