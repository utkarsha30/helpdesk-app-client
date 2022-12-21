<template>
    <div>
        <loading-icon v-if="loading"></loading-icon>
        <div class="alert alert-danger" role="alert" v-if="error">
                {{ error.message }}
        </div> 
    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4" >
        <b-card-title>All FAQs</b-card-title>
        <hr />
        <b-list-group class="m-2" v-for="faq in faqs" :key="faq._id">
            <b-list-group-item class="question" ><span class="font-weight-bold">Question:</span> {{faq.question}}</b-list-group-item>
            <b-list-group-item class="answer"><span class="font-weight-bold">Answer:</span> {{faq.answer}}</b-list-group-item>
        </b-list-group>
    </b-card> 
</div> 
</template>

<script>
import {getAllFaqs} from '@/service/faq';
import LoadingIcon from '@/components/pages/LoadingIcon.vue'
export default {
    name:'FaqPage',
    components:{
        LoadingIcon
    },
    data(){
        return{
            faqs:[],
            loading:false,
            error: null,
        }
    },
    async mounted(){
        this.loading = true;
        try{
            const faqs = await getAllFaqs();
            this.faqs = faqs;
            console.log(this.faqs);
        }
        catch(error){
            this.error = error;
        }
        finally{
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.extra-css{
    box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
.question{
    background-color: #ed0a71;
}
.answer{
    background-color:#f8edf5;
}

</style>