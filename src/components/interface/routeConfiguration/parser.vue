<template>
    <el-main>
        <div class="el-main-title"><span>groavy-处理银行返回报文</span></div>
        <el-form label-width="150px">
            <el-form-item label="机构号">
                <el-input v-model="data.institutionCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="交易号">
                <el-input v-model="data.transCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="groavy类名">
                <el-input v-model="data.groovyClassName"></el-input>
            </el-form-item>
            <el-form-item label="memo">
                <el-input v-model="data.memo"></el-input>
            </el-form-item>
            <el-form-item label="模版内容">
                <codemirror  ref="myCm"  v-model="data.groovyContent"  :options="cmOptions" class="el-form-codemirror"></codemirror>
                <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 20, maxRows: 20}"
                    v-model="data.groovyContent">
                </el-input> -->
            </el-form-item>
            <el-form-item class="el-form-item-btn">
                <router-link
                    :to="{path:'/aside/routeConfiguration',query:{transCode:this.$route.query.transCode,institutionCode:$route.query.institutionCode}}">
                    <el-button type="primary" style="margin-right:20px;">返回上页</el-button>
                </router-link>
                <el-button type="success" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>
<script>
    import axios from 'axios';
    import { codemirror } from 'vue-codemirror'
    require("codemirror/mode/javascript/javascript.js")
    require("codemirror/theme/solarized.css")
    require('codemirror/addon/fold/foldcode.js')
    require('codemirror/addon/fold/foldgutter.js')
    require('codemirror/addon/fold/brace-fold.js')
    require('codemirror/addon/fold/xml-fold.js')
    require('codemirror/addon/fold/indent-fold.js')
    require('codemirror/addon/fold/markdown-fold.js')
    require('codemirror/addon/fold/comment-fold.js')

    export default {
        components:{
            codemirror
        },
        data() {
            return {
                data: {
                    id: '',
                    transCode: '',
                    institutionCode: '',
                    groovyClassName: '',
                    groovyContent: '',
                    direction: this.$route.query.direction,
                    memo: ''
                },
                cmOptions: {
                    tabSize: 4,
                    mode: 'text/javascript',
                    theme: 'solarized',
                    lineNumbers: true,
                    lineWrapping: true,
                    extraKeys: {"Ctrl": "autocomplete"},
                    lineWiseCopyCut: true,
                    showCursorWhenSelection : true,
                    matchBrackets: true,
                    line: true
                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            onSubmit() {

                //alert(JSON.stringify(this.data));
                axios.post('/api/parser/addAndUpdateParserTemplate', this.data
                ).then(res => {

                    // 成功
                    if (res.data.resultCode === '0') {
                        this.$message.success('添加成功');
                    }

                }).catch(error => {

                    this.$message.success('添加异常' + error);
                });
            },
            init() {

                this.data.transCode = this.$route.query.transCode;
                this.data.institutionCode = this.$route.query.institutionCode;


                axios.get('api/parser/getParserTempByTransCode', {
                    params: {
                        transCode: this.$route.query.transCode,
                        direction: this.$route.query.direction,
                    }
                }).then(res => {

                    if (res.data.data != undefined) {

                        this.data = res.data.data;
                    }

                }).catch(error => {
                    // this.hideLoading();
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-main {
        width: 100%;
        overflow-y: scroll;
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
        .el-form {
            margin: 20px 100px 100px 100px;
            &-item-btn {
                margin-left: 400px;
            }
            &-codemirror {
                border-radius: 4px;
                border: 1px solid #dcdfe6;
            }
        }
    }
</style>

