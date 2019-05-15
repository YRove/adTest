<template>
    <el-main>
        <div class="el-main-title"><span>个人情况统计分析</span></div>
        <div label-width="100px" class="form-border-personal">
            <div>根据个人的测试情况，对个人情况进行分析。</div>
        </div>
        <div class="especial">
            <table class="especial-table">
                <tbody>
                    <tr>
                        <td>
                            姓名
                        </td>
                        <td>
                            {{message.name}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            所做测试题次数
                        </td>
                        <td>
                            {{message.testNum}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            试卷的平均得分指数
                        </td>
                        <td>
                            {{message.aveIndex}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            公用时长总和
                        </td>
                        <td>
                            {{message.wholeTime}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            患病倾向
                        </td>
                        <td>
                            {{message.inclination}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <div>
            <el-table border>
                <el-table-column prop="name" label="姓名">
                    <template>
                        <div>
                            {{message.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="testNum" label="所做测试题次数">
                    <template>
                        <div>
                            共{{message.testCode}}次
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="aveIndex" label="试卷的平均得分指数">
                    <template>
                        <div>
                            {{message.aveIndex}}%
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="wholeTime" label="公用时长总和">
                    <template>
                        <div>
                            {{message.wholeTime}}分钟
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="inclination" label="患病倾向">
                    <template>
                        <div>
                            {{message.inclination}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div> -->
    </el-main>
</template>
<script>
export default {
    data() {
        return {
            data: [],
            message: {
                name: '',
                testNum: 0,
                aveIndex: 0,
                wholeTime: 0,
                inclination: ''
            },
            ansName: '',
            inclinate: ['无患病倾向', '有轻度患病的倾向，建议进行记忆训练', '有中度患病的倾向，建议进行记忆训练', '有患病倾向，建议去医院进行诊断']
        };
    },
    mounted(){
        //初始化，获取信息
        this.init();
        //对个人情况进行分析，将结果存入数据库
        this.standard();
    },
    methods: {
        init() {
            this.$axios.post('/getMessage',{
                id: this.$route.query.id
            }).then(response => {
                let res = response.data;
                this.ansName = res.data[0].name;
                this.message.name = this.ansName;
                if (res.message != 'ok') {
                    this.$message({
                        showClose: true,
                        message: 'error!!',
                        type: 'warning'
                    });
                }
            }).catch(err => {
                this.$message({
                    showClose: true,
                    message: 'error get!!',
                    type: 'warning'
                });
            })
        },
        standard() {
            this.$axios.post('/getCodeMessage',{

            }).then(response => {
                let res = response.data;
                for(var i = 0; i < res.data.length; i++) {
                    if(res.data[i].name == this.ansName) {
                        this.data.push(res.data[i]);
                    }
                }
                this.message.testNum = this.data.length;
                var aveage = [];
                for(var j = 0; j < this.data.length; j++) {
                    var dev = parseInt(this.data[j].testCode) / parseInt(this.data[j].fullMark);
                    aveage.push(dev);
                    this.message.wholeTime += parseInt(this.data[j].useTime);
                }
                var sum = aveage.reduce((prev, curr, idx, arr) => {
                    return prev + curr;
                })
                this.message.aveIndex = (sum / this.data.length).toFixed(2);
                if (this.message.aveIndex <= 0.3 && this.message.aveIndex >= 0) {
                    this.message.inclination = this.inclinate[this.inclinate.length - 1];
                } else if (this.message.aveIndex > 0.3 && this.message.aveIndex <= 0.6) {
                    this.message.inclination = this.inclinate[2];
                } else if (this.message.aveIndex > 0.6 && this.message.aveIndex <= 0.9) {
                    this.message.inclination = this.inclinate[1];
                } else {
                    this.message.inclination = this.inclinate[0];
                }
            }).catch(err => {
                this.$message({
                    showClose: true,
                    message: 'error',
                    type: 'warning'
                });
            })
            //有些问题，需要修改
            // this.postPersonalAnalysis();
        },
        postPersonalAnalysis() {
            this.$axios.post('/getAnalysisMessage',{
                id: this.$route.query.id,
                name: this.message.name,
                testNum: this.message.testNum,
                aveIndex: this.message.aveIndex,
                wholeTime: this.message.wholeTime,
                inclination: this.message.inclination
            }).then(response => {
                let res = response.data;
                console.log(res)
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
        
        .form-border-personal {
            width: 540px;
            border: 1px solid #ccc;
            margin: 35px;
            margin-left: 100px;
            padding: 20px;
            background-color:yellow;
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

