<template>
  <div class="login_page">
    <div class="login-page-inner">
      <div class="input-text-wrapper">
        <el-form :model="userForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" label-width="100px">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="userForm.name" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="userId">
            <el-input v-model="userForm.userId" placeholder="请输入您的身份证号"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-input v-model="userForm.sex" placeholder="请输入您的性别"></el-input>
          </el-form-item>
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="userForm.age" placeholder="请输入您的年龄"></el-input>
          </el-form-item>
          <el-form-item label="账号名：" prop="userName">
            <el-input v-model="userForm.userName" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item label="账号密码：" prop="passWord">
            <el-input type="password" v-model="userForm.passWord" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="input-text-wrapper marginT30 text-center">
        <el-button type="primary" @click="submit" class="registerBtn">注册</el-button>
        <router-link class="pull-right" to="/login">
            <el-button type="primary" class="loginBtn">去登录</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userForm:{
          userName: '',
          passWord: '',
          userId: '',
          sex:'',
          age: '',
          name: ""
        },
        rules:{
          userId: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { pattern: /^[0-9]+$/, message: '只能输入数字' }
          ],
          userName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          grade: [
            { required: true, message: '请输入年级', trigger: 'blur' },
            { pattern: /^[0-9]+$/, message: '只能输入数字' }
          ],
          class: [
            { required: true, message: '请输入班级', trigger: 'blur' },
            { pattern: /^[0-9]+$/, message: '只能输入数字' }
          ],
          passWord: [
            { required: true, message: '请输入账号密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度6~20', trigger: 'change' },
            { pattern: /^[A-Za-z0-9]+$/, message: '只能输入数字或字母' }
          ]
        }
      }
    },
    methods: {
      // 登录
      submit() {
        this.$axios.post('/api/studentregister',{
          userInfo:this.userForm
        }).then(response => {
          let res = response.data;
          if (res.status == '0') {
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
