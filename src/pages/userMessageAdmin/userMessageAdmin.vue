<template>
    <el-main>
        <div class="el-main-title"><span>用户信息管理</span></div>
            <div class="Message-search">
                <el-autocomplete
                    v-model="state"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handleSelect"
                >
                    <template slot="prepend" icon="el-icon-search">信 息 查 询 <i class="el-icon-search"></i></template>
                </el-autocomplete>
            </div>
            
        <!-- <div label-width="100px" class="form-border-search">
            <div>查询结果</div>
            <div>{{state}}</div>
        </div> -->
        <div class="message">
            <el-table :data="data" border>
                <el-table-column prop="name" label="姓名">
                    <template slot-scope="scope">
                        <div>
                            {{data[scope.$index].name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="testNum" label="所做测试题次数">
                    <template slot-scope="scope">
                        <div>
                            共{{data[scope.$index].testNum}}次
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="aveIndex" label="试卷的平均得分指数">
                    <template slot-scope="scope">
                        <div>
                            {{data[scope.$index].aveIndex}}%
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="wholeTime" label="公用时长总和">
                    <template slot-scope="scope">
                        <div>
                            {{data[scope.$index].wholeTime}}分钟
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="inclination" label="患病倾向">
                    <template slot-scope="scope">
                        <div>
                            {{data[scope.$index].inclination}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-main>
</template>
<script>
export default {
    data() {
        return {
            data: [],
            search: [],
            state: '',
            timeout:  null,

        };
    },
    mounted(){
        //初始化，获取信息
        this.init();
    },
    methods: {
        init() {
            this.$axios.post('/getAnalysisMessage',{

            }).then(response => {
                let res = response.data;
                for(var i = 0; i < res.data.length; i++) {
                    this.data.push(res.data[i]);
                }
                this.search = this.data;
            }).catch(err => {
                this.$message({
                    showClose: true,
                    message: 'error get!!',
                    type: 'warning'
                });
            })
        },
        querySearchAsync(queryString, cb) {
            var search = this.search;
            var results = queryString ? search.filter(this.createStateFilter(queryString)) : search;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.name.indexOf(queryString) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
        }
    }
}
</script>

<style lang="scss">
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
        
        .form-border-search {
            width: 150px;
            border: 1px solid #ccc;
            margin: 40px 100px;
            padding: 20px;
            background: #fff;
        }

        .Message-search {
            margin: 40px 0 40px 100px;
            .el-autocomplete {
                width: 500px;
            }
        }
        .message {
            margin: 0 40px;
        }
    }
</style>