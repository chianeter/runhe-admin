<template>
    <div class="loginview">
        <div class="login-from">
            <h1 class="login-title">系统登录</h1>
            <el-input
                placeholder="请输入内容"
                v-model="login.username"
                class="login-input"
                prefix-icon="el-icon-user"
                clearable>
            </el-input>
            <el-input
                placeholder="请输入密码"
                v-model="login.password"
                show-password
                class="login-input"
                prefix-icon="el-icon-lock"
                clearable>
            </el-input>
           
            <div class="v-code">
                <el-input  
                class="login-input v-input" 
                prefix-icon="el-icon-key"
                v-model="login.text"
                placeholder="请输入验证码">
                </el-input>
                <img :src="imgsrc"  class="v-img" @click="changevcode"/>
            </div> 
            <el-button type="primary" class="login-submit" @click="superlogin">登录 </el-button>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            login:{
                username:"",
                password:"",
                text:"",
                uuid:""
            },
            imgsrc:"",
            time:""
        };
    },
    created() {
        this.reRender();
        this.intervalRerender();
    },

    methods: {
        reRender(){
            let uuid = this.uuid();
            this.login.uuid = uuid;
            this.imgsrc = `http://81.68.121.52:8000/api/generateimagecode?uuid=${uuid}`
        },
        uuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(
                c
            ) {
                var r = (Math.random()*16) | 0,
                v = c =="x" ? r :(r & 0x3) |0x8;
                return v.toString(16)
            }
            );
        },
        intervalRerender(){
            clearInterval(this.time);
            this.time = setInterval(() =>{
                this.reRender()
            },1000 * 60)
        },
        changevcode() {
            this.reRender()
            this.intervalRerender();
        },
        superlogin(){
            this.$http({
                url:"api/supersignin ",
                method:"POST",
                data:`username=${this.login.username}&password=${this.login.password}&uuid=${this.login.uuid}&text=${this.login.text}`
            })
          
            .then(res => {
                if(res.data.status === "error"){
                    this.$message.error(res.data.msg);
                }else{
                    //将后端给的Token存起来 方便后期使用 cookie
                    let date = new Date();
                    date.setHours(date.getHours() + 10);
                    this.$cookie.set('rh_id', res.data.token ,{ expires: date });
                    this.$store.commit('saveToken',res.data.token)
                    this.$message({
                        message:`${res.data.username}-${res.data.msg}`,
                        type:"success"
                   })
                    this.$router.push('/');
                }
                this.login.username = "";
                this.login.text = "";
                this.login.password= "";
                this.reRender();
                this.intervalRerender();
                
            
            })
            .catch(error => {
                this.$message.error( "登录异常" );
            });
            this.login.username = "";
                this.login.text = "";
                this.login.password= "";
                this.reRender();
                this.intervalRerender()
  
        }
    },
};
</script>
<style>
    .login-input input:focus {
        border: 1xp solid hsla(0, 0%, 100%, .1);
    }
    .login-input input {
        color: #fff;
        outline: none;
        background: transparent;
        border: 1xp solid hsla(0, 0%, 100%, .1);
    }

</style>

<style scoped>
    .v-input {
        width: 50%;
        margin: 0 !important;
    }
    .v-img{
        height: 40px;
        cursor:pointer ;
    }
    .v-code {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
    }
    .login-submit {
        width: 100%;
    }
    .login-input {
        margin-bottom: 30px;
    }
    .login-title {
        font-size: 26px;
        color: #eee;
        margin:  0 auto 40px auto;
        text-align: center;
        font-weight: 700;
    }
    .login-from{
        width: 450px;
        padding: 160px 35px 0px 35px;
        margin: 0 auto;
        height: 200px;
    }
    .loginview{
        height: inherit;
        background: #2d3a4b;
    }

</style>