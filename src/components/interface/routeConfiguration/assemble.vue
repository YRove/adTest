<template>
    <el-main>
        <div class="el-main-title"><span>Assemble-银行报文拼接</span></div>
        <el-form label-width="150px">

            <el-form-item label="交易号">
                <el-input v-model="data.transCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="data.templateType" placeholder="请选择">
                    <el-option
                        v-for="item in templateTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模版内容">
                <codemirror  ref="myCm"  v-model="data.templateContent"  :options="cmOptions" class="el-form-codemirror"></codemirror>
                <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 15, maxRows: 15}"
                    v-model="data.templateContent">
                </el-input> -->
            </el-form-item>
            <el-form-item label="子模版1">
                <codemirror  ref="myCm"  v-model="data.subTemplate1"  :options="cmOptions" class="el-form-codemirror"></codemirror>
                <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 15, maxRows: 15}"
                    v-model="data.subTemplate1">
                </el-input> -->
            </el-form-item>
            <el-form-item label="子模版2">
                <codemirror  ref="myCm"  v-model="data.subTemplate2"  :options="cmOptions" class="el-form-codemirror"></codemirror>
                <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 15, maxRows: 15}"
                    v-model="data.subTemplate2">
                </el-input> -->
            </el-form-item>
            <el-form-item label="请求头模版">
                <codemirror  ref="myCm"  v-model="data.headerTemplate"  :options="cmOptions" class="el-form-codemirror"></codemirror>
                <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 15, maxRows: 15}"
                    v-model="data.headerTemplate">
                </el-input> -->
            </el-form-item>
            <el-form-item class="el-form-item-btn">
                <router-link
                    :to="{path:'/aside/routeConfiguration',query:{transCode:this.$route.query.transCode,institutionCode:$route.query.institutionCode}}">
                    <el-button type="primary" style="margin-right:20px;">返回上页</el-button>
                </router-link>
                <el-button type="success" @click="onSubmit">保存</el-button>
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
                templateTypes: this.getSelectData("tempTypes"),
                id: 0,
                data: {
                    id: '',
                    templateType: '',
                    templateContent: '',
                    subTemplate1: '',
                    subTemplate2: '',
                    headerTemplate: '',
                    institutionCode:'',
                    messageType: this.$route.query.messageType
                },
                templateType: '',
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
        mounted() {
            this.init();
        },
        methods: {
            onSubmit() {

                axios.post('/api/temp/addAndupdateAssembleTemplate', this.data
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

                axios.get('api/temp/getAssembleTemplateByTransCode', {
                    params: {
                        transCode: this.$route.query.transCode,
                        messageType: this.$route.query.messageType
                    }
                }).then(res => {
                    if (res.data.data != undefined) {
                        this.data = res.data.data;
                        this.data.institutionCode = this.$route.query.institutionCode;
                    }

                }).catch(error => {
                    // this.hideLoading();
                });

                this.data.transCode = this.$route.query.transCode;
                this.data.institutionCode = this.$route.query.institutionCode;
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
        .el-select {
            width: 100%;
        }
    }
</style>

