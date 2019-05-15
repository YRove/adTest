<template>
    <el-main>
        <div class="el-main-title"><span>量表评分规范</span></div>
        <div label-width="100px" class="form-border">
            <div>量表评分规范</div>
        </div>
    </el-main>
</template>
<script>
  export default {
    data() {
        return {
            
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

