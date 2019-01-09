<template>
    <div id="app" class="container">
        <nav id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/positions">Positions</router-link> |
            <router-link :to="{name: 'favorites'}">Favorites</router-link>
        </nav>
        <form @submit.prevent="searchPosition()" class="search-panel">
            <label class="search-field-container">
                <span class="search-field-title">Job Description</span>
                <input class="form-control" v-model="job" type="text" placeholder="Filter by title, benefits, companies, expertise">
            </label>
            <label class="search-field-container">
                <span class="search-field-title">Location</span>
                <input class="form-control" v-model="location" type="text" placeholder="Filter by city, state, zip code or country">
            </label>
            <label>
                <button class="btn btn-primary" type="submit">Search</button>
            </label>
        </form>
        <router-view :key="$route.fullPath" :favoriteJobs="favoriteJobs"></router-view>
    </div>
</template>

<script>
    import {eventBus} from './main'
    export default {
        data(){
            return{
                job: '',
                location: '',
                favoriteJobs: []
            }
        },
        methods:{
            searchPosition(){
                if(this.job !== '' || this.location !== ''){
                    this.$router.push({ name: 'positions', query: { job: this.job, location: this.location, page:1 } });
                }
            },
            changeFavoriteJobs(positionId, positionTitle){
                const positionIndex = this.favoriteJobs.findIndex(function (item) {
                    return item.id === positionId;
                });
                if(positionIndex >= 0){
                    this.favoriteJobs.splice(positionIndex, 1);
                }else{
                    this.favoriteJobs.push({
                        id: positionId,
                        title: positionTitle
                    });
                }
                this.saveFavoriteJobs();
            },
            loadFavoriteJobs(){
                const favoriteJobs = localStorage.getItem('favoriteJobs');
                if(favoriteJobs){
                    try {
                        this.favoriteJobs = JSON.parse(favoriteJobs)
                    }catch (e) {
                        console.log('Произошла ошибка при загрузке избранных работ.', e);
                        this.favoriteJobs = [];
                    }
                }else{
                    this.favoriteJobs = [];
                }
            },
            saveFavoriteJobs(){
                localStorage.setItem('favoriteJobs', JSON.stringify(this.favoriteJobs));
            },
            clearFavoriteJobs(){
                this.favoriteJobs = [];
                this.saveFavoriteJobs();
            }
        },
        created(){
            this.loadFavoriteJobs();
            eventBus.$on('changeFavoriteJobs', this.changeFavoriteJobs);
        },
        beforeDestroy(){
            this.saveFavoriteJobs();
        }
    }
</script>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
    .search-panel{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        text-align: left;
        .search-field-container{
            .search-field-title{
                display: block;
            }
        }
    }
</style>
