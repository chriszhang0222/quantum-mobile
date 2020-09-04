<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                background-color="#EEF4F9"
                text-color="#717171"
                active-text-color="#000"
                router
                unique-opened
                :collapse="collapse"
                :default-active="onRoutes">
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-menu-item :index="subItem.index"
                                          :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>

        </el-menu>
    </div>
</template>

<script>
    export default {
        props: {
          group: {
              type: String
          }
        },
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'dashboard',
                        title: 'Dashboard'
                    },
                    {
                        icon: 'el-icon-s-data',
                        index: 'report',
                        title: 'Report'
                    },
                    {
                        icon: 'el-icon-search',
                        index: 'search',
                        title: 'Search'
                    },
                ]
            };
        },
        computed: {
            onRoutes(){
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            this.$bus.on("collapse", (msg) => {
                this.collapse = msg;
                this.$bus.emit("collapse-content", msg);
            });

        },
        beforeDestroy() {
            this.$bus.off("collapse", (msg) => {
                this.collapse = msg;
                this.$bus.emit("collapse-content", msg);
            })
        },
        name: "sidebar"
    }
</script>

<style scoped lang="scss">
    .test {
        color: #717171;
    }
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 50px;
        bottom: 0;
        overflow-y: scroll;


    .el-menu-item {
        min-width: 80px;
        margin-left: -10px;

        span {
            font-weight: bold;
        }
    }

    li {
        text-align: left;
    .el-tooltip {
        width: auto ! important;
    }
    }

    /*下拉导航菜单多出1px*/
    .el-menu {
        border-right-width: 0;
    }

    .el-menu--collapse{
        width: 0px;
    }
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 120px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
