<template>
    <el-main>
        <div class="el-main-title"><span>社区卫生中心信息</span></div>
        <div label-width="100px" class="form-border-community">
            <div>{{community}}-社区卫生中心信息</div>
        </div>
        <div class="especial">
            <table class="especial-table">
                <tbody>
                    <tr v-for="(item, index) in communityMessage">
                        <td>
                            {{item.type}}
                        </td>
                        <td>
                            {{item.detail}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </el-main>
</template>
<script>
  export default {
    data() {
        return {
            community: '中心小区',
            communityMessage: [
                {type: '名称', detail: '中心小区'},
                {type: '相关管理人', detail: '张三'},
                {type: '联系方式', detail: '18936363789'},
                {type: '社区基本情况', detail: '包括住户数、服务人口年龄构成比、发病率等'},
                {type: '住户数', detail: '100户'},
                {type: '康复', detail: '接纳上级医院转回的康复期病人，侧重于慢性病、术后病人及残疾病人康复指导和管理'},
            ]
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
        
        .form-border-community {
            border: 1px solid #ccc;
            margin: 40px 100px;
            padding: 20px;
            background-color:yellow;
            color: #394259;
            font-size: 20px;
            font-family: PingFangSC-Medium;
        }
        .especial {
            margin: 0px 10px 72px 100px;

            table {
                border-collapse: collapse;
                table-layout: fixed;
                line-height: normal;
                border: 1px solid #ccc;
            }

            table td {
                border: 1px solid #ccc;
                opacity: 0.9;
                font-family: PingFangSC-Medium;
                font-size: 20px;
                color: #394259;
                line-height: 20px;
                padding: 10px 0;
                text-align: left;
            }

            tbody tr:nth-child(2n) {
                background: #F7F8FA;
            }

            tbody td:nth-child(n + 2) {
                font-family: FDCfont-Bold;
                font-size: 20px;
                padding: 10px 0;
                color: #F75348;
                line-height: 20px;
            }
            table.especial-table tr td:nth-child(1) {
                padding-left: 10px;
                padding-right: 20px;
                text-align: left;
            }
            table.especial-table tr td:nth-child(2) {
                padding-left: 10px;
                padding-right: 20px;
                line-height: 30px;
                text-align: left;
            }
            thead td:nth-child(1) {
                width: 170px;
            }
        }
    }

</style>

