<template>
    <div>
        <div class="wrapper">
            <vHeader></vHeader>
            <vSidebar></vSidebar>
            <div class="content-box" :class="{'content-collapse':collapse}">
                <div class="content">
                    <transition name="move" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from "../components/Header.vue";
    import vSidebar from "../components/Sidebar.vue";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    export default {
        name: "Home",
        components:{vHeader, vSidebar},
        data: function(){
            return {
                collapse: false,
                user: {

                }
            }
        },
        created() {
            this.$bus.on("collapse-content", (msg) => {
                this.collapse = msg;
            });
            this.user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
            if(this.user === null || this.user === undefined || Tools.isEmpty(this.user)){
                this.$router.push('/');
            }
        },
        beforeDestroy() {
            this.$bus.off("collapse-content", (msg) => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>

</style>
