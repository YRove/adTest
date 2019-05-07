<template>
    <el-main>
        <div class="el-main-title"><span>常量值配置</span></div>
        <div>
            <el-table :data="data" border>
                <el-table-column prop="id" label="序号">
                    <template  slot-scope="scope" style="width:100px;">
                        <el-input v-model="data[scope.$index].id" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="institutionCode" label="机构code">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].institutionCode" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="paramType" label="参数类型">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].paramType" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="paramName" label="参数名称">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].paramName" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="paramValue" label="参数值">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].paramValue" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="memo" label="描述">
                    <template  slot-scope="scope">
                        <el-input v-model="data[scope.$index].memo" :disabled="data[scope.$index].isDistabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="操作" width="85px;">
                    <template  slot-scope="scope">
                    <el-button @click="deleteRow(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="保存" width="85px;">
                    <template  slot-scope="scope">
                    <el-button @click="change(scope.$index)" id="btn">修改</el-button>
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
        data:[],
        datas: [],
        code: ''
      }
    },
    created() {
        this.code =this.$route.query.institutionCode;
        this.init();
    },
    mounted() {
        this.init();
    },
    methods: {
        add() {
            this.data.push({isDistabled:true,changeText:'修改'});
        },
        init() {
            axios.get('api/param/getMessageParamByInstanceCode',{
                params: {
                    instanceCode: this.code
            }
            }).then(res => {
                this.data = res.data.data;

            }).catch(error => {
                // this.hideLoading();
            });
        },
        deleteRow(index) {
            this.data.splice(index,1);
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
        .el-button {
            border: 0;
        }
        .el-button-add {
            margin: 20px 0 0 80%;
        }
    }
</style>
