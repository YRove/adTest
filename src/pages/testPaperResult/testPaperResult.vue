<template>
    <el-main>
        <div class="el-main-title"><span>试卷成绩统计</span></div>
        <!-- <div :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class=" form-border">
            <div>试卷成绩</div>
        </div> -->
        <div>
            <el-table :data="data" border>
                <el-table-column prop="id" label="序号">
                    <template  slot-scope="scope">
                        <div :disabled="data[scope.$index].isDistabled">{{data[scope.$index].id}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="testName" label="试卷名称">
                    <template  slot-scope="scope">
                        <div :disabled="data[scope.$index].isDistabled">
                            {{data[scope.$index].testName}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="testCode" label="试卷所得分数">
                    <template  slot-scope="scope">
                        <div :disabled="data[scope.$index].isDistabled">
                            {{data[scope.$index].testCode}}分
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="fullMark" label="试卷满分分数">
                    <template  slot-scope="scope">
                        <div :disabled="data[scope.$index].isDistabled">
                            {{data[scope.$index].fullMark}}分
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="useTime" label="考试所用时间">
                    <template  slot-scope="scope">
                        <div :disabled="data[scope.$index].isDistabled">
                            {{data[scope.$index].useTime}}分钟
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="finishTime" label="考试完成时间">
                    <template  slot-scope="scope">
                        <div :disabled="data[scope.$index].isDistabled">
                            {{data[scope.$index].finishTime}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-main>
</template>
<script>
  export default {
    data() {
        return {
            data: []
        };
    },
    mounted(){
        //初始化，获取信息
        this.init();
    },
    methods: {
        init() {
            this.$axios.post('/getCodeMessage',{

            }).then(response => {
                let res = response.data;
                for(var i = 0; i < res.data.length; i++) {
                    var arr = res.data[i].finishTime.split('T');
                    arr = arr.join(' ');
                    var newA = arr.split('.');
                    res.data[i].finishTime = newA[0];
                    this.data.push(res.data[i]);
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
        .el-table {
            width: 94%;
            margin-left: 3%;
            margin-top: 20px;
            font-size: 12px;
        }
        .el-button {
            border: 0;
        }
        .el-button-add {
            margin: 20px 0 0 80%;
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
        tbody tr:nth-child(2n) {
            background: #F7F8FA;
        }
    }

</style>

