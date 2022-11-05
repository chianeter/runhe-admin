import axios  from "axios";
import store from '@/store'

export const url = "http://81.68.121.52:8000/"

const http = axios.create({
     baseURL:url,
    timeout:5000,
})

http.interceptors.request.use(function(config){
    config.headers['authorization'] = `Bearer ${store.state.token}`;
    return config;
}),function(error) {
    return Promise.reject(error);
}

export default  http