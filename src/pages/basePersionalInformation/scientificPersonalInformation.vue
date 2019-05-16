<template>
    <div class="base-information">
        <div class="base-title">个人信息表（科研人员）</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form-border">
            <el-form-item label="1、姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="2、性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="3、年龄" prop="age">
                <el-input v-model="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="4、联系电话" prop="telp">
                <el-input v-model="ruleForm.telp"></el-input>
            </el-form-item>
            <el-form-item label="5、所属研究所" prop="community" label-width="80px;">
                <el-input v-model="ruleForm.community" style="width:500px;margin-left: 100px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="info" @click="resetForm('ruleForm')" style="margin-left: 100px;">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
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
            community: '',
            isMotion: '',
            isSmoke: '',
            isDrink: '',
            isMemoryDown: '',
            itemId: ''
        },
        rules: {
            name: [
            { required: true, message: '请输入您的名字', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
            community: [
            { required: true, message: '请输入您所属的研究所', trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.itemId = this.$route.query.id;
                    this.$axios.post('/baseInformation',{
                        id: parseInt(this.ruleForm.itemId),
                        name: this.ruleForm.name,
                        sex: this.ruleForm.sex,
                        age: this.ruleForm.age,
                        telp: this.ruleForm.telp,
                        community: this.ruleForm.community
                    }).then(response => {
                        let res = response.data;
                        this.itemId = res.data.id;
                    }).catch(err => {
                        this.$message({
                            showClose: true,
                            message: 'error submit!!',
                            type: 'warning'
                        });
                    })
                } else {
                    console.log('请填写信息');
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
    .base-information {
        margin: 0 auto;
        .base-title {
            width: 300px;
            height: 40px;
            line-height: 40px;
            margin: 0 auto;
            padding-top: 30px; 
            font-size: 26px;
        }   
        
        .label-surplus {
            margin-left: -90px;
        }

        .form-border {
            width: 600px;
            border: 1px solid #ccc;
            margin: 40px 100px;
            padding: 20px;
            padding-right: 50px;
            background: #fff;
        }
    }

</style>

