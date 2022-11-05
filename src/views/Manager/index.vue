<template>
   <div>

        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label= "编号" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机" >
            </el-table-column>
            <el-table-column prop="email" label="邮箱" >
            </el-table-column>
            <el-table-column prop="gender" :formatter="formatter" label="性别">
            </el-table-column>
            <el-table-column prop="avator" label="头像" >
                <template #default="{row}">
                    <el-avatar shape="square" :src="url + row.avator" size="small"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期">
            </el-table-column>
            <el-table-column prop="update_time" label="修改日期">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                        
                <template #default="{row}">
                    <el-button type="danger" size="small" @click="remove(row.id)">删除</el-button>
                </template>
            </el-table-column>

            
        </el-table>

     
    </div>
</template>

<script>
import{ url } from '@/axios'

export default {
  

    data() {
        return {
            list:[],
             url:'http://81.68.121.52:8000/'
        };
       
    },
    created(){
        this.render()
    },

    methods: {
        render(){
            this.$http({
                url:'api/superusers'
            }).then(response => {
                let res = response.data;

                if(res.status == 'error') {
                    this.$message.error(res.msg)
                }else {
                    res.data.forEach(item => {
                    item.create_time = new Date(item.create_time).toLocaleString();
                    item.update_time = new Date(item.update_time).toLocaleString();
                })
                    this.list = res.data;
                }
            })
        },
        formatter(row,column,cellValue,index){
            if(cellValue == 1){
                return "男"
            }else {
                return "女"
            }
        },
        remove(pk) {
            this.$http({
                method:'DELETE',
                data:`pk=${pk}`, 
                url:"api/removesuperuser",
                headers:{
                    'Content-Type':"application/x-www-form-urlencoded"
                },
               
            }).then(response => {
                let res = response.data;
                if(res.status == 'error') {
                    this.$message.error(res.msg)
                }else{
                    this.$message({
                        type:'success',
                        message:res.msg
                    })
                    this.render()
               
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>

</style>