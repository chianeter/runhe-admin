<template>
    <div>
    <el-table
    :data="log"
    style="width: 100%"
    >
    <el-table-column
      prop="id"
      label="编号"
      sortable 
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="create_time"
      sortable
      label="登陆时间"
      >
    </el-table-column>
   
    </el-table>

    </div>

   

</template>

<script>
export default {
    name: "Logs",
    data(){
        return {
            log:[]
        }
    },

    created(){
        this.$http({
            url:'api/supersigninlogs'
        }).then(res => {
            let response = res.data;
            if(response.status == 'success'){
                response.data.forEach(item => {
                    item.create_time = new Date(item.create_time).toLocaleString();
                    item.update_time = new Date(item.update_time).toLocaleString();
                })
                this.log = response.data;
            }else{
                this.$message.error(response.msg)
            }
        })
    }
};
</script>

<style>

</style>