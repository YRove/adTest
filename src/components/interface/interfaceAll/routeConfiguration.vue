<template>
    <div class="el-btn">
        <el-button type="info" circle class="el-btn-inner" size="mini">内部系统</el-button>
        <router-link :to="{path:'/aside/valiRequest',query:{institutionCode:code,transCode:$route.query.transCode}}">
            <el-button plain class="el-btn-req" size="mini">validation客户端req请求</el-button>
        </router-link>
        <router-link :to="{path:'/aside/valiResponse',query:{institutionCode:code,transCode:$route.query.transCode}}">
            <el-button plain class="el-btn-res" size="mini">validation客户端req应答</el-button>
        </router-link>
        <router-link :to="{path:'/aside/assemble',query:{institutionCode:code,transCode:$route.query.transCode}}">
            <el-button type="primary" class="el-btn-assemble" size="mini">assemble请求</el-button>
        </router-link>
        <router-link :to="{path:'/aside/errorMap',query:{institutionCode:code,transCode:$route.query.transCode}}">
            <el-button plain class="el-btn-err" size="mini">错误码映射</el-button>
        </router-link>
        <router-link :to="{path:'/aside/parser',query:{institutionCode:code,transCode:$route.query.transCode}}">
            <el-button plain class="el-btn-parser" size="mini">parser客户端</el-button>
        </router-link>
        <router-link :to="{path:'/aside/communication',query:{institutionCode:code,transCode:$route.query.transCode}}">
            <el-button type="success" class="el-btn-tel" size="mini">communication通讯客户端</el-button>
        </router-link>
        <el-button type="info" circle class="el-btn-outer" size="mini">外部系统</el-button>
        <canvas id="clientCanvas" width="1000px" height="500px"></canvas>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                code: 0
            }
        },
        created() {
            this.code = this.$route.query.institutionCode;
        },
        mounted() {
            this.arrow2(0, 0, 110, 233, 84, 233);
            this.arrow2(0, 0, 110, 233, 170, 150);
            this.arrow2(0, 0, 110, 233, 170, 340);
            this.arrow2(0, 0, 335, 150, 600, 150);
            this.arrow2(0, 0, 420, 340, 340, 340);
            this.arrow2(0, 0, 610, 340, 513, 340);
            this.arrow2(0, 0, 650, 150, 650, 220);
            this.arrow2(0, 0, 650, 240, 650, 325);
            this.arrow2(0, 0, 820, 233, 750, 233);
            this.arrow2(0, 0, 820, 233, 840, 233);
        },
        methods: {
            arrow2(ox, oy, x1, y1, x2, y2) {
                //canvas的 id ，原点坐标  第一个端点的坐标，第二个端点的坐标
                var sta = new Array(x1, y1);
                var end = new Array(x2, y2);
                var canvas = document.getElementById('clientCanvas');
                if (canvas == null)
                    return false;
                var ctx = canvas.getContext('2d');
                //画线
                ctx.beginPath();
                ctx.translate(ox, oy, 0); //坐标源点
                ctx.moveTo(sta[0], sta[1]);
                ctx.lineTo(end[0], end[1]);
                ctx.fill();
                ctx.stroke();
                ctx.save();
                //画箭头
                ctx.translate(end[0], end[1]);
                var ang = (end[0] - sta[0]) / (end[1] - sta[1]);
                ang = Math.atan(ang);
                if (end[1] - sta[1] >= 0) {
                    ctx.rotate(-ang);
                } else {
                    ctx.rotate(Math.PI - ang);//加个180度，反过来
                }
                ctx.lineTo(-5, -10);
                ctx.lineTo(0, -5);
                ctx.lineTo(5, -10);
                ctx.lineTo(0, 0);
                ctx.fill(); //箭头是个封闭图形
                ctx.restore();   //恢复到堆的上一个状态，其实这里没什么用。
                ctx.closePath();
            }
        }
    }
</script>

<style lang="scss">
    #clientCanvas {
        border: 1px solid #ccc;
        margin: 20px 0 0 20px;
    }

    .el-btn {
        &-inner {
            position: absolute;
            top: 300px;
            left: 241px;
        }
        &-req {
            background-color: #FFFFE0;
            position: absolute;
            top: 215px;
            left: 392px;
        }
        &-res {
            background-color: #FFFFE0;
            position: absolute;
            top: 405px;
            left: 392px;
        }
        &-assemble {
            position: absolute;
            top: 215px;
            left: 820px;
        }
        &-err {
            background-color: #FFE4B5;
            position: absolute;
            top: 405px;
            left: 640px;
        }
        &-parser {
            background-color: #DA70D6;
            position: absolute;
            top: 405px;
            left: 830px;
        }
        &-tel {
            position: absolute;
            top: 300px;
            left: 790px;
        }
        &-outer {
            position: absolute;
            top: 300px;
            left: 1060px;
        }
    }
</style>
