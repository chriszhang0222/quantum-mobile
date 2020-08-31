<template>
    <div class="message-image">
        <img :src="img" class="img-rounded user_picture_35px margintop-2" :title="message.full_name">
    </div>
</template>

<script>

    export default {
        name: "UserDetail",
        props: {
            message: {
                type: Object
            }
        },
        data(){
            return {
                img: require('../assets/img/user.png')
            }
        }
    }
</script>

<style scoped>
    .message-image {
        position: absolute;
        width: 40px;
        bottom: 0px;
        display: none;
        margin: 3px;
    }


    .bottom-message {
        margin-bottom: 20px;
    }
    .bottom-message .message-image {
        display: inline-block;
    }

    .user_picture_35px {
        width: 35px;
        height: 35px;
    }
    .img-rounded {
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
    }

</style>
