<template>
    <el-main>
        <div class="el-main-title"><span>题目管理</span></div>
        <div :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class=" form-border">
            <div>题目管理</div>
        </div>
    </el-main>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
            name: '',
            type: [],
            ill: [],
            sex: '',
            desc: '',
            age: '',
            telp: '',
            education: '',
            community: '',
            isMotion: '',
            isSmoke: '',
            isDrink: '',
            isMemoryDown: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入您的名字', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请选择您患有的慢性病症或无', trigger: 'change' }
          ],
          ill: [
            { type: 'array', required: true, message: '请选择您患有的影响认知功能疾病史或无', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择您的性别', trigger: 'change' }
          ],
          age: [
            { required: true, message: '请输入您的年龄', trigger: 'blur' }
          ],
          telp: [
            { required: true, message: '请输入您的联系方式', trigger: 'blur' }
          ],
          education: [
            { required: true, message: '请选择您的文化程度', trigger: 'change' }
          ],
          community: [
            { required: true, message: '请输入您所属的社区', trigger: 'blur' }
          ],
          isMotion: [
              { required: true, message: '请选择您是否规律参加体育锻炼', trigger: 'change' }
          ],
          isSmoke: [
              { required: true, message: '请选择您是否吸烟', trigger: 'change' }
          ],
          isDrink: [
              { required: true, message: '请选择您是否饮酒', trigger: 'change' }
          ],
          isMemoryDown: [
              { required: true, message: '您近年来是否存在记忆明显下降现象？', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写所了解的知识', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$alert('已分配符合个人情况的测试内容', '提交成功', {
              confirmButtonText: '确定'
            });
            this.$router.push({path: '/aside/adExamOne'});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">
    .el-main {
        height: 100%;
        overflow-y: auto;
        background-color: #f5f7fa;
        padding: 0;
        &-title {
            font-size: 16px;
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: left;
            background-color: #fafbfc;
            border-bottom: 3px solid #ebf0f3;
            span {
                padding-left: 60px;
            }
        }

        .base-title {
            width: 300px;
            height: 40px;
            line-height: 40px;
            margin: 0 auto;
            padding-top: 30px; 
            font-size: 26px;
            text-align: center;
        }   
        
        .form-border {
            border: 1px solid #ccc;
            margin: 40px 100px;
            padding: 20px;
            background: #fff;
        }
    }

</style>

