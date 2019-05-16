<template>
    <el-main>
        <div v-if="!isShow">
            <div class="el-main-title"><span>是否参加考试</span></div>
            <div label-width="100px" class=" form-border">
                <div class="title">试卷1: 早期记忆能力检测试卷（初级）</div>
                <div class="rule">
                    <ul>
                        <li v-for="(item,index) in rules" :key="item.id">
                            {{index+1}}.{{item}}
                        </li>
                    </ul>
                </div>
                <div class="button-wrapper">
                    <el-button type="primary" size="small" @click="immedAttend" class="loginBtn">立即参加</el-button>
                    <el-button type="warning" size="small" @click="tempAttend" class="loginBtn">暂不参加</el-button>
                </div>
            </div>
        </div>
        <div class="exam" v-else-if="isShow">
            <div class="exam-title">
                <h3 class="text-center marginT10">{{paperData.name}}</h3>
                <div class="text-center marginT10">考试时长：{{paperData.time}}分钟  总分：{{paperData.totalPoints}}分</div>
            </div>
            <div class="submit-box" ref="submitBox">
                <el-button @click="submit" type="primary" class="submit-btn">提交试卷</el-button>
                <div class="timeout">
                    <p>距离考试结束</p>
                    <p>{{time}}</p>
                </div>
            </div>
            <div class="main">
                <div class="multi" v-if="multiQuestions.length>0">
                    <h3 class="paddingB10">一、定向题</h3>
                    <ul class="question-item">
                        <li class="marginB10 marginL60" v-for="(item,index) in multiQuestions" :key="'multi' + index">
                            <p class="question-title">{{index+1}} 、{{item.name}}</p>
                            <el-input v-model="item.answer" class="direction_input"></el-input>
                        </li>
                    </ul>
                </div>
                <div class="single" v-if="singleQuestions.length>0">
                    <h3 class="paddingB10">二、单选题（只有一个正确答案）</h3>
                    <ul class="question-item">
                        <li class="marginB10 marginL60" v-for="(item,index) in singleQuestions" :key="'single:'+index">
                            <p class="question-title">{{index+1}} 、{{item.name}}</p>

                            <span class="option"
                                v-for="(item1,index1) in item.selection" :key="'option:' + index1">
                                <el-radio v-model="item.answer" :label="options[index1]" :key="index1">
                                {{options[index1]}}、{{item1}}
                                </el-radio>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="judge" v-if="judgeQuestions.length>0">
                    <h3 class="paddingB10">三、判断题</h3>
                    <ul class="question-item">
                    <li class="marginB10 marginL60" v-for="(item,index) in judgeQuestions" :key="'judge:' + index">
                        <p class="question-title">{{index+1}} 、{{item.name}}</p>
                        <el-radio v-model="item.answer" label="A" :key="'y:'+index">是</el-radio>
                        <el-radio v-model="item.answer" label="B" :key="'n'+index">否</el-radio>
                    </li>
                    </ul>
                </div>
                <div class="judge" v-if="QAQuestions.length>0">
                    <h3 class="paddingB10">四、简答题</h3>
                    <ul class="question-item">
                    <li class="marginB10 marginL60" v-for="(item,index) in QAQuestions" :key="'qa:' + index">
                        <p class="question-title">{{index+1}} 、{{item.name}}</p>
                        <el-input
                        class="textarea"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="item.answer">
                        </el-input>
                    </li>
                    </ul>
                </div>
            </div>
            <div class="scroll_top" @click="scrollTop" v-if="scroll>500">
                <i class="el-icon-caret-top"></i>
            </div>

            <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </el-main>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
        return {
            isShow: false,
            id: '',
            direction: {
                name: '',
            },
            dialogVisible: false,
            paperData:{
                name:'早期记忆能力检测试卷（初级）',
                time:'15',
                totalPoints:'30'
            },
            code: 0,
            startTime:'',
            nowTime: '',
            examTime: '900',
            whole: '900',
            timer: null,
            ansName: '',
            singleQuestions:[
                {name: '100 - 7 等于多少？',type: 'judgement',answer: '',selection: ['91', '92', '93', '94']},
                {name: '上题中结果再减去7等于多少？',type: 'judgement',answer: '',selection: ['86', '85', '84', '83']},
                {name: '上题中结果再减去7等于多少？',type: 'judgement',answer: '',selection: ['77', '78', '79', '80']}
            ],
            multiQuestions:[
                {name: '你叫什么名字？', answer: ''},
                {name: '现在是几月？（请填写阿拉伯数字，范围在 1 - 12）', answer: ''},
                {name: '今天是几号？（请填写阿拉伯数字）', answer: ''},
                {name: '现在是哪一年？（请填写阿拉伯数字）', answer: ''},
                {name: '今天是星期几？（请填写阿拉伯数字，范围在 1 - 7）', answer: ''},
                {name: '现在是什么季节？', answer: ''},
                {name: '现在几点了？（请填写数字格式,例如 18:30）', answer: ''},
                {name: '2 + 4是多少？(请填写阿拉伯数字)',answer: ''}
            ],
            QAQuestions:[
                {name: '请对下列词语进行描述：花，沙发，哨子', answer: ''},
                {name: '请复述这句话（正确敲写出即可）：瑞雪兆丰年', answer: ''},
                {name: '请写下您知道的蔬菜的名称', answer: ''},
            ],
            judgeQuestions:[{name: '所给数字中是否有N？MMMMMMMMMMMMMMMMMMMNMMMMMMMMMMMMM',type: 'judgement',answer: ''}],
            options:['A','B','C','D','E','F','G','H','I','J','K',
                'L','M','N','O','P','Q','R','S','T'],
            scroll: document.body.scrollTop,
            rules:[
                '请在放松舒适的状态下，耐心答完试卷',
                '请不要参考其他人答案，可在家人陪伴下进行检测',
                '如有任何疑问，欢迎您到留言区留言',
                '若出现意外情况（如停电、机器故障等），重新登录系统即可',
                '请用现行规范的语言文字进行答题',
                '答题不能“飞檐走壁”，请将每道题填写的答案写在对应的题号下，答案可随时更改',
                '敲重点，请诚信考试'
            ],
            total: 5,
            sysAnswer: []
        }
    },
    computed: {
        time() {
            let time = this.examTime;
            let hour = 0;
            let mm = 0;
            let ss = 0;
            hour = Math.floor(time / 3600);
            mm = Math.floor((time / 60 % 60));
            ss = Math.floor((time % 60));
            return  `${hour}小时${mm}分钟${ss}秒`;
        }
    },
    watch: {
        time(curVal, oldVal) {
            if(curVal == "小时分钟秒"){
                this.$message.error('考试时间到，强制提交!');
                let isMust = true;
                this.submit(isMust);
            }
        }
    },
    mounted(){
        this.nowTime = new Date();
        this.id = this.$route.params.id;
        //初始化，获取信息
        this.init();
        //监听滚动事件
        // window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy(){
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        init() {
            this.$axios.post('/getMessage',{
                id: this.$route.query.id
            }).then(response => {
                let res = response.data;
                this.ansName = res.data[0].name;
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
        scrollTop(){
            //回到顶部
            let timer = setInterval(() => {
                let top = document.body.scrollTop || document.documentElement.scrollTop;
                let speed = Math.ceil(top / 5);
                document.body.scrollTop = top - speed;
                if (top === 0) {
                clearInterval(timer);
                }
            }, 20)
        },
        handleScroll(){
            this.scroll = document.body.scrollTop;
            if(this.scroll>250) {
                this.$refs.submitBox.style.top = 10+'px';
            } else {
                setTimeout(() => {
                    this.$refs.submitBox.style.top = 250+'px';
                }, 0)
                // this.$nextTick(() => {
                    
                // })
            }
        },
        getCode(){
            //计算所得分数
            var date = new Date();
            var month = date.getMonth() + 1;
            var season = '';
            var time = (date.getHours() + 1) + ':' + (date.getMinutes() + 1);
            if (month >=0 && month <=2) {
                season = '春季';
            } else if (month >=3 && month <=5) {
                season = '夏季';
            } else if (month >=6 && month <=8) {
                season = '秋季';
            }else {
                season = '冬季';
            }
            //第一个是名字
            this.sysAnswer = ['尹一一', month, parseInt(date.getDate()), parseInt(date.getYear()) + 1970, parseInt(date.getDay()), season, time, 6, 'C', 'A', 'C', 'A'];
            for (var i = 0; i < this.multiQuestions.length; i++) {
                if (this.multiQuestions[i].answer == this.sysAnswer[i]) {
                    this.code++;
                } else {
                    continue;
                }
            }
            for (var i = 0; i < this.singleQuestions.length; i++) {
                if(this.singleQuestions[i].answer == this.sysAnswer[i + 8]) {
                    this.code = this.code + 2;
                } else {
                    continue;
                }
            }
            if (this.judgeQuestions[0].answer == this.sysAnswer[this.sysAnswer.length - 1]) {
                this.code++;
            }
            //简答题评分
            for (var i = 0; i < this.QAQuestions.length; i = i + 2) {
                if (this.QAQuestions[i].answer.length >= 20) {
                    this.code += 5;
                } else if (this.QAQuestions[i].answer.length >= 10 && this.QAQuestions[i].answer.length < 20) {
                    this.code += 3;
                } else if (this.QAQuestions[i].answer.length >= 6 && this.QAQuestions[i].answer.length < 10) {
                    this.code += 1;
                }
            }
            var jAnswer = ['瑞', '雪', '兆', '风', '年'];
            var retell = this.QAQuestions[1].answer.split('');
            retell.map((item,index) => {
                if(item == jAnswer[index]) {
                    this.code++;
                }
            })
            return this.code;
        },
        immedAttend() {
            //立即参加考试，此时开始计时进行考试, 考试时间到了，跳转到试卷成绩页面。
            this.isShow = true;
            let clock = window.setInterval(() => {
                this.examTime--;
                if (this.examTime == 0) {
                    window.clearInterval(clock);
                    const h = this.$createElement;
                    this.$notify({
                        title: '提交试卷',
                        message: h('i', { style: 'color: teal'}, '正在为您计算试卷成绩及统计分析，5s后为您跳转到试卷成绩页面!')
                    });
                    let jump = window.setInterval(() => {
                        this.total--;
                        if (this.total == 0) {
                            window.clearInterval(jump);
                            this.$router.push({path: '/aside/testPaperResult', query: {id: this.$route.query.id}});
                        }
                    },1000)
                    
                }
            },1000)

        },
        tempAttend() {
            //暂不参加考试
            this.$router.push({path: '/aside/articlePath', query: {id: this.$route.query.id}})
        },
        submit(isMust){
            //判断是否提前交卷
            if(this.examTime >= 0){
                this.$confirm('是否提前交卷？', '友情提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    //点击确定时执行的代码，此时判断答案是否正确
                    this.getCode();
                    //提交试卷信息，增加到数据库
                    this.submitApi();
                }).catch(()=>{
                    this.$message({
                    type: 'info',
                    message: '已取消操作'
                    });
                })
            }
        },
        submitApi() {
            //提交试卷信息，增加到数据库，跳转到成绩页面
            this.$axios.post('/submitExam',{
                testCode: this.code,
                testName: this.paperData.name,
                fullMark: this.paperData.totalPoints,
                useTime: ((this.whole - this.examTime) / 60).toFixed(2),
                name: this.ansName
            }).then(response => {
                let res = response.data;
                const h = this.$createElement;
                this.$notify({
                    title: '提交试卷',
                    message: h('i', { style: 'color: teal'}, '正在为您计算试卷成绩及统计分析，5s后为您跳转到试卷成绩页面!')
                });
                let jump = window.setInterval(() => {
                    this.total--;
                    if (this.total == 0) {
                        window.clearInterval(jump);
                        this.$router.push({path: '/aside/testPaperResult', query: {id: this.$route.query.id}});
                    }
                },1000)

            }).catch(err => {
                this.$message.error('提交失败!');
            })
        }
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .el-main{
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
        .button-wrapper {
            margin-left: 600px;
        }
        .form-border {
            border: 1px solid #ccc;
            margin: 40px 100px;
            padding: 20px;
            background: #fff;
            .title {
                font-size: 22px;
            }
            .rule {
                margin: 50px auto;
                padding: 10px;
                width: 800px;
                font-size: 14px;
                border: 1px solid #eeeeee;
                border-radius: 10px;
                background: #fff;
                box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
                ul {
                    li {
                        margin-bottom: 5px;
                    }
                }
            }
        }
        .exam{

            .direction_input {
                width: 400px;
                margin-left: 40px;

            }

            .exam-title {
                width: 300px;
                margin-left: 15%;
                padding: 10px;
                margin-top: 30px; 
                border: 1px solid #ccc;
                box-shadow: 5px 5px 5px #ccc;

            }

            .main{
                padding: 20px 40px;
                .question-title{
                    font-size: 16px;
                    margin-bottom: 5px;
                }
                .option{
                    display: block;
                    margin:5px 0 0 15px;
                }
                .question-item{
                    margin-left: 15px;
                }
                .textarea{
                    width: 500px;
                }
            }
            .scroll_top{
                background-color: #fff;
                position: fixed;
                right: 100px;
                bottom: 150px;
                width: 40px;
                height: 40px;
                border-radius: 20px;
                cursor: pointer;
                transition: .3s;
                box-shadow: 0 0 6px rgba(0,0,0,.12);
                z-index: 5;
                i{
                color: #409eff;
                display: block;
                line-height: 40px;
                text-align: center;
                font-size: 18px;
                }
            }
            .submit-box{
                position: fixed;
                right: 30px;
                padding: 30px;
                transition: 1s;
                text-align: center;
                border: 1px solid #ffffff;
                box-shadow: 1px 1px 1px #c5c5c5;
                background: rgba(193, 193, 193, 0.1);
                border-radius: 20px;
                .timeout{
                margin-top: 10px;
                text-align: center;
                }
            }
        }
    }
</style>
