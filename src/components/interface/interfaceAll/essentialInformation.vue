<template>
    <el-main>
        <div class="el-main-title"><span>交易接口基本信息</span></div>
        <el-form label-width="150px">
            <el-form-item label="交易号">
                <el-input v-model="form.transCode" placeholder="请输入交易码"></el-input>
            </el-form-item>
            <el-form-item label="交易名称">
                <el-input v-model="form.transName" placeholder="请输入交易码，如 兴业银行借记卡支付接口"></el-input>
            </el-form-item>
            <el-form-item label="交易模式选择">
                <el-radio-group v-model="form.isSync">
                    <el-radio label="Y">同步</el-radio>
                    <el-radio label="N">外部回执</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="幂等选择">
                <el-radio-group v-model="form.needUnique">
                    <el-radio label="Y">Y</el-radio>
                    <el-radio label="N">N</el-radio>
                </el-radio-group>
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
            <el-form-item label="个性化属性" :model="tableData" ref="tableData">
                <div>
                    <el-table :data="tableData" border class="el-table-none">
                        <el-table-column prop="name" label='属性名称'>
                            <template slot-scope="scope" :rules="rules">
                                <el-select v-model="tableData[scope.$index].key"
                                           :disabled="tableData[scope.$index].isDistabled" required=true>
                                    <el-option
                                        v-for="item in transPropertiesConfigs"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                        <span style="float: left">{{ item.label }}</span>
                                        <span
                                            style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="属性值">
                            <template slot-scope="scope">
                                <el-input v-model="tableData[scope.$index].value"
                                          :disabled="tableData[scope.$index].isDistabled"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <el-button @click="change(scope.$index)" id="btn">{{tableData[scope.$index].changeText}}
                                </el-button>
                                <el-button @click="deleteRow(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-button type="primary" @click="add" class="el-button-new">新增字段</el-button>
            </el-form-item>
            <el-form-item class="el-form-item-btn">
                <el-button type="primary" @click="onSubmit">提交申请</el-button>
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
                form: {
                    transCode: '',
                    transName: '',
                    isSync: '',
                    needUnique: '',
                    resultCodeGroupId: '',
                    properties: '',
                    instanceCode: ''
                },
                codes: '',
                tableData: [],
                transPropertiesConfigs: this.getSelectData("transPropertiesConfigs"),

            }
        },
        created() {

            this.form.instanceCode = this.$route.query.institutionCode;
            this.getResponseCodes(this, this.$route.query.institutionCode);

            this.init();
        },
        methods: {

            init() {

                axios.get('api/transCode/getTransCodeByCode', {
                    params: {
                        transCode: this.$route.query.transCode
                    }
                }).then(res => {

                    this.form.institutionCode = res.data.data.institutionCode;
                    this.form.transCode = res.data.data.transCode;
                    this.form.transName = res.data.data.transName;
                    this.form.id = res.data.data.id;
                    this.form.needUnique = res.data.data.needUnique;
                    this.form.isSync = res.data.data.isSync;
                    if (res.data.data.resultCodeGroupId != '') {

                        this.form.resultCodeGroupIds = this.strSplitArray(res.data.data.resultCodeGroupId);
                    }

                    if (this.form.properties != '') {

                        this.tableData = this.parsePropertiesConfig(this.form.properties, "=", ";");
                    }


                }).catch(error => {
                    // this.hideLoading();
                });
            },
            onSubmit() {

                // 转换为逗号分割的字符串
                this.form.resultCodeGroupId = this.objSplitStr(this.form.resultCodeGroupIds);
                this.form.properties = this.assPropertiesConfig(this.tableData, "=", ";");
                this.form.instanceCode = this.$route.query.institutionCode;
                this.form.systemName = this.$route.query.institutionCode;
                // 新增协议
                axios.post('api/transCode/addOrUpdateTransCode', this.form).then(res => {
                    this.submitting = false;
                    // 成功
                    if (res.data.resultCode === '0') {
                        this.dialogTableVisible = false;
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
            add() {
                this.tableData.push({isDistabled: false, changeText: '保存'});
            },
            deleteRow(index) {
                this.tableData.splice(index, 1);
            },
            change(index) {
                if (this.tableData[index].changeText === '保存') {
                    this.tableData[index].isDistabled = true;
                    this.tableData[index].changeText = '修改';
                } else {
                    this.tableData[index].isDistabled = false;
                    this.tableData[index].changeText = '保存';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
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
        .el-form {
            margin: 20px 200px 100px 200px;
            &-item-btn {
                margin-left: 450px;
            }
        }
        .el-radio-margin {
            margin-left: 50px;
        }
        .el-select {
            width: 100%;
        }
        .el-button-new {
            margin: 50px 390px 0 0;
        }
        // .el-table-none {
        //         display: none;
        // }
        .el-table__header-wrapper table {
            display: none;
        }
    }
</style>
