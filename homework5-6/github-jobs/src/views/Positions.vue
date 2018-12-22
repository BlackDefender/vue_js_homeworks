<template>
    <div id="page-positions" class="container pb-5">
        <div class="text-left mb-2" v-for="position in positions">
            <router-link class="text-primary" :to="{name:'singlePosition', params:{id:position.id}}">{{position.title}}</router-link>
            <div class="position-description-item">Company: {{position.company}}</div>
            <div class="position-description-item">Type: {{position.type}}</div>
            <div class="position-description-item">Location: {{position.location}}</div>
        </div>
        <button class="btn btn-success mt-3" type="button" v-if="showMoreButton" @click="loadMore">Load more</button>
    </div>
</template>

<script>
    export default {
        name: "Positions",
        data(){
            return {
                positions: [],
                job: '',
                location: '',
                page: 1,
                showMoreButton: false
            }
        },
        methods: {
            fetchData(){
                fetch(`http://localhost:3000/positions.json?description=${this.job}&location=${this.location}&page=${this.page}`)
                    .then((response)=>{
                        return response.json();
                    })
                    .then((response)=>{
                        this.showMoreButton = response.length === 50;
                        this.positions = this.positions.concat(response);
                    })
                    .catch((error) =>{
                        console.log('error');
                        console.log(error)
                    })
            },
            loadMore(){
                this.page++;
                this.fetchData();
            }
        },
        created(){
            this.job = this.$route.query.job || '';
            this.location = this.$route.query.location || '';
            this.page = this.$route.query.page || 1;

            this.fetchData();
        }
    }
</script>

<style lang="less" scoped>
    .position-description-item{
        font-size: 12px;
    }
</style>