<template >
    <div id="header">
        <div class="left">
            <span :class="className" @click="change"></span>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-image style="width: 35px; height: 35px" class="avator" :src="user.avator"></el-image>
                </span>
                <el-dropdown-menu slot="dropdown" split-button   >
                    <el-dropdown-item command="profile">{{ user.username }}</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>



        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            url:
                'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            className: {
                'el-icon-s-unfold': this.isCollapse,
                'el-icon-s-fold': !this.isCollapse,
                switch: true
            },

        }
    },
    created() {

        this.className['el-icon-s-unfold'] = this.isCollapse
        this.className['el-icon-s-fold'] = !this.isCollapse
        document.title = this.$route.meta.title

    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        },
        user() {
            return this.$store.state.user;
        }
    },
    watch: {
        isCollapse(newValue) {
            this.className['el-icon-s-unfold'] = newValue
            this.className['el-icon-s-fold'] = !newValue
        },
        $route(newValue) {
            document.title = newValue.meta.title
        }
    },

    methods: {
        change() {
            this.$store.commit('changeIsCollapse')
            // this.$EventBus.$emit('changeCollapse');
            // this.className['el-icon-s-unfold'] = !this.className['el-icon-s-unfold'];
            // this.className['el-icon-s-fold'] = !this.className['el-icon-s-fold'];
        },
        // logout(){
        //     this.$store.commit('removerToken');
        //     this.$cookie.remove('rh_id');
        //     this.$router.push('/login')
        // },
        handleCommand(command) {
            if (command == 'logout') {
                this.$store.commit('removeToken');
                this.$cookie.remove('rh_id');
                this.$router.push('/login')
            }else if (command == 'profile') {
                this.$router.push('/profile/index')
            }

        }
    }
};
</script>

<style  scoped>
#header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.right {
    margin-right: 20px;
    height: inherit;
    display: flex;
    align-items: center;
}

.left {
    display: flex;
    align-items: center;
}

.switch {
    padding: 0xp 10px;
    font-size: 30px;
    line-height: 60px;
    cursor: pointer;
    transition: all 500ms;
}

.switch:hover {

    background: rgba(0, 0, 0, .025);
}
</style>
<style>
#header .el-breadcrumb {
    display: flex;
    align-items: center;
}

#header .el-dropdown-link {
    height: inherit;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    cursor: pointer;
}

#header .el-dropdown-link:hover {
    background: rgba(0, 0, 0, .025);
}
</style>