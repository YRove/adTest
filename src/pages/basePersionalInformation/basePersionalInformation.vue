<template>
    <div class="base-information">
        <div class="base-title">个人基本情况统计表</div>
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
            <el-form-item label="5、文化程度" prop="education">
                <el-radio-group v-model="ruleForm.education">
                    <el-radio label="小学"></el-radio>
                    <el-radio label="初中"></el-radio>
                    <el-radio label="高中或者中专"></el-radio>
                    <el-radio label="大专"></el-radio>
                    <el-radio label="本科及以上"></el-radio>
                    <el-radio label="其他"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="6、所属社区" prop="community">
                <el-input v-model="ruleForm.community"></el-input>
            </el-form-item>
            <el-form-item prop="type">
                <div class="label-surplus">7、您患有慢性病症吗?</div>
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="无" name="type" ></el-checkbox>
                    <el-checkbox label="高血压" name="type"></el-checkbox>
                    <el-checkbox label="冠心病" name="type"></el-checkbox>
                    <el-checkbox label="糖尿病" name="type"></el-checkbox>
                    <el-checkbox label="高脂血症" name="type"></el-checkbox>
                    <el-checkbox label="慢性支气管炎" name="type"></el-checkbox>
                    <el-checkbox label="脂肪肝" name="type"></el-checkbox>
                    <el-checkbox label="肥胖" name="type"></el-checkbox>
                    <el-checkbox label="关节炎" name="type"></el-checkbox>
                    <el-checkbox label="慢性胃炎" name="type"></el-checkbox>
                    <el-checkbox label="脑卒中" name="type"></el-checkbox>
                    <el-checkbox label="其他" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="isMotion">
                <div class="label-surplus">8、您规律参加体育锻炼吗?</div>
                <el-radio-group v-model="ruleForm.isMotion">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="isSmoke">
                <div class="label-surplus">9、您是否吸烟 :</div>
                <el-radio-group v-model="ruleForm.isSmoke">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                    <el-radio label="偶尔吸烟"></el-radio>
                    <el-radio label="已戒"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="isDrink">
                <div class="label-surplus">10、您是否饮酒 :</div>
                <el-radio-group v-model="ruleForm.isDrink">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                    <el-radio label="很少"></el-radio>
                    <el-radio label="已戒"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="isMemoryDown">
                <div class="label-surplus">11、近年来是否存在记忆明显下降现象 :</div>
                <el-radio-group v-model="ruleForm.isMemoryDown">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="ill">
                <div class="label-surplus">12、是否有以下影响认知功能疾病史 :</div>
                <el-checkbox-group v-model="ruleForm.ill">
                    <el-checkbox label="无" name="ill" ></el-checkbox>
                    <el-checkbox label="头部外伤或手术史" name="ill"></el-checkbox>
                    <el-checkbox label="脑出血或脑梗塞史" name="ill"></el-checkbox>
                    <el-checkbox label="脑部肿瘤、帕金森病" name="ill"></el-checkbox>
                    <el-checkbox label="狂躁、谵妄等精神疾病史" name="ill"></el-checkbox>
                    <el-checkbox label="其他" name="ill"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="desc">
                <div class="label-surplus">13、对于阿尔茨海默病有哪些想要了解的知识 :</div>
                <el-input type="textarea" v-model="ruleForm.desc" :rows="5"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
            education: '',
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
                    this.ruleForm.itemId = this.$route.query.id;
                    this.$axios.post('/baseInformation',{
                        id: parseInt(this.ruleForm.itemId),
                        name: this.ruleForm.name,
                        type: this.ruleForm.type,
                        ill: this.ruleForm.ill,
                        sex: this.ruleForm.sex,
                        desc: this.ruleForm.desc,
                        age: this.ruleForm.age,
                        telp: this.ruleForm.telp,
                        education: this.ruleForm.education,
                        community: this.ruleForm.community,
                        isMotion: this.ruleForm.isMotion,
                        isSmoke: this.ruleForm.isSmoke,
                        isDrink: this.ruleForm.isDrink,
                        isMemoryDown: this.ruleForm.isMemoryDown,
                    }).then(response => {
                        let res = response.data;
                        this.itemId = res.data.id;
                        if (res.message == 'ok') {
                            this.$message({
                                showClose: true,
                                message: '登录成功！',
                                type: 'success'
                            });
                            this.$alert('已分配符合个人情况的测试内容', '提交成功', {
                                confirmButtonText: '确定'
                            });
                            this.$router.push({path: '/aside/adExamOne',query: {id: this.ruleForm.itemId}});
                        } else {
                            this.$message({
                                showClose: true,
                                message: 'error!!',
                                type: 'warning'
                            });
                            this.password = ''
                        }
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
            border: 1px solid #ccc;
            margin: 40px 100px;
            padding: 20px;
            background: #fff;
        }
    }

</style>

