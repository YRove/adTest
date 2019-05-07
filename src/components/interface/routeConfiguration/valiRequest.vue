<template>
    <el-main>
        <div class="el-main-title"><span>validation-字段检验</span></div>
        <el-form label-width="150px">
            <el-form-item label="交易号">
                <el-input v-model="data.transCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="templateContent">
                <codemirror  ref="myCm"  v-model="data.templateContent"  :options="cmOptions" class="el-form-codemirror"></codemirror>
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
                    transCode: '',
                    templateContent: '',
                    messageType: this.$route.query.messageType,
                    id: ''
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
            this.data.transCode = this.$route.query.transCode;
            this.init();
        },
        methods: {
            onSubmit() {

                axios.post('/api/validation/addandupdate', this.data
                ).then(res => {
                    // 成功
                    if (res.data.resultCode === '0') {
                        this.$message.success('添加成功');
                    }

                }).catch(error => {

                    this.$message.success('添加异常' + error);
                    // this.hideLoading();
                });
            },
            init() {

                this.transCode = this.$route.query.transCode;

                axios.get('api/validation/getValidationTempByTransCode', {
                    params: {
                        transCode: this.$route.query.transCode,
                        messageType: this.$route.query.messageType
                    }
                }).then(res => {
                    if (res.data.resultCode === '0') {


                        if (res.data.data != null) {

                            this.data = res.data.data;
                        }
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

