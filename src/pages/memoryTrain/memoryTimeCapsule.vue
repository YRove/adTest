<template>
    <el-main>
        <div class="el-main-title"><span>记忆时间囊</span></div>
        <div class="especial">
            <table class="especial-table">
                <tbody>
                    <center>
                        <tr>
                            <td colspan="3" height="50" width="500" class="logic-title">
                                <div>
                                    <el-input placeholder="请写下您想保存的记忆" v-model="memory.title">
                                        <template slot="prepend">主题：</template>
                                    </el-input>
                                </div>
                            </td>
                            <td rowspan="3" height="200" width="200">
                                <div class="block">
                                    <el-date-picker
                                        v-model="memory.date"
                                        align="right"
                                        type="date"
                                        placeholder="选择记忆日期"
                                        :picker-options="pickerOptions">
                                    </el-date-picker>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2" height="200" width="500">
                                <el-input type="textarea" v-model="memory.message" placeholder="写下您的想法或者说出您的想法，右边栏可查看正确答案" rows="10"></el-input>
                            </td>
                        </tr>
                    </center>

                </tbody>
            </table>
        </div>
    </el-main>
</template>
<script>
  export default {
    data() {
        return {
            memory: [
                {
                    title: '',
                    date: '',
                    message: ''
                },
            ],
            isShow: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                },
        };
    },
    methods: {
        showAnswer() {
            this.isShow = true;
        },
        holdAnswer() {
            this.isShow = false;
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
        
        .especial{
            margin-top: 40px;
            margin-left: 100px;
            .logic-title {
                font-size: 18px;
                line-height: 26px;
            }
        }
        

    }

</style>

