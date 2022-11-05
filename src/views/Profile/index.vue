<template>
    <div class="profile">
        <el-descriptions class="profile_title" title="用户信息" :column="1"   direction="vertical" border>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-picture-outline-round"></i>
                    头像
                </template>
                <el-upload :headers="header" :show-file-list="false" ref="upload" class="avatar-uploader" :auto-upload="false"
                    action="http://81.68.121.52:8000/api/changesuperavator" name="avator" :on-change="change"
                    :on-success="success">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    用户名
                </template>
                {{ user.username }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-phone"></i>
                    手机号
                </template>
                {{ user.phone }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-custom"></i>
                   性别
                </template>
                {{ user.gender }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                   邮箱
                </template>
                {{ user.email }}
            </el-descriptions-item>
        </el-descriptions>

        

        <el-descriptions title="更改信息" class="profile_change"  :column="1"  >
                <el-descriptions-item class="porfile_step" :space="space">
                    <el-steps :active="active" finish-status="success">
                    <el-step title="验证"></el-step>
                    <el-step title="完成"></el-step>
                    </el-steps>
                </el-descriptions-item>

            
            <el-descriptions-item title="输入邮箱获取验证码">
                <el-input v-model="email" class="profile_input"></el-input>
                <el-button @click="sendSMS">确定</el-button>
            </el-descriptions-item>

        </el-descriptions>

    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState(['user']),
        // username(){
        //     return this.$store
        // } 
  


    },
    created() {
        this.imageUrl = this.$store.state.user.avator;
    },

    data() {
        return {
            imageUrl: '',
                header: {
                        authorization: `Bearer ${this.$store.state.token}`
                    },
            email:'',
            avator:'',
           


        };
    },

    methods: {
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        change(file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.imageUrl = e.target.result
            }
            reader.readAsDataURL(file.raw)
             this.$refs.upload.submit();
        },
        success() {
            this.$message({
                type: 'success',
                message: '用户头像更改成功'
            })
        },
        a(e) {
            let file = e.target.files[0]
            var reader = new FileReader();
            reader.onload = (e) => {
                this.src = e.target.result
            }
            reader.readAsDataURL(file);

        },
        
        async sendSMS() {
            let formdata = new FormData()
            formdata.append("email", this.email)
            const response = await this.$http({
                method: "POST",
                url: 'api/superbindemail',
                data:formdata
            })
            let res = response.data;
            if (res.status == 'error') {
                this.$message.error(res.msg);

            } else {
                let { value } = await this.$prompt('请输入邮箱中的验证码进行绑定', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^\w{4}$/,
                    inputErrorMessage: '验证码格式错误'
                })
               let response= await this.$http({
                    method: 'PUT',
                    data: `text=${value}`,
                    headers: {
                        'Conten-Type': "application/x-www-form-urlencoded"
                    },
                    url: 'api/superbindemail'

                })
                let res = response.data;
                if (res.status == 'error') {
                    this.$message.error(res.msg)
                } else {
                    this.$message({
                        type: "success",
                        message: res.msg
                    })
                }
            }

        },
        
        
        
    },
};

</script>


<style >
.profile {
    border-radius: 5px;
    display: flex;
    padding: 20px;
    justify-content:space-around
}

.profile_title {
    width: 500px;
    height: 400px;


}
.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;   
    left: 40%;
}
.avatar {
    width: 80px;
    height: 80px;
    display: block;

}
.profile_change {
    width: 500px;
}
.profile_input {
    width: 300px;
    padding: 20px;
}
.porfile_step{
    width: 400px;
}

</style>