<template>
    <el-main>
        <div class="el-main-title"><span>错误码映射配置</span></div>
        <div class="errCode-btn">
            <el-button @click="openAddDialog" type="primary" class="el-button-add" plain>添加</el-button>
            <el-button @click="importErrorCode" type="primary" class="el-button-add" plain>导入</el-button>
            <a href="api/code/downloadTemp" rel="external nofollow">
                <el-button type="success" class="el-button-add" plain>下载模板</el-button>
            </a>
        </div>
        <el-dialog title="导入" :visible.sync="dialogTableVisible">
            <el-form class="dialog-form" ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="组名称:" prop="groupName">
                    <el-input
                        v-model="form.groupName" :placeholder="`请输入组名称`">
                    </el-input>
                </el-form-item>

                <el-form-item label="组id:" prop="groupId">
                    <el-input v-model="form.groupId" :placeholder="`请输入组id`"></el-input>
                    <a href="api/code/downloadTemp" rel="external nofollow">
                        <el-button type="primary" class="el-button-add">下载模板</el-button>
                    </a>
                    <el-button @click="importErrorCode" type="primary" class="el-button-add">导入</el-button>
                    <el-dialog title="导入" :visible.sync="dialogTableVisible">
                        <el-form class="dialog-form" ref="form" :model="form" label-width="80px">
                            <el-form-item label="组名称:" :required=true>
                                <el-input
                                    v-model="form.groupName" :placeholder="`请输入组名称`" :required=true></el-input>
                            </el-form-item>

                            <el-form-item label="组id:" :required=true>
                                <el-input v-model="form.groupId" :placeholder="`请输入组id`" :required=true></el-input>
                            </el-form-item>
                            <el-form-item label="选择文件:">
                                <el-upload
                                    class="upload-demo"
                                    ref="upload"
                                    action="doUpload"
                                    :limit="1"
                                    :file-list="fileList"
                                    :before-upload="beforeUpload">
                                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                                    <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5MB</div>
                                    <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
                                </el-upload>
                                <el-button @click="dialogTableVisible = false">取消</el-button>
                                <el-button type="primary" @click="submitUpload()">确定</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </el-form-item>
            </el-form>
        </el-dialog>


        <el-dialog title="新增修改" :visible.sync="dialogAddAndEditVisible">
            <el-form class="dialog-form" ref="addForm" :model="addForm" label-width="80px">
                <el-form-item label="组名称:" :required=true>
                    <el-select v-model="addForm.resultCodeGroupId">
                        <el-option
                            v-for="item in codes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span
                                style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="外部返回错误码:" :required=true>
                    <el-input v-model="addForm.responseCode" :placeholder="`请输入外部错误码`"
                              :required=true></el-input>
                </el-form-item>
                <el-form-item label="外部返回错误码:" :required=true>
                    <el-input v-model="addForm.responseMessage" :placeholder="`请输入外部错误码`"
                              :required=true></el-input>
                </el-form-item>
                <el-form-item label="内部结果码:" :required=true>
                    <el-input v-model="addForm.resultCode" :placeholder="`请输入外部错误码`"
                              :required=true></el-input>
                </el-form-item>
                <el-form-item label="内部返回信息:" :required=true>
                    <el-input v-model="addForm.resultMessage" :placeholder="`请输入外部错误码`"
                              :required=true></el-input>
                </el-form-item>
                <el-form-item label="结果:" :required=true>
                    <el-select v-model="addForm.transResult">
                        <el-option
                            v-for="item in resultSelect"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span
                                style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="submitAddAndEdit()">保存</el-button>
            </el-form>
        </el-dialog>


        <div>
            <el-table :data="data" border>
                <el-table-column prop="id" label="序列" width="100px;">
                </el-table-column>
                <el-table-column prop="resultCodeGroupId" label="所属组">
                </el-table-column>
                <el-table-column prop="resultCodeGroupName" label="组名称">
                </el-table-column>
                <el-table-column prop="transResult" label="结果">
                </el-table-column>
                <el-table-column prop="responseCode" label="外部返回错误码">
                </el-table-column>
                <el-table-column prop="responseMessage" label="外部返回信息">
                </el-table-column>
                <el-table-column prop="resultCode" label="内部结果码">
                </el-table-column>
                <el-table-column prop="resultMessage" label="内部返回信息">
                </el-table-column>
                <el-table-column prop="id" label="操作" width="85px;">
                    <template slot-scope="scope">
                        <el-button size="small" class="el-button-add" @click="openEditDialog(scope.$index)">
                            修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-main>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                fileList: [],
                data: [],
                codes: '',
                form: {
                    groupName: '',
                    groupId: ''
                },
                fileName: '',
                update: {},
                dialogTableVisible: false,
                rules: {
                    groupName: [
                        {required: true, message: '请输入组件名', trigger: 'blur'}
                    ],
                    groupId:
                        [
                            {required: true, message: '请输入组id', trigger: 'blur'}
                        ]
                },
                dialogAddAndEditVisible: false,
                addForm: {},
                resultSelect: [
                    {
                        label: 'SUCCESS',
                        value: 'SUCCESS'
                    },
                    {
                        label: 'FAIL',
                        value: 'FAIL'
                    },
                    {
                        label: 'UNKNOWN',
                        value: 'UNKNOWN'
                    }]
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        methods: {
            init() {

                this.getResponseCodes(this, this.$route.query.institutionCode);

                axios.get('api/code/getResponseCodeByInstanceCode', {
                    params: {
                        instanceCode: this.$route.query.institutionCode,
                    }
                }).then(res => {
                    this.data = res.data.data;
                }).catch(error => {
                    // this.hideLoading();
                });
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            submitUpload() {

                console.log(this.form.groupName);

                /*this.$refs.form.validate(valid => {
                    if (valid) {

                        return false;*/
                if (this.form.groupName == "") {
                    this.$message.warning('请输入组名')
                    return false
                }

                if (this.form.groupId == "") {
                    this.$message.warning('请输入组id')
                    return false
                }

                if (this.fileName == "") {
                    this.$message.warning('请选择要上传的文件！')
                    return false
                }

                let fileFormData = new FormData();
                fileFormData.append('file', this.files, this.fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
                fileFormData.append('groupName', this.form.groupName);
                fileFormData.append('groupId', this.form.groupId);
                fileFormData.append('instanceCode', this.$route.query.institutionCode);

                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                axios.post(`/api/code/import`, fileFormData, requestConfig).then((res) => {

                    if (res.data.resultCode === '0') {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        })

                        this.init();

                    } else {

                        this.$message.error(res.data.resultMsg)
                    }
                })
            },
            beforeUpload(file) {
                this.files = file;
                const extension = file.name.split('.')[1] === 'xls'
                const extension2 = file.name.split('.')[1] === 'xlsx'
                const isLt2M = file.size / 1024 / 1024 < 5
                if (!extension && !extension2) {
                    this.$message.warning('上传模板只能是 xls、xlsx格式!')
                    return
                }
                if (!isLt2M) {
                    this.$message.warning('上传模板大小不能超过 5MB!')
                    return
                }
                this.fileName = file.name;
                return false // 返回false不会自动上传
            },
            add() {
                this.formData = {};
                this.dialogTableVisible = true;
            },
            importErrorCode() {
                this.formData = {};
                this.dialogTableVisible = true;
            },
            openEditDialog(index) {

                this.addForm = this.data[index];
                this.dialogAddAndEditVisible = true;
            },
            openAddDialog() {

                this.addForm = {};
                this.dialogAddAndEditVisible = true;
            },
            submitAddAndEdit() {

                if (typeof(this.addForm.resultCodeGroupId) == "undefined" || this.addForm.resultCodeGroupId == "") {
                    this.$message.warning('请选择错误码组')
                    return false
                }

                if (typeof(this.addForm.resultCodeGroupId) == "undefined" || this.form.responseCode == "") {
                    this.$message.warning('请输入外部返回错误码')
                    return false
                }

                if (typeof(this.addForm.responseMessage) == "undefined" || this.form.responseMessage == "") {
                    this.$message.warning('请输入外部返回信息！')
                    return false
                }

                if (typeof(this.addForm.resultCode) == "undefined" || this.form.resultCode == "") {
                    this.$message.warning('请输入内部返回信息！')
                    return false
                }

                if (typeof(this.addForm.resultMessage) == "undefined" || this.form.resultMessage == "") {
                    this.$message.warning('请输入内部返回信息！')
                    return false
                }

                if (typeof(this.addForm.transResult) == "undefined" || this.form.transResult == "") {
                    this.$message.warning('请输入选择处理结果！')
                    return false
                }

                var len = this.codes.length;
                for (var i = 0; i < len; i++) {

                    if (this.codes[i].value == this.addForm.resultCodeGroupId) {

                        this.addForm.resultCodeGroupName = this.codes[i].label;

                        break;
                    }
                }

                axios.post(`/api/code/updateAndAddResponseCode`, this.addForm).then((res) => {

                    if (res.data.resultCode === '0') {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        })

                        this.init();

                    } else {

                        this.$message.error(res.data.resultMsg)
                    }
                })

            }
        }
    }
</script>

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
            width: 96%;
            margin-left: 2%;
            margin-top: 20px;
            font-size: 12px;
        }
        .el-table-column {
            .el-button--primary {
                background-color: #47c0e6;
            }
        }
        .upload-demo {
            .el-upload--text button {
                margin-right: 400px;
            }
            .el-upload-list {
                width: 400px;
            }
        }
        .errCode-btn {
            margin: 20px 0 20px 750px;
        }
    }
</style>
