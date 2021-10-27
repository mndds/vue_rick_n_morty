<template>
<v-container>
    <h1 class="display-2 mt-5 mb-10">Characters List</h1>

    <div v-if="loading">        
    </div>

    <div v-else-if="info && characters">
        
        <div class="mb-5" style="display: flex; align-items: center; gap:10px">

            <div>                
                <v-text-field v-model="filter.name" label="Name"/>
            </div>
            
            <div>
                <v-select label="Status" :items="statuses" v-model="filter.status"/>
            </div>

            <div>
                <v-select label="Gender" :items="genders" v-model="filter.gender"/>
            </div>            
            

            <v-btn color="primary" @click="loadCharacters">Filter</v-btn>           

        </div>

        <character-card-list :characters="characters"/>  
        
        <v-pagination class="mt-5" :total-visible="10" v-model="page" :length="info.pages" />
    </div>

    <div v-else>
        Server error
    </div>

</v-container>
</template>

<script>
import http from '@/plugins/http';
import CharacterCardList from '../components/CharacterCardList.vue';

export default { 
    components:  {CharacterCardList },
    data: () => ({
       loading:false,
        page: 1,
        info: null,
        characters: null,
        filter: {
            name: '',
            status: '',
            gender: '',            
        },
        statuses: [
                {text: "Don't filter", value: ''},
                {text: "Alive", value: 'alive'},
                {text: "Dead", value: 'dead'},
                {text: "Unknown", value: 'unknown'},
            ],
            genders: [
                {text: "Don't filter", value: ''},
                {text: "Male", value: 'male'},
                {text: "Female", value: 'female'},
                {text: "Unknown", value: 'unknown'},
            ],
    }),

    mounted() {
        this.loadCharacters();
    },

    watch: {
        page() {
            this.loadCharacters();
        }
    },

    methods: {
        loadCharacters() {
            this.loading = true;
            

            http.get('character',{
                params: {
                    ... this.filter,
                }
            })
                .then(response => {
                    const data = response.data;
                    this.info = data.info;
                    this.characters = data.results;
                })
                .finally(() => {
                    this.loading = false;
                    
                });
        },
        changePage(newPage) {
            this.page = newPage;
        }
    }
}
</script>