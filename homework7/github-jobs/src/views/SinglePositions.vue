<template>
    <div id="single-positions" class="text-left container pt-5">
        <h1 class="text-center mb-2">{{position.title}}</h1>
        <FavoriteButton :positionId="position.id" :positionTitle="position.title" :favoriteJobs="favoriteJobs"></FavoriteButton>
        <div>Company: {{position.company}}</div>
        <div>Type: {{position.type}}</div>
        <img class="company-logo" :src="position.company_logo" alt="">
        <div v-html="position.description"></div>
    </div>
</template>

<script>
    import FavoriteButton from '../components/FavoriteButton.vue';

    export default {
        name: "SinglePositions",
        data(){
            return {
                positionId: '',
                position:{}
            }
        },
        props:{
            favoriteJobs: {
                type: Array,
                required: true
            }
        },
        components: {
            FavoriteButton
        },
        methods: {
            fetchData(){
                fetch(`http://localhost:3000/positions/${this.positionId}.json`)
                    .then((response)=>{
                        return response.json();
                    })
                    .then((response)=>{
                        this.position = response;
                    })
                    .catch((error) =>{
                        console.log('error');
                        console.log(error)
                    })
            }
        },
        created(){
            this.positionId = this.$route.params.id;
            this.fetchData();
        }
    }
</script>

<style scoped>
.company-logo{
    max-width: 300px;
    max-height: 200px;
}
</style>