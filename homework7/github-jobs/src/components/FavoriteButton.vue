<template>
    <button :title="isFavorite() ? 'Favorite':'Not favorite'" :class="isFavorite() ? 'text-success':''" @click="changeFavorite()" type="button">&#9733;</button>
</template>

<script>
    import {eventBus} from '../main';

    export default {
        name: "FavoriteButton",
        props:{
            positionId:{
                type: String,
                required: true
            },
            positionTitle:{
                type: String,
                required: true
            },
            favoriteJobs: {
                type: Array,
                required: true
            }
        },
        methods: {
            changeFavorite(){
                eventBus.$emit('changeFavoriteJobs', this.positionId, this.positionTitle);
            },
            isFavorite(){
                const positionId = this.positionId;
                return -1 !== this.favoriteJobs.findIndex(function (item) {
                    return item.id === positionId;
                });
            }
        }
    }
</script>

<style scoped>

</style>