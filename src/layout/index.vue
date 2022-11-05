<template>
    <div id="home">
        <el-container>
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-main>
                    <keep-alive include="Title">
                    <!-- {{msg}} -->
                    <router-view></router-view>
                    <!-- <el-button @click="cd">修改state里面的值</el-button> -->
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { url } from '@/axios';
import Aside from "./aside.vue";
import Header from "./header.vue";
export default {
    components:{
        Aside,
        Header
    },
    data() {
        return {
            // user: {
            //     username: "",
            //     avator: ""
            // }
        }
    },
    // created() {
    //     let token = this.$cookie.get('rh_id');
    //     if (!token) {
    //         this.$message.error("请先登录")
    //         return this.$router.push('/login')
    //     }
        // this.$http({
        //     url: "api/superprofile",
        //     headers: {
        //         authorization: `Bearer ${token}`
        //     }
        // }).then(res => {
        //     if (res.data.status) {
        //         this.$message.error(res.data.msg);
        //     } else {
        //         this.user.username = res.data.username;
        //         this.user.avator = `${url}${res.data.avator}`
        //     }
        // }).catch(error => {
        //     this.$message.error('接口错误')
        // })
    // },
    // computed:{
    //     // msg(){
    //     //     return this.$store.state.msg;
    //     // }
    // },



    // methods: {
    //     logout() {
    //         this.$cookie.remove('rh_id');//
    //         this.$router.push("./login")
    //     },
    //     cd(){
    //         // this.$store.state.msg = 1000;
    //         //通过mutations修改state的值
    //         this.$store.commit('changeMsg',20000);
    //     }
    // },
};
</script>

<style scoped>
    #home{
        height: inherit;
        background-color: #f0f2f5;
    }
</style>
<style>
.el-container,
.el-aside{
    height: inherit;
}
.el-header {
    padding: 0;
    background-color: #fff;
}
</style>