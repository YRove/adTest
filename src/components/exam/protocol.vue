<template>
    <el-main>
        <div class="el-main-title"><span>通道配置协议</span></div>
        <div>
            <el-button @click="add" type="primary" class="el-button-add">添加</el-button>
            <el-button @click="deleteRow()" type="danger">删除</el-button>

            <el-table row-class-name="no-hover"
                      :data="data"
                      @selection-change="handleSelectionChange"
                      :default-sort="{prop: 'connectType', order: 'descending'}"
                      border
            >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    v-for="item in tableProps"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.desc"
                >
                    <template slot-scope="scope" :rules="rules">
                        <template v-if="item.type === 'select'">
                            {{ getLabelFromDataSource(item.dataSource, scope.row[item.prop]) }}
                        </template>
                        <template v-else>{{ scope.row[item.prop] }}</template>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px;" class="el-btn-del">
                    <template slot-scope="scope">
                        <el-button @click="change(scope.$index)" size="mini">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="表格内容" :visible.sync="dialogTableVisible">
            <el-form class="dialog-form" ref="form" :rules="rules" :model="formData" label-width="80px">
                <el-form-item
                    v-for="item in tableProps"
                    :key="item.prop"
                    :label="item.desc"
                    :prop="item.prop"
                    :required="item.required"
                >
                    <el-input
                        v-model="formData[item.prop]"
                        :placeholder="`请输入${item.desc}`"
                        v-if="item.type === 'input'"
                    ></el-input>
                    <el-select v-model="formData[item.prop]"
                               :placeholder="`请选择${item.desc}`"
                               v-else-if="item.type === 'select'"
                    >
                        <el-option
                            v-for="item in item.dataSource"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()" :disabled="submitting" :loading="submitting">保存
                    </el-button>
                    <el-button @click="$refs.form.resetFields()" :disabled="submitting">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-main>
</template>

<script>
    import constant from '../../assets/js/constant';
    import axios from 'axios';

    export default {
        data() {
            return {
                dialogTableVisible: false,
                currentIndex: 0,
                tableProps: [{
                    prop: 'connectType',
                    desc: '连接类型',
                    type: 'select',
                    dataSource: this.getSelectData("connectTypes"),
                    required: true
                }, {
                    prop: 'protocolType',
                    desc: '协议类型',
                    type: 'select',
                    dataSource: this.getSelectData("protocolTypes"),
                    required: true
                }, {
                    prop: 'protocolCode',
                    desc: '协议编码',
                    type: 'input',
                    required: true
                }, {
                    prop: 'limitCount',
                    desc: '限流',
                    type: 'select',
                    dataSource: this.getSelectData("limitCounts"),
                    required: true
                }],
                rules: [],
                data: [],
                formData: {},
                submitting: false,
                action: 'add',
                code: this.$route.query.institutionCode,
                api: '/api/protocol/addandupdate'
            }
        },
        created() {
            this.formatRules();
        },
        mounted() {
            this.init();
        },
        methods: {
            getLabelFromDataSource(dataSource, value) {
                const result = dataSource.filter(source => source.value === value);
                if (result && result.length) {
                    return result[0].label;
                }
                return '';
            },
            formatRules() {
                this.rules = this.tableProps.map(tableProp => {
                    tableProp.rule = [{
                        required: tableProp.required,
                        message: tableProp.type === 'select' ? `请选择${tableProp.desc}` : `请输入${tableProp.desc}`
                    }];
                    return tableProp;
                }).reduce((preProp, curProp) => {
                    preProp[curProp.prop] = curProp.rule;
                    return preProp;
                }, {});
            },
            add() {
                this.formData = {};
                this.dialogTableVisible = true;
                this.action = 'add';
            },
            change(index) {
                this.currentIndex = index;
                this.formData = this.data[index];
                this.dialogTableVisible = true;
                this.action = 'change';
            },
            submitForm() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.submitting = true;
                        this.postSubmit(this.formData);
                    }
                });
            },
            deleteRow(index) {
                this.multipleSelection.map((item) => {
                    this.data.splice(this.data.indexOf(item), 1);
                });
            },
            postSubmit(data) {

                data.institutionCode = this.code;

                axios.post(this.api, data).then(res => {
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
            init() {

                axios.get('api/protocol/getInstanceProtocolByInstanceCode', {
                    params: {
                        instanceCode: this.code,
                    }
                }).then(res => {
                    this.data = res.data.data || [];


                }).catch(error => {
                    // this.hideLoading();
                });
            },
            handleSelectionChange(val) {

                this.multipleSelection = val;
            }
        }
    }
</script>

<style>
    .el-table--enable-row-hover .el-table__body tr.no-hover:hover > td {
        background: #fff;
    }

    .dialog-form {
        width: 440px;
        margin-left: 40px;
    }

    .dialog-form .el-select .el-input {
        width: 360px;
    }
</style>

<style scoped lang="scss">
    .el-main {
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
        .el-table {
            width: 94%;
            margin-left: 3%;
            margin-top: 20px;
            font-size: 12px;
        }
        .el-button-add {
            margin: 20px 0 0 80%;
        }
    }
</style>
