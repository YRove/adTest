<template>
    <el-main>
        <div class="el-main-title"><span>题目管理</span></div>
        <div label-width="100px" class="form-border-question">
            <div>题目管理</div>
        </div>
        <div class="especial">
            <table class="especial-table">
                <tbody>
                    <tr v-for="(item, index) in question">
                        <td>
                            {{index + 1}}. {{item.title}}
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
            question: []
        };
    },
    mounted(){
        //初始化，获取信息
        this.init();
    },
    methods: {
        init() {
            this.$axios.post('/questionMessage',{

            }).then(response => {
                let res = response.data;
                for(var i = 0; i < res.data.length; i++) {
                    this.question.push(res.data[i]);
                }
            }).catch(err => {
                this.$message({
                    showClose: true,
                    message: 'error get!!',
                    type: 'warning'
                });
            })
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
        
        .form-border-question {
            border: 1px solid #ccc;
            margin: 40px 100px 0 100px;
            padding: 20px;
            background: #fff;
            border-bottom: 0;
            font-family: PingFangSC-Medium;
            font-size: 20px;
        }

        .especial {
            margin: 0px 100px 72px 100px;

            table {
                border-collapse: collapse;
                table-layout: fixed;
                line-height: normal;
                border: 1px solid #ccc;
                width: 100%;
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
        }
    }

</style>

