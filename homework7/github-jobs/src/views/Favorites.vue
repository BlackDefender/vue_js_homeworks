<template>
    <table class="text-left">
        <tr>
            <th>Position</th>
            <th></th>
        </tr>
        <tr v-for="position in jobs">
            <td>
                <router-link class="text-primary" :to="{name:'singlePosition', params:{id:position.id}}">{{position.title}}</router-link>
            </td>
            <td>
                <FavoriteButton :positionId="position.id" :positionTitle="position.title" :favoriteJobs="favoriteJobs"></FavoriteButton>
            </td>
        </tr>
    </table>
</template>

<script>
    import FavoriteButton from '../components/FavoriteButton.vue';

    export default {
        name: "Favorites",
        props:{
            favoriteJobs: {
                type: Array,
                required: true
            }
        },
        data(){
            return {
                jobs:[]
            }
        },
        components: {
            FavoriteButton
        },
        created(){
            // убираем реактивность чтоб работы не пропадали из списка на странице когда уходят из избранного
            this.jobs = this.favoriteJobs.slice();
        }
    }
</script>

<style scoped>

</style>