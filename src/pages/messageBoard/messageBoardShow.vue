<template>
    <el-main>
        <div class="el-main-title"><span>留言板-留言信箱反馈</span></div>
        <div class="especial1">
            <table class="especial-table">
                <tbody>
                    <center v-for="(item, index) in boardMessage">
                        <tr>
                            <td colspan="3" height="50" width="500" class="logic-title">
                                {{index + 1}}. {{item.title}}
                            </td>
                            <td rowspan="3" height="100" width="200">
                                <div class="block">
                                    用户ID: {{item.id}}</br>
                                    用户名：{{item.username}}</br>
                                    留言时间为：</br>{{item.date}}</br>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2" height="100" width="500">
                                <div>
                                    &nbsp&nbsp&nbsp&nbsp{{item.message}}
                                </div>
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
            boardMessage: [
                {
                    username: '小红',
                    id: '190101',
                    title: '请问xxxxxxxxx',
                    date: '2019-5-12 12:00:01',
                    message: '请问如何联系医户人员吗？'
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
        
        .especial1 {
            margin-top: 40px;
            border: 0;
            .logic-title {
                font-size: 18px;
                line-height: 26px;
            }
            .especial-table {
                margin-left: 100px;
                margin-top: 40px;
            }
            tr {
                border: 1px solid #ccc;
            }
            td {
                border: 1px solid #ccc;

            }
        }
        

    }

</style>

