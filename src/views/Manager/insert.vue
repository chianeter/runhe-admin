<template>
    <div class="manager-insert">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
            <el-from-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>


            </el-from-item>
            <el-from-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>


            </el-from-item>
        </el-form>
        
       
        
    </div>
</template>

<script>
export default {

    data() {
    const validateUsername = (rule,vale ,callback) => {
        if(/\w{6-18}/.test(value)) {
            callback()
        }else{
            callback(Error('用户名6-18位'))
        }
    }

        return {
            form:{
                username:""
            },
            rules:{
                username:[
                    {
                        validator: validateUsername,
                        trigger:'blur'
                    }
                ]
            }
        };
    },


    methods: {
        onSubmit(){
            this.$refs.form.validate(valid => {
                if(valid) {
                    let formdata = new FormData();
                    formdata.append('username',this.form.username)
                    this.$http({
                        method:'POST',
                        data:formdata,
                        url:'api/createsuperuser'
                    }).then(response => {
                        let res = response.data;
                        if(res.status == 'error') {
                            this.$message.error(res.msg)
                        }else {
                            this.$alert( `用户名:${res.username}\n密码:${res.password}`,'新增账号信息', {
                                confirmButtonText: '确定',
                                
                                });
                        }
                    })
                }else {
                    return false;
                }
            })
        }
    },
};
</script>

<style  scoped>
.manager-insert{
    background-color: #fff;
    height: 100%;
}

</style>