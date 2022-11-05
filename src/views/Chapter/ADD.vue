<template>
    <div class="mark" v-if="state">
        <div class="title_form">

            <el-form label-position="center" label-width="auto" ref="ruleForm">
                <el-form-item label='章节' props='name'>
                    <el-button class="creatte" @click="createChapter()">添加章节</el-button>
                    <el-table :data="tableData" style="width: 100%"
                        :default-sort="{ prop: 'date', order: 'descending' }">

                        <el-table-column prop="id" label="编号" sortable width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" sortable width="180">
                        </el-table-column>
                        <el-table-column prop="create_time" label="创建日期">
                        </el-table-column>
                        <el-table-column prop="update_time" label="修改日期">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button @click="deleteChapter(scope.$index, scope.row)">删除章节</el-button>
                                <el-button @click="setChapter(scope.$index, scope.row)">修改章节</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
        </div>
        <el-button type="danger" class="quexia" @click="cancelForm('ruleForm')">关闭窗口</el-button>
    </div>
</template>
<script>
import Bus from "@/views/Chapter/inndex";
export default {
    data() {
        return {
            tableData: [],
            fullscreenLoading: false,
            inndex: '',
            titleId:''
        }
    },
    props: {
        state: {
            type: Boolean,
            default() {
                return false
            }
        },

    },
    created() {
        Bus.$on("getChapter", (index) => {
                this.inndex = index
                this.$http({
                    url: '/api/classify'
                }).then(res => {
                    let response = res.data;
                    if (response.status == 'success') {
                        response.data.forEach(item => {
                            item.create_time = new Date(item.create_time).toLocaleString();
                            item.update_time = new Date(item.update_time).toLocaleString();
                        });
                        this.$http({
                            url: `api/chapter?pk=${response.data[this.inndex].id}`,
                        }).then(res => {
                            this.tableData = res.data.data
                        })
                        this.titleId=`${response.data[this.inndex].id}`
                        // this.tableData = []
                        // this.inndex = ''
                    } else {
                        this.$message.error(response.msg)
                    }

                })
            })
    },
    methods: {
        rerenderTableData() {
        
                this.$http({
                    url: '/api/classify'
                }).then(res => {
                    let response = res.data;
                    if (response.status == 'success') {
                        response.data.forEach(item => {
                            item.create_time = new Date(item.create_time).toLocaleString();
                            item.update_time = new Date(item.update_time).toLocaleString();
                        });
                        this.$http({
                            url: `api/chapter?pk=${this.titleId}`,
                        }).then(res => {
                            this.tableData = res.data.data
                        })
                    } else {
                        this.$message.error(response.msg)
                    }

                })

        },
        cancelForm() {
            // this.formLabelAlign.name = ''
            this.$emit('cancel')
        },
        createChapter() {
            this.$http({
                url: '/api/classify'
            }).then(res => {
                console.log(res.data);
                let cname = prompt('请输入新章节名称')
                var data = new FormData();
                data.append('pk', `${this.titleId}`);
                data.append('chapter_name', `${cname}`);
                this.$http({
                    method: 'post',
                    url: 'api/chapter',
                    data: data,
                    Headers: {
                        ' Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    this.tableData = res.data.data
                    this.rerenderTableData() 
                    console.log(res.data);
                })
            })



        },
        deleteChapter(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.fullscreenLoading = true
                this.$http({
                    url: '/api/chapter',
                    method: 'DELETE',
                    data: `pk=${row.id}`,
                    headers: {
                        " Content-Type": 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    this.fullscreenLoading = false
                    let response = res.data
                    if (response == 'success') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.tableData = res.data.data
                        this.rerenderTableData();
                    } else {
                        this.$message.error(response.msg)
                    }
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        setChapter(index, row) {
            this.$http({
                url: '/api/classify'
            }).then(res => {
                let dataid = res.data.data
                let cont1 = prompt('修改')
                this.$http({
                    method: 'put',
                    url: 'api/chapter',
                    data: `pk=${row.id}&chapter_name=${cont1}`,
                    Headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    this.tableData = res.data.data
                    this.rerenderTableData()
                    console.log(res.data);
    
                })

            })

        },




    }
}
</script>
<style scoped>
.title_form {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    user-select: none;
    padding-top: 40px;
    overflow: auto;

}
</style>
<style>
.el-form .el-form-item__content {
    margin-left: 0 !important;
}

.mark {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 99;
}

.quexia {
    position: fixed;
    top: 0%;
    right: 0%;
    font-size: 25px;

}

.creatte {
    margin-left: 80%;
}
</style>