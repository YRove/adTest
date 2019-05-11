<template>
    <div class="login_page">
        <div class="login-page-inner">
            <div class="input-text-wrapper">
                <div class="login-logo marginB10"><img width="300" v-lazy="logoSrc" alt="logo"></div>
                <el-input v-model="userName" placeholder="请输入账号" @keyup.enter="submit"></el-input>
                <el-input v-model="passWord" placeholder="请输入密码" type="password" @keyup.enter="submit" class="marginT10"></el-input>
            </div>
            <div class="input-text-wrapper marginT30 text-center">
                <el-button @click="submit" class="loginBtn">登录</el-button>
            </div>
            <div class="marginT20">
                <router-link to="/frontregister" class="note">注册账号</router-link>
                <!--<a href="javascript:;">忘记密码？</a>-->
                <router-link class="note  pull-right" to="/select">返回选择其他角色</router-link>
            </div>
        </div>
        <div id="canvas"></div>
    </div>
</template>

<script>
//  初始化一些数据
import { CanvasBackground } from '@/assets/js/canvas_bg.js'
export default {
    data() {
        return {
            userName: '',
            passWord: '',
            logoSrc: require('@/assets/img/logo.png'),
            type: 0
        }
    },
    methods: {
        // 登录
        submit() {
            this.type = this.$route.query.type;
            if (this.userName == '' || this.passWord == '') {
                this.$message({
                    showClose: true,
                    message: '请输入您的账号名及密码',
                    type: 'warning'
                });
            } else {
                this.$axios.post('/healthCareLogin',{
                    username: this.userName,
                    password: this.passWord,
                    type: this.type
                }).then(res => {
                    if (res.data == 'ok') {
                        this.$message({
                            showClose: true,
                            message: '登录成功！',
                            type: 'success'
                        });
                        // 登录成功跳到首页
                        this.$router.push({path: '/aside', query: {type: this.type}});
                    } else {
                        this.$message({
                        showClose: true,
                        message: '用户名或密码错误！',
                        type: 'warning'
                        });
                        this.password = ''
                    }
                }).catch(err => {
                        this.$message({
                            showClose: true,
                            message: '登录失败，请稍后再试！',
                            type: 'warning'
                        });
                })
            }
        }
    },
    mounted() {
        var bg = new CanvasBackground({
            canvasContainerID: "canvas",
            circleColor: "rgba(0, 0, 205, 1)",
            lineColor: "rgba(0, 0, 205, 1)",
            canvasOpacity: 0.3
        });
    }
}
</script>

<style scoped lang="scss">
.note {
    color: #4B0082;
    font-size: 14px;
}
/*必填项 * 图标*/

.note>p:after {
    content: ' *';
    color: red;
    font-size: 120%;
}

.login_page {
    width: 100%;
    height: 100%;
}

.login-page-inner {
    height: 420px;
    max-width: 300px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -230px;
    padding: 20px;
    z-index: 10;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 10px 10px 5px #ccc;
}

.login-logo {
    text-align: center;
}

#canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
}

.loginBtn {
    width: 100%;
    background-color: #4B0082;
    color: #fff;
}
</style>