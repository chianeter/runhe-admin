import VueX from 'vuex';
import Vue from 'vue';
import axios from '@/axios'
import {url} from '@/axios'

Vue.use(VueX)

export default new VueX.Store({
    state: {
        msg: 'hellow Vuex',
        isCollapse: false,
        user: {
            username: "",
            avator: "",
            email:"",
            phone:"",
            gender:""
        },
        token: ""
    },
    mutations: {
        removeToken(state){
            state.token = '';
        },
        saveToken(state, token) {
            state.token = token;
        },
        changeMsg(state, value) {
            state.msg = value;
        },
        changeIsCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        saveUserProfilre(state,payload){
            state.user.username = payload.username;
            state.user.avator = payload.avator;
            state.user.phone = payload.phone;
            state.user.email = payload.email;
            state.user.gender = payload.gender
            if(payload.gender == 1) {
                state.user.gender = "男";
            }else {
                state.user.gender = "女";
            }
        }
    },
    actions: {
        getUserProfile({ commit }) {

            return new Promise((resolve, reject) => {
                axios({
                    url: 'api/superprofile',

                }).then(res => {
                    if(!res.data.status) {
                        res.data.avator = `${url}${res.data.avator}`
                        //成功了 那道信息了 接下来存储道VueX
                        commit('saveUserProfilre',res.data)
                       resolve(res.data)
                    }else{
                        reject(res.data)
                    }

                }).catch(error => {
                    reject(error)
                })
            })

        }
    }
})
// actions  存放异步操作
// mutations 存放同步操作