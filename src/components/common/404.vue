<template>
    <el-container style="height:100%;">
        <!--背景图-->
        <!--login框，表单+tab标签页的组合-->
        <el-main>
            迷路了
        </el-main>
    </el-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: '404',
        data() {
            return {
                logining: false,
                checked: true

            };
        }, methods: {
            onSubmit() {
            }
        }
    }
</script>
