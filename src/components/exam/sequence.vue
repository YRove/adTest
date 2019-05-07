<template>
    <el-main>
        <div class="el-main-title"><span>sequence配置</span></div>
        <div>
            <el-table :data="data" border>
                <el-table-column prop="id" label="id">
                    <template  slot-scope="scope" style="width:100px;">
                        <el-input v-model="data[scope.$index].id" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="seq_name" label="seq_name">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].seq_name" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="seq_value" label="seq_value">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].seq_value" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="min_value" label="min_value">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].min_value" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="max_value" label="max_value">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].max_value" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="step" label="step">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].step" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="memo">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].age" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="删除" width="85px;">
                    <template  slot-scope="scope">
                    <el-button @click="deleteRow(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="保存" width="85px;">
                    <template  slot-scope="scope">
                    <el-button @click="change(scope.$index)" id="btn">{{data[scope.$index].changeText}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="add" type="primary" class="el-button-add">添加</el-button>
        </div>
    </el-main>
</template>

<script>
    import axios from 'axios';

    export  default {
        data() {
            return {
                data: [],
                datas: [],
                code: ''
            }
        },
        created() {
            this.code = this.$route.query.institutionCode;
            this.init();
        },
        mounted() {
            this.init();
        },
        methods: {
            add() {
                this.data.push({isDistabled:true,changeText:'修改'});
            },
            deleteRow(index) {
                this.data.splice(index,1);
            },
            init() {
                axios.get('api/param/getMessageParam',{
                    params: {
                        itemId: this.id
                    }
                }).then(res => {
                    this.datas = res.data.data;
                }).catch(error => {

                });
            },
            change(index) {
                if (this.data[index].changeText === '保存') {
                    this.data[index].isDistabled = true;
                    this.data[index].changeText = '修改';
                } else {
                    this.data[index].isDistabled = false;
                    this.data[index].changeText = '保存';
                }

            }

        }
    }
</script>

<style scoped lang="scss">
    .el-main{
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
        .el-button {
            border: 0;
        }
        .el-button-add {
            margin: 20px 0 0 80%;
        }
    }
</style>
