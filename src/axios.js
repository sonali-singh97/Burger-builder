import axios from 'axios';

const instance = axios.create({
   baseURL : 'https://burger-builder-5c387.firebaseio.com/' 
});

export default instance;