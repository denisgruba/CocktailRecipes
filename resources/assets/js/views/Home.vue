<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
        </div>
        <div v-for="drink in drinks" class="col s12 m6 l3 xl2">
            <div class="card">
                <div class="card-image">
                    <img :src="drink.strDrinkThumb">
                    <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite_border</i></a>
                </div>
                <div class="card-content">
                    <span class="card-title">{{drink.strDrink}}</span>
                    <p>{{drink.idDrink}}</p>
                </div>
                <div class="card-action">
                    <a href="#">This is a link</a>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            drinks: {}
        }
    },
    created() {
        axios.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
            .then(response => this.drinks = response.data.drinks);
    }
}
</script>
