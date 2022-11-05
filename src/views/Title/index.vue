<template>
<div>
    <header class="title_header">
        <el-button type="primary" @click="showAdd">新增标题</el-button>
    </header>
    <Add :state="state" @cancel="cancel" @success="success"/>
    <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
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
      label="创建日期"
      >
    </el-table-column>
    <el-table-column
      prop="update_time"
      sortable
      label="更新日期"
      >
    </el-table-column>
    <el-table-column
      label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
      </template>
     
    </el-table-column>
  </el-table>
</div>

</template>

<script>
import Add from "./Add.vue"
export default {
    name:"Title",
    components:{
        Add
    },
    data(){
        return{
            tableData:[{}],
            state:false,
            fullscreenLoading:false

        }
    },
    created(){
        this.$http({
            url:"/api/classify"
        }).then(res => { 
            let response = res.data;
            if(response.status == 'success'){
                response.data.forEach(item => {
                    item.create_time = new Date(item.create_time).toLocaleString();
                    item.update_time = new Date(item.update_time).toLocaleString();
                })
                this.tableData = response.data;
            }else{
                this.$message.error(response.msg)
            }
            console.log(res.data);
        })
    },
    methods: {
        rerenderTableData(){
                this.$http({
                url:"/api/classify"

            }).then(res => {
                let response = res.data;
                if(response.status == 'success'){
                    response.data.forEach(item => {
                        item.creat_time = new Date(item.creat_time).toLocaleString();
                        item.update_time = new Date(item.creat_time).toLocaleString();
                    })
                    this.tableData = response.data;
                }else{
                    this.$message.error(response.msg)
                }
                console.log(res.data);
            })
        },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该标题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(() => {
            console.log(row.id);
            this.fullscreenLoading =true;
        
            this.$http({
                url:'/api/classify',
                method:'DELETE',
                data:`pk=${row.id}`,
                headers:{
                    'Content-Type':"application/x-www-form-urlencoded"
                }
            }).then(res =>{
                this.fullscreenLoading = false;
                let response = res.data;
                if(response.status == "success"){
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.rerenderTableData();
                }else{
                    this.$message.error(response.msg)
                }
            })
     
        }).catch(() => {
            this.fullscreenLoading = false;
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        console.log(index, row);
      },
      showAdd(){
        this.state = true
      },
      cancel() {
        this.state = false;
      },
      success(){
        this.rerenderTableData()
      }
    },
};
</script>

<style scoped>
.title_header{
    background-color: #fff;
    margin-bottom: 10px;
    padding: 10px;
}
</style>