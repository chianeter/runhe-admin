<template>
    <el-menu :default-active="active" class="el-menu-vertical-demo" background-color="rgb(48,65,86)"
        text-color="rgb(191,203,217)" :collapse="isCollapse" router>
        <el-menu-item index="/" class="submenu-title-noDropdown">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/manager">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>管理员</span>
            </template>
            <el-menu-item index="/manager/insert">新增管理员 </el-menu-item>
            <el-menu-item index="/manager/index">查询管理员信息 </el-menu-item>

        </el-submenu>
        <el-menu-item index="/title" class="submenu-title-noDropdown">
            <i class="el-icon-reading"></i>
            <span slot="title">大标题管理</span>
        </el-menu-item>
        <el-menu-item index="chapter" class="submenu-title-noDropdown">
            <i class="el-icon-document"></i>
            <span slot="title">章节管理</span>
        </el-menu-item>
        <el-menu-item index="/video" class="submenu-title-noDropdown">
            <i class="el-icon-edit"></i>
        



            <span slot="title">视频管理</span>
        </el-menu-item>
        <el-menu-item index="/model" class="submenu-title-noDropdown">
            <i class="el-icon-files"></i>
            <span slot="title">模块管理</span>
        </el-menu-item>
        <el-menu-item index="/vip" class="submenu-title-noDropdown">
            <i class="el-icon-s-custom"></i>
            <span slot="title">会员管理</span>
        </el-menu-item>
        <el-menu-item index="/zfborder" class="submenu-title-noDropdown">
            <i class="el-icon-shopping-bag-1"></i>
            <span slot="title">支付宝订单</span>
        </el-menu-item>
        <el-menu-item index="/wxorder" class="submenu-title-noDropdown">
            <i class="el-icon-shopping-bag-1"></i>
            <span slot="title">微信订单</span>
        </el-menu-item>
        <el-menu-item index="logs">
            <i class="el-icon-setting"></i>
            <span slot="title">登陆日志</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            active: '/home'
            
        }
    },
    watch: {
        $route(newValue) {
            this.active = newValue.path
        }
    },
    created() {
        this.$active = this.$route.path
    },

    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        }

    },
    // created(){
    //     this.$EventBus.$on('changeCollapse',() => {
    //         this.isCollapse = !this.isCollapse;
    //     });
    // }
}
</script>

<style  scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.submenu-title-noDropdown:hover {
    background-color: #263445 !important;
}

.submenu-title-noDropdown:focus {
    background-color: #263445 !important;
}

.el-menu {
    height: inherit;
}
</style>