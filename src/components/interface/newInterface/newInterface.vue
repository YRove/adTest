<template>
    <el-main>
        <div class="el-main-title"><span>逻辑训练</span></div>
        <el-form :model="form" ref="form" prop="form" label-width="150px" :rules="rules"
                 class="demo-ruleForm login-container">
            <el-form-item label="交易号" prop="transCode">
                <el-input v-model="form.transCode" placeholder="请输入交易码，如CIB0301"></el-input>
            </el-form-item>
            <el-form-item label="系统名称" prop="systemName">
                <el-input v-model="form.systemName"></el-input>
            </el-form-item>
            <el-form-item label="交易名称" prop="transName">
                <el-input v-model="form.transName" placeholder="描述"></el-input>
            </el-form-item>
            <el-form-item label="协议" prop="protocolCode">
                <el-select v-model="form.protocolCode">
                    <el-option
                        v-for="item in protocolCodes"
                        :key="item.protocolCode"
                        :label="item.protocolCode"
                        :value="item.protocolCode">
                        <span style="float: left">{{ item.protocolCode }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.protocolType }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模式选择" prop="isSync">
                <el-radio-group v-model="form.isSync">
                    <el-radio label="Y">同步</el-radio>
                    <el-radio label="N">异步</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="幂等选择" prop="needUnique">
                <el-radio-group v-model="form.needUnique">
                    <el-radio label="Y">支持</el-radio>
                    <el-radio label="N">不支持</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="内部使用" prop="isFromInner">
                <el-radio-group v-model="form.isFromInner">
                    <el-radio label="0">否</el-radio>
                    <el-radio label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="错误码映射" prop="resultCodeGroupIds">
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
            <el-form-item label="个性化属性" :model="tableData" :rules="rules" ref="tableData">
                <div>
                    <el-table :data="tableData" border class="el-table-none">
                        <el-table-column prop="name" label='属性名称'>
                            <template slot-scope="scope" :rules="rules">
                                <el-select v-model="tableData[scope.$index].key"
                                           :disabled="tableData[scope.$index].isDistabled">
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
                            <template slot-scope="scope" :rules="rules">
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
                <el-button type="primary" @click="onSubmit">保存</el-button>
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
                    instanceCode: '',
                    transCode: '',
                    name: '',
                    describe: '',
                    isFromInner: 'Y',
                    needUnique: 'N',
                    isFromInner: "1",
                    isSync: 'Y',
                    properties: '',
                    systemName: ''
                },
                transPropertiesConfigs: this.getSelectData("transPropertiesConfigs"),
                codes: '',
                tableData: [],
                rules:
                    {
                        transCode: [
                            {required: true, message: '请输入交易编码', trigger: 'blur'}
                        ],
                        systemName:
                            [
                                {required: true, message: '请输入系统名称', trigger: 'blur'}
                            ],
                        transName:
                            [
                                {required: true, message: '请输入交易名称', trigger: 'blur'}
                            ],
                        protocolCode:
                            [
                                {required: true, message: '请选择协议', trigger: 'blur'}
                            ],
                        isSync:
                            [
                                {required: true, message: '请选择模式', trigger: 'blur'}
                            ],
                        needUnique:
                            [
                                {required: true, message: '请选择幂等', trigger: 'blur'}
                            ],

                        isFromInner:
                            [
                                {required: true, message: '请选择内部使用', trigger: 'blur'}
                            ],
                        resultCodeGroupIds:
                            [
                                {required: true, message: '请选择错误码', trigger: 'blur'}
                            ]
                    }
                ,
                protocolCodes: []
            }
        },
        created() {

            this.form.instanceCode = this.$route.query.institutionCode;
            this.getResponseCodes(this, this.$route.query.institutionCode);

            axios.get('api/protocol/getInstanceProtocolByInstanceCode', {
                params: {
                    instanceCode: this.form.instanceCode,
                }
            }).then(res => {


                this.protocolCodes = res.data.data || [];
            }).catch(error => {
                // this.hideLoading();
            });

        },
        methods: {
            init() {


            },
            onSubmit() {

                this.$refs["form"].validate((valid) => {

                    if (valid) {

                        // 转换为逗号分割的字符串
                        this.form.resultCodeGroupId = this.objSplitStr(this.form.resultCodeGroupIds);
                        this.form.properties = this.assPropertiesConfig(this.tableData, "=", ";");

                        // 新增协议
                        axios.post('api/transCode/addOrUpdateTransCode', this.form).then(res => {
                            this.submitting = false;
                            this.$root.eventHub.$emit('onSubmit', this.form)
                            // 成功
                            if (res.data.resultCode === '0') {
                                this.dialogTableVisible = false;
                                this.data = res.data;
                                if (this.action === 'add') {

                                    this.$message.success('添加成功');
                                    this.init();
                                }
                                else {
                                    this.$message.success('修改成功');
                                }
                            }
                            else {
                                this.$message.error(res.ret_msg);
                            }
                        }, err => {
                            this.$message.error('请求失败，请重试');
                            this.submitting = false;
                        });
                    }
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
