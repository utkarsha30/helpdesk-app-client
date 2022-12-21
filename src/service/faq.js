import {BASE_URL} from '@/config';
import axios from 'axios';


const getAllFaqs = async()=>{
    const response = await axios.get(`${BASE_URL}/FAQ`);
    
    return response.data;
}
export{
    getAllFaqs
}