<template>
    <el-main>
        <div class="el-main-title"><span>逻辑思维训练</span></div>
        <div class="especial">
            <table class="especial-table">
                <tbody>
                    <center v-for="(item, index) in question">
                        <tr>
                            <td colspan="3" height="100" width="500" class="logic-title">
                                {{index + 1}}. {{item.title}}
                            </td>
                            <td rowspan="3" height="200" width="200" :key="index">
                                <el-button type="primary" @click="showAnswer()">正确答案</el-button>
                                <el-button type="info" @click="holdAnswer()" class="loginBtn">隐藏</el-button>
                                <div v-if="isShow">
                                    &nbsp&nbsp&nbsp&nbsp{{item.currentA}}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2" height="100" width="500">
                                <el-input type="textarea" v-model="item.yAnswer" placeholder="写下您的想法或者说出您的想法，右边栏可查看正确答案" rows="5"></el-input>
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
            question: [
                {
                    title: '小丽买了一双漂亮的鞋子，她的同学都没有见过这双鞋了，于是大家就猜，小红说：“你买的鞋不会是红色的。”小彩说：“你买的鞋子不是黄的就是黑的。”小玲说：“你买的鞋子一定是黑色的。”这三个人的看法至少有一种是正确的，至少有一种是错误的。请问，小丽的鞋子到底是什么颜色的？',
                    yAnswer: '',
                    currentA: '假设小丽的鞋子是黑色的，那么三种看法都是正确的，不符合题意；假设是黄色的，前两种看法是正确的，第三种看法是错误的；假设是红色的，那么三句话都是错误的。因此，小丽的裙子是黄色的。'
                },
            ],
            isShow: false
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
        
        .especial {
            margin-top: 40px;
            .logic-title {
                font-size: 18px;
                line-height: 26px;
            }
            .especial-table {
                margin-left: 100px;
            }
            tbody {
                border: 1px solid #ccc;
            }
            td {
                border: 1px solid #ccc;
                padding: 10px;
            }

        }
        

    }

</style>

