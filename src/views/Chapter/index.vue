<template>
    <div>
        <h1>章节管理</h1>
        <Add :state="state" @cancel='cancel' @success='success' />
        <el-table :data="tableData" style="width: 100%">


            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期">
            </el-table-column>
            <el-table-column prop="update_time" label="修改日期">
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <div slot-scope="scope">
                    <el-button type="primary" @click="getChapter(scope.$index, scope.row)">获取章节</el-button>
                </div>


            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import Add from './ADD.vue'
import Bus from "@/views/Chapter/inndex";

export default {
    name: 'Chapter',
    components: {
        Add
    },
    data() {
        return {
            tableData: [],
            state: false,
            fullscreenLoading: false,
        }
    },
    created() {
        // this.$http({
        //         url: '/api/classify'
        //     }).then(res => {
        //         let response = res.data;
        //         if (response.status == 'success') {
        //             // this.tableData = response.data
        //             response.data.forEach(item => {
        //                 item.create_time = new Date(item.create_time).toLocaleString();
        //                 item.update_time = new Date(item.update_time).toLocaleString();
        //             });
        //             this.tableData = response.data
        //         } else {
        //             this.$message.error(response.msg)
        //         }
        //         console.log(res.data);
        //     })

        this.$http({
            url: '/api/classify'
        }).then(res => {
            let response = res.data;
            this.tableData = response.data
        })
    },
    methods: {
        // rerenderTableData() {
        //     this.$http({
        //         url: '/api/classify'
        //     }).then(res => {
        //         let response = res.data;
        //         if (response.status == 'success') {
        //             this.tableData = response.data
        //             response.data.forEach(item => {
        //                 item.create_time = new Date(item.create_time).toLocaleString();
        //                 item.update_time = new Date(item.update_time).toLocaleString();
        //             });
        //             this.tableData = response.data
        //         } else {
        //             this.$message.error(response.msg)
        //         }
        //         console.log(res.data);
        //     })
        // },
        getChapter(index, row) {
            Bus.$emit('getChapter', index)
            this.state = true
            console.log(index);
            // this.$http({
            //     url: `api/chapter?pk=${row.id}`,
            // }).then(res => {
            //     this.tableData = res.data.data
            //     console.log(res.data,index);
            // })
        },

        cancel() {//父传子 emit
            this.state = false
        },
        success() {//子传父
            this.rerenderTableData()
        },



    }
}
</script>
<style>

</style>