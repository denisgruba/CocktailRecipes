<template>
    <div class="row">
        <div class="col s12 m6">
            <h4>{{drink.strDrink}}</h4>
            <h5 class="grey-text text-darken-3">{{drink.strAlcoholic}}</h5>
            <h6 class="grey-text text-darken-3">{{drink.strCategory}}</h6>
            <p>{{drink.strInstructions}}</p>
        </div>
        <div class="col s12 m6">
            <p class="center-align">
                <img class="materialboxed responsive-img" :src="drink.strDrinkThumb">
            </p>
        </div>
        <div class="col s12 m6">

        </div>
    </div>
</template>

<script>
import FetchSingle from '../models/FetchSingle';

export default {
    data() {
        return {
            drink: {}
        }
    },
    methods: {
        updateDrink () {
            if(this.$route.params.id)
                FetchSingle.id(this.$route.params.id)
                .then(response => this.drink = response.data.drinks[0]);
            $(document).ready(function(){
                $('.materialboxed').materialbox();
            });
        }
    },
    created() {
        this.updateDrink();
    },
    watch: {
        '$route' (to, from) {
            this.updateDrink();
        }
    }
}
</script>
