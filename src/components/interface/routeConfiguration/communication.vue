<template>
    <el-main>
        <div class="el-main-title"><span>CommunicationMapping-通讯配置</span></div>
        <el-form ref="form" label-width="150px">
            <el-form-item label="交易码">
                <el-input v-model="data.transCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="协议号">
                <el-select v-model="data.protocolCode">
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
            <el-form-item label="字符集">
                <el-input v-model="data.charset" placeholder="请输入银行字符编码"></el-input>
            </el-form-item>
            <el-form-item label="uri">
                <el-input v-model="data.uri" placeholder="请输入银行报文交易URL"></el-input>
            </el-form-item>
            <el-form-item label="超时时间">
                <el-input v-model="data.timeout"></el-input>
            </el-form-item>
            <el-form-item label="recv接收数据格式">
                <el-select v-model="data.recvDataType">
                    <el-option
                        v-for="item in sendDataTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="send发动数据格式">
                <el-select v-model="data.sendDataType">
                    <el-option
                        v-for="item in sendDataTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="个性化属性">
                <div>
                    <el-table :data="tableData" border class="el-table-none">
                        <el-table-column prop="name" label="参数名称">
                            <template slot-scope="scope">
                                <el-select v-model="tableData[scope.$index].key"
                                           :disabled="tableData[scope.$index].isDistabled">
                                    <el-option
                                        v-for="item in propertiesConfigs"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        <span style="float: left">{{ item.label }}</span>
                                        <span
                                            style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label="参数值">
                            <template slot-scope="scope">
                                <el-input v-model="tableData[scope.$index].value"
                                          :disabled="tableData[scope.$index].isDistabled"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="oper">
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

    export default {
        data() {
            return {
                data: {
                    transCode: '',
                    protocolCode: '',
                    uri: '',
                    timeout: '',
                    charset: '',
                    recvDataType: '',
                    sendDataType: '',
                    properties: ''
                },
                transCode: '',
                sendDataTypes: this.getSelectData("sendDataTypes"),
                propertiesConfigs: this.getSelectData("propertiesConfigs"),
                tableData: [],
                protocolCodes: []
            }
        },
        created() {
            this.init();
        },
        methods: {
            onSubmit() {

                this.data.properties = this.assPropertiesConfig(this.tableData, "=", ";");

                axios.post('/api/communication/addandupdate', this.data
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
                this.data.instanceCode = this.$route.query.institutionCode;

                axios.get('api/communication/getMappingByTransCode', {
                    params: {
                        transCode: this.data.transCode
                    }
                }).then(res => {

                    if (res.data.data != null) {
                        this.data = res.data.data;
                        this.tableData = this.parsePropertiesConfig(this.data.properties, "=", ";");
                    }

                }).catch(error => {
                    // this.hideLoading();
                });

                axios.get('api/protocol/getInstanceProtocolByInstanceCode', {
                    params: {
                        instanceCode: this.data.instanceCode,
                    }
                }).then(res => {


                    this.protocolCodes = res.data.data || [];
                }).catch(error => {
                    // this.hideLoading();
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
                margin-left: 200px;
                overflow: hidden;
            }
        }
        .el-radio-group-select:nth-child(1) {
            margin-left: -390px;
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
        .el-table__header-wrapper table {
            display: none;
        }
    }
</style>
