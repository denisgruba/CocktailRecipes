<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
        </div>
    </div>
</template>
<script>
import Base from '../models/Base';

export default {
    data() {
        return {
            drinks: {}
        }
    },
    created() {
        Base.all()
            .then(response => this.drinks = response.data.drinks);
    }
}
</script>
