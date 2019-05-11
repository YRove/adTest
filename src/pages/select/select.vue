<template>
    <div class="login_page">
        <div class="login-logo">
            <img width="100%" height="100%" v-lazy="logoSrc" alt="logo">
        </div>
        <div class="title-sys">
            <div class="shuli title1">阿尔茨海默病</div>
            <div class="shuli title2">早期记忆能力检测系统</div>
        </div>
        <div class="login-page-inner" @click="adUserLogin">普通用户</div>
        <div class="login-page-inner" @click="sciResearcherLogin">科研人员</div>
        <div class="login-page-inner" @click="hCareWorkerLogin">医护人员</div>
        <div class="login-page-inner" @click="communityUserLogin">社区卫生中心人员</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: '',
            passWord: '',
            type: 0,
            logoSrc: require('@/assets/img/select_bg.jpg')
        }
    },
    methods: {
        adUserLogin() {
            // 普通用户登录页面
            this.type = 1;
            this.$router.push({path: '/login'});
        },
        sciResearcherLogin() {
            // 科研人员登录页面
            this.type = 2;
            this.$router.push({path: '/managelogin'});
        },
        hCareWorkerLogin() {
            // 医护人员登录页面
            this.type = 3;
            this.$router.push({path: '/managelogin'});
        },
        communityUserLogin() {
            // 社区卫生中心人员登录页面
            this.type = 4;
            this.$router.push({path: '/managelogin'});
        }

    }
}
</script>

<style scoped lang="scss">
.login_page {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.login-logo {
    text-align: center;
}

.login-page-inner {
    height: 30px;
    max-width: 300px;
    text-align: center;
    margin: 0 auto;
    position: relative;
    top: -100%;
    padding: 20px;
    z-index: 10;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 5px 5px 3px rgba(255,128,0,1);
    margin-bottom: 20px;
    background: #fff;
    font-size: 20px;
    color: rgba(255,128,0,1);
    cursor: pointer;
}

.title-sys {
    text-align: center;
    padding: 10px;
    border: 1px solid black;
}

.shuli { 
    margin: 0 auto;
    width: 32px;
    line-height: 32px;
    color: #fff;
    font-size: 28px;
} 

.title1 {
    position: absolute;
    top: 100px;
    left: 25%;
}

.title2 {
    position: absolute;
    top: 40px;
    left: 30%;
}
</style>