<template>
    <div class="article-path">
        <el-carousel :interval="4000" type="card" height="250px">
            <a href="https://www.sohu.com/a/193684460_99958029" target="_blank">
                <el-carousel-item v-for="(item,index) in pic" :key="index">
                    <div class="login-logo marginB10"><img width="520" height="250px" :src="item.image" alt="logo"></div>
                    <div class="article-title">{{item.title}}</div>
                </el-carousel-item>
            </a>
        </el-carousel>
        <div>
            <div class="sub-nav"><i class="el-icon-star-on"></i> 热点推送</div>
            <div class="card-wrap">
                <div class="card s-pg16">
                    <div class="card-article-a">
                        <h3><a href="https://news.sina.com.cn/s/2019-05-02/doc-ihvhiewr9461308.shtml" target="_blank" title="科学家确认新型痴呆症 或比阿尔茨海默病更严重" suda-data="key=tblog_search_weibo&amp;value=seqid:15572820674210640255|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:1,click:article-title,doc_id:17408317660569531859">科学家确认新型痴呆症 或比<em class="s-color-red">阿尔茨海默</em>病更严重</a></h3>
                        <div class="content">
                            <div class="pic">
                                <a href="https://news.sina.com.cn/s/2019-05-02/doc-ihvhiewr9461308.shtml" target="_blank" suda-data="key=tblog_search_weibo&amp;value=seqid:15572820674210640255|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:1,click:article-pic,doc_id:17408317660569531859"><img src="//simg.s.weibo.com/gs1_11884860960496798357.jpg"></a>
                            </div>
                            <div class="detail">
                                <p class="txt">症或比<em class="s-color-red">阿尔茨海默</em>病更严重美媒称，根据一份最新报告，研究人员正式确认了一种很像<em class="s-color-red">阿尔茨海默</em>病的新脑部疾病，给它起了名字并给出诊断标准。据美国趣味科学网站4月30日报道...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-wrap">
                <div class="card s-pg16">
                    <div class="card-article-a">
                        <h3><a href="https://weibo.com/ttarticle/p/show?id=2309404357389066319737" target="_blank" title="比尔·盖茨：用意想不到的方法诊断阿尔茨海默症" suda-data="key=tblog_search_weibo&amp;value=seqid:15572820674210640255|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:2,click:article-title,doc_id:13824959012623321234">比尔·盖茨：用意想不到的方法诊断<em class="s-color-red">阿尔茨海默</em>症</a></h3>
                        <div class="content">
                            <div class="pic">
                                <a href="https://weibo.com/ttarticle/p/show?id=2309404357389066319737" target="_blank" suda-data="key=tblog_search_weibo&amp;value=seqid:15572820674210640255|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:2,click:article-pic,doc_id:13824959012623321234"><img src="//simg.s.weibo.com/gs1_17708322079036811217.jpg"></a>
                            </div>
                            <div class="detail">
                                <p class="txt"><em class="s-color-red">阿尔茨海默</em>症，我们该如何消灭它？就像我去年写的那样，这真的是一个鸡和蛋的问题。找到<em class="s-color-red">阿尔茨海默</em>症的治疗方法需要大量新药的临床实验，但是如果不能在发病初期发现这些患者...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-wrap">
                <div class="card s-pg16">
                    <div class="card-article-a">
                        <h3><a href="https://weibo.com/ttarticle/p/show?id=2309404353857667883901" target="_blank" title="苏大强得了阿尔茨海默病，作为家人能做什么？" suda-data="key=tblog_search_weibo&amp;value=seqid:15572820674210640255|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:5,click:article-title,doc_id:196316120815032281">苏大强得了<em class="s-color-red">阿尔茨海默</em>病，作为家人能做什么？</a></h3>
                        <div class="content">
                            <div class="pic">
                                <a href="https://weibo.com/ttarticle/p/show?id=2309404353857667883901" target="_blank" suda-data="key=tblog_search_weibo&amp;value=seqid:15572820674210640255|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:5,click:article-pic,doc_id:196316120815032281"><img src="//simg.s.weibo.com/gs1_3904616673361982040.jpg"></a>
                            </div>
                            <div class="detail">
                                <p class="txt">所以看的并不全，但好歹也是了解片中的人物关系的。今天转眼到了大结局，昨天晚上看预告说苏大强得了<em class="s-color-red">阿尔茨海默</em>病。所以我也借着热点来跟大家做一下相关科普...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="sub-nav"><i class="el-icon-star-on"></i> 科普推送</div>
            <div class="card-wrap">
                <div class="card s-pg16">
                    <div class="card-article-a">
                        <h3><a href="http://weibo.com/ttarticle/p/show?id=2309351000124368542169494908" target="_blank" title="6种方法预防阿尔茨海默症 测测你的记忆力如何" suda-data="key=tblog_search_weibo&amp;value=seqid:155728266189702639443|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:8,click:article-title,doc_id:4566640838957461702">6种方法预防<em class="s-color-red">阿尔茨海默</em>症 测测你的记忆力如何</a></h3>
                        <div class="content">
                            <div class="pic">
                            <a href="http://weibo.com/ttarticle/p/show?id=2309351000124368542169494908" target="_blank" suda-data="key=tblog_search_weibo&amp;value=seqid:155728266189702639443|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:8,click:article-pic,doc_id:4566640838957461702"><img src="//simg.s.weibo.com/gs1_17391065741527094641.jpg"></a>
                            </div>
                            <div class="detail">
                                <p class="txt">受教育年限少于10年的人群中，上年纪后患该病的风险要大很多。也就是说没有读完中学的人，在老年时期更要格外防范记忆力减退的症状。当然，也不要因为这个原因就自暴自弃，好消息是...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-wrap">
                <div class="card s-pg16">
                    <div class="card-article-a">
                        <h3><a href="http://news.cctv.com/2019/04/18/ARTItDgSbtYGn5xR2QiyJOio190418.shtml" target="_blank" title="阿尔茨海默病受关注 发病机理仍是谜" suda-data="key=tblog_search_weibo&amp;value=seqid:155728266189702639443|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:9,click:article-title,doc_id:12646791944379817194"><em class="s-color-red">阿尔茨海默</em>病受关注 发病机理仍是谜</a></h3>
                        <div class="content">
                            <div class="pic">
                            <a href="http://news.cctv.com/2019/04/18/ARTItDgSbtYGn5xR2QiyJOio190418.shtml" target="_blank" suda-data="key=tblog_search_weibo&amp;value=seqid:155728266189702639443|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:9,click:article-pic,doc_id:12646791944379817194"><img src="//simg.s.weibo.com/gs1_6293977306590797611.jpg"></a>
                            </div>
                            <div class="detail">
                                <p class="txt">改变AD病程并改善症状的新药上市，未来5年可将重度AD病例减少50%，2050年将减少80%。虽然对于AD发病的机理仍不确定，但越来越清晰的一点是...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-wrap">
                <div class="card s-pg16">
                    <div class="card-article-a">
                        <h3><a href="http://weibo.com/ttarticle/p/show?id=2310474367580503625641" target="_blank" title="如何早期识别老年痴呆（阿尔茨海默病）？" suda-data="key=tblog_search_weibo&amp;value=seqid:155728266189702639443|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:12,click:article-title,doc_id:18007150934805621787">如何早期识别老年痴呆（<em class="s-color-red">阿尔茨海默</em>病）？</a></h3>
                        <div class="content">
                            <div class="pic">
                                <a href="http://weibo.com/ttarticle/p/show?id=2310474367580503625641" target="_blank" suda-data="key=tblog_search_weibo&amp;value=seqid:155728266189702639443|type:21|t:0|pos:1-0|q:%E9%98%BF%E5%B0%94%E8%8C%A8%E6%B5%B7%E9%BB%98|ext:mpos:12,click:article-pic,doc_id:18007150934805621787"><img src="//simg.s.weibo.com/gs1_2181034366601119181.jpg"></a>
                            </div>
                            <div class="detail">
                                <p class="txt">或者说怎样才能早期就发现这是老年痴呆而不是普通的健忘。每八个65岁及以上的人中就有一个老年痴呆症。早期，<em class="s-color-red">阿尔茨海默</em>氏症的症状可能不明显...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          pic: [
                {
                    url: 'https://www.sohu.com/a/193684460_99958029',
                    image: require('@/assets/img/carousel1.jpeg'),
                    title: '阿尔茨海默病——这个健康杀手，你真的了解吗？'
                },
                {
                    url: 'http://china.caixin.com/2018-09-15/101326407.html',
                    image: require('@/assets/img/carousel2.jpg'),
                    title: '中国多数阿尔茨海默病患者错过了最佳诊断时机'

                },
                {
                    url: 'http://www.sohu.com/a/255355509_656403',
                    image: require('@/assets/img/carousel3.jpeg'),
                    title: '阿尔茨海默病日:我想重新认识你,从你的名字开始'
                },
                {
                    url: 'https://www.sohu.com/a/252911648_100041666',
                    image: require('@/assets/img/carousel4.jpg'),
                    title: '患阿尔茨海默病十余年，生活仍可自理，凭的什么？'
                }
          ]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">
    .article-path {
        margin: 40px 2%;
        width: 96%;
        .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 200px;
            margin: 0;
        }
        
        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }
        
        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
        .sub-nav {
            background: #fff;
            margin-bottom: 10px;
            display: block;
            width: 200px;
            height: 38px;
            line-height: 38px;
            color: #ef4d58;
            border-radius: 20px;
            text-align: center;
        }
        .article-title {
            padding-left: 20px;
            position: absolute;
            top: 200px;
            color: #fff;
            font-size: 20px;
        }
        .card-wrap {
            margin-bottom: 10px;
            border-radius: 2px;
            border: 1px solid #eee;
            background: #fff;
        }
        .s-pg16 {
            padding: 16px;
        }
        h3 {
            display: block;
            font-size: 1.17em;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
        }
        .card-article-a h3 {
            line-height: 18px;
            margin-bottom: 6px;
            font-size: 14px;
        }
        .card-article-a .content {
            overflow: hidden;
            color: #808080;
        }
        .card-article-a .pic {
            float: left;
            margin: 4px 18px 0 0;
            width: 88px;
            height: 68px;
            overflow: hidden;
        }
        .card-article-a .detail .txt {
            line-height: 24px;
            margin-bottom: 5px;
        }
        .s-color-red {
            color: #ef4d58;
        }
        .card-article-a .detail .act ul {
            overflow: hidden;
        }
    }

</style>

