<template>
  <div class="login_page">
        <reheader></reheader>
        <div class="login-page-inner">
        <div class="input-text-wrapper">
            <el-form :model="userForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" label-width="100px">
                <el-form-item label="账号名：" prop="username">
                    <el-input v-model="userForm.username" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="账号密码：" prop="passWord">
                    <el-input type="password" v-model="userForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="input-text-wrapper marginT30 text-center">
            <el-button type="primary" @click="submit" class="registerBtn">提交</el-button>
            <router-link class="pull-right" :to="urls[$route.query.type - 1]">
                <el-button type="primary" class="loginBtn">去登录</el-button>
            </router-link>
        </div>
        </div>
  </div>

</template>

<script>
    import reheader from '@/components/header';

    export default {
        data() {
            return {
                userForm:{
                    username: '',
                    password: ''
                },
                urls: [
                    {path: '/login', query: {type: this.$route.query.type}},
                    {path: '/managelogin', query: {type: this.$route.query.type}},
                    {path: '/managelogin', query: {type: this.$route.query.type}},
                    {path: '/managelogin', query: {type: this.$route.query.type}}
                ],
                type: 0,
                rules:{
                    username: [
                        { required: true, message: '请输入您的账号名', trigger: 'blur' },
                        {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入您的账号密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度6~20', trigger: 'blur' },
                        { pattern: /^[A-Za-z0-9]+$/, message: '只能输入数字或字母' }
                    ]
                }
            }
        },
        components: {
            reheader
        },
        methods: {
        // 登录
            submit() {
                this.type = this.$route.query.type;
                if (this.userForm.username == '' || this.userForm.password == '') {
                    this.$message({
                        showClose: true,
                        message: '请输入您的账号名及密码',
                        type: 'warning'
                    });
                } else {
                    this.$axios.post('/register',{
                        username: this.userForm.username,
                        password: this.userForm.password,
                        type: this.type
                    }).then(res => {
                    if (res.data == 'ok') {
                        this.$message({
                        showClose: true,
                        message: '恭喜你，注册成功！',
                        type: 'success'
                        });
                        this.$router.push('/')
                    }
                    }).catch(err => {
                        this.$message({
                            showClose: true,
                            message: '注册失败，请稍后再试！',
                            type: 'warning'
                        });
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .note {
        color: #f7ba2a;
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
        max-width: 450px;
        margin: 0 auto;
        padding: 20px;
        z-index: 10;
    }

    #canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
    }

    .loginBtn {
        width: 30%;
        margin-left: 200px;
    }
</style>
