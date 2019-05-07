<template>
    <el-main>
        <div class="el-main-title"><span>responseCode-银行返回码映射</span></div>
        <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="交易号">
                <el-input v-model="form.transCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="错误码映射">
                <el-select v-model="form.resultCodeGroupIds" multiple>
                    <el-option
                        v-for="item in codes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
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
    import ElInput from "element-ui/packages/input/src/input";

    export default {
        components: {ElInput},
        data() {
            return {
                codes: [],
                form: {
                    transCode: '',
                    isFromInner: 1,
                    resultCodeGroupIds: []
                },
                textarea: '',
                value: '',

            }
        },
        created() {

            //初始化错误码组
            this.getResponseCodes(this, this.$route.query.institutionCode);
            this.form.systemName = this.$route.query.institutionCode;
            this.form.instanceCode = this.$route.query.institutionCode;

            axios.get('api/transCode/getTransCodeByCode', {
                params: {
                    transCode: this.$route.query.transCode
                }
            }).then(res => {

                this.form.transCode = res.data.data.transCode;
                this.form.transName = res.data.data.transName;
                this.form.id = res.data.data.id;
                this.form.resultCodeGroupIds = this.strSplitArray(res.data.data.resultCodeGroupId);

            }).catch(error => {
                // this.hideLoading();
            });
        },
        methods: {
            onSubmit() {


                // 转换为逗号分割的字符串
                this.form.resultCodeGroupId = this.objSplitStr(this.form.resultCodeGroupIds);

                // 新增协议
                axios.post('api/transCode/addOrUpdateTransCode', this.form).then(res => {
                    this.submitting = false;
                    // 成功
                    if (res.data.resultCode === '0') {
                        this.data = res.data;
                        if (this.action === 'add') {
                            this.$message.success('添加成功');
                        }
                        else {
                            this.$message.success('修改成功');
                        }

                        this.init();
                    }
                    else {
                        this.$message.error(res.ret_msg);
                    }
                }, err => {
                    this.$message.error('请求失败，请重试');
                    this.submitting = false;
                });

            },
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
        }
        .el-select {
            width: 100%;
        }
    }
</style>

