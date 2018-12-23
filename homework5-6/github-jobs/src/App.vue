<template>
    <div id="app" class="container">
        <nav id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/positions">Positions</router-link>
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
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                job: '',
                location: ''
            }
        },
        methods:{
            searchPosition(){
                if(this.job !== '' || this.location !== ''){
                    this.$router.push({ path: 'positions', query: { job: this.job, location: this.location, page:1 } });
                }
            }
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
