<template>
    <div class="mark" v-if="state">
        <div class="title_from">
            <el-form 
            ref="ruleForm"
            :rules="rules"
            class="title_add" 
            label-position="center" 
            label-width="auto" 
            :model="formLabelAlign">
            <el-form-item label="新增标题名称">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>

            <el-form-item class="">
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button @click="cancelForm('ruleForm')">取消</el-button>
            </el-form-item>
            </el-form>
      
        </div>
    </div>
</template>

<script>
//$chilrem $parent $root $emit

export default {
    props:{
        state: {
            type: Boolean,
            default(){
                return false
            }
        }
    },

    data() {
        const validateName = ( rule ,value ,callback) =>{
            if(value == ""){
                callback(new Error("请输入标题名称"));

            }else{
                callback();
            }
        }
        return {
            formLabelAlign:{
                name:""

            },
            rules:{
                name:[
                    {
                        validator:validateName,trigger:'blur'
                    }
                ]
            },
       
        };
    },


    methods: {
        submitForm(name){
            
            this.$refs[name].validate((state) =>{
                if(state){
                    let name = this.formLabelAlign.name
                    let formDate = new FormData();
                    formDate.append("name",name)
                    this.$http({
                        url:'/api/classify',
                        method:"POST",
                        data:formDate
                    }).then(res =>{
                        let response = res.data;
                        if(response.status == 'success'){
                            this.formLabelAlign.name = "";
                             this.$emit('cancel')
                             this.$message({
                                type:'success',
                                message:`${response.msg}:${response.title}`
                             })
                             this.$emit("success");

                        }else{
                            this.$message.error(response.msg)
                        }
                        console.log(response);
                    }).catch(error =>{
                        this.$message.error("接口错误")
                    })
                }else{
                    return false;
                }
            })
        },
        cancelForm(){
            this.formLabelAlign.name = "";
            this.$emit('cancel')
       
        }
    },
};
</script>
<style scoped>
.title_from {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    padding-top: 40px;

}
</style>

<style >
    .title_add .el-from-item_content {
        margin-left: 0;
    }
    .mark {
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba( 0, 0 , 0, .4);
        z-index: 999;
    }
</style>