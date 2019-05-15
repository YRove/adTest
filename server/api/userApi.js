var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err')
    } else {
        // console.log(ret);
        // res.json(ret);
        res.send({message: 'ok', data: ret});
    }
};
// 增加用户接口-注册
router.post('/register', (req, res) => {
    var sql_name, sql;
    var params = req.body;
    if (params.type == 1) {
        var sql_name = $sql.user.select_name
        var sql = $sql.user.add;
    } else if (params.type == 2) {
        var sql_name = $sql.manage.select_name
        var sql = $sql.manage.add;
    } else if (params.type == 3) {
        var sql_name = $sql.healthCare.select_name
        var sql = $sql.healthCare.add;
    } else if (params == 4) {
        var sql_name = $sql.community.select_name
        var sql = $sql.community.add;
    }
    conn.query(sql_name,params.username,function(err, result) {
        if(err) {
            console.log(err)
        }
        if(result[0] === undefined) {
            conn.query(sql,[params.username,params.password,params.type], function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].username == params.username) {
                            var ret = result[i];
                            break;
                        }
                    }
                    jsonWrite(res, ret)
                }
            })
        }else {
            res.send('-1')    //当前注册username与数据库重复时，data返回-1
        }
    })
    
});

//查找用户接口
router.post('/login', (req,res) => {
    var sql_name = $sql.user.select_name;
    var sql_password = $sql.user.select_password;
    var params = req.body;
    if (params.type == 1) {
        conn.query(sql_name,params.username,function(err, result) {
            if(err) {
                console.log(err)
            }
            if(result[0] === undefined) {
                res.send('-1')    //查询不出username，data返回-1
            }else {
                conn.query(sql_password,params.password, function(err, result) {
                    if(err) {
                        console.log(err)
                    }
                    if(result[0]===undefined) {
                        res.send('0')    //username正确后，password错误，data返回 0
                    }else {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].username == params.username) {
                                var ret = result[i];
                                break;
                            }
                        }
                        jsonWrite(res, ret);
                    }
                })
            }
        })
    } else {
        res.send('-1');
    }
});

//科研人员登录
router.post('/manageLogin', (req,res) => {
    var sql_name = $sql.manage.select_name;
    var sql_password = $sql.manage.select_password;
    var params = req.body;
    if (params.type == 2) {
        conn.query(sql_name,params.username,function(err, result) {
            if(err) {
                console.log(err)
            }
            if(result[0]===undefined) {
                res.send('-1')    //查询不出username，data返回-1
            }else {
                conn.query(sql_password,params.password, function(err, result) {
                    if(err) {
                        console.log(err)
                    }
                    if(result[0]===undefined) {
                        res.send('0')    //username正确后，password错误，data返回 0
                    }else {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].username == params.username) {
                                var ret = result[i];
                                break;
                            }
                        }
                        jsonWrite(res, ret);
                    }
                })
            }
        })
    } else {
        res.send('-1');
    }
});

//医护人员登录
router.post('/healthCareLogin', (req,res) => {
    var sql_name = $sql.healthCare.select_name;
    var sql_password = $sql.healthCare.select_password;
    var params = req.body;
    if (params.type == 3) {
        conn.query(sql_name,params.username,function(err, result) {
            if(err) {
                console.log(err)
            }
            if(result[0]===undefined) {
                res.send('-1')    //查询不出username，data返回-1
            }else {
                conn.query(sql_password,params.password, function(err, result) {
                    if(err) {
                        console.log(err)
                    }
                    if(result[0]===undefined) {
                        res.send('0')    //username正确后，password错误，data返回 0
                    }else {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].username == params.username) {
                                var ret = result[i];
                                break;
                            }
                        }
                        jsonWrite(res, ret);
                    }
                })
            }
        })
    } else {
        res.send('-1');
    }
    
});

//社区卫生中心人员登录
router.post('/communityLogin', (req,res) => {
    var sql_name = $sql.community.select_name;
    var sql_password = $sql.community.select_password;
    var params = req.body;
    if (params.type == 4) {
        conn.query(sql_name,params.username,function(err, result) {
            if(err) {
                console.log(err)
            }
            if(result[0]===undefined) {
                res.send('-1')    //查询不出username，data返回-1
            }else {
                conn.query(sql_password,params.password, function(err, result) {
                    if(err) {
                        console.log(err)
                    }
                    if(result[0]===undefined) {
                        res.send('0')    //username正确后，password错误，data返回 0
                    }else {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].username == params.username) {
                                var ret = result[i];
                                break;
                            }
                        }
                        jsonWrite(res, ret);
                    }
                })
            }
        })
    } else {
        res.send('-1');
    }
    
});

//录入个人的基本信息
router.post('/baseInformation', (req,res) => {
    var sql = $sql.baseInformation.add;
    var sql_id = $sql.baseInformation.select_id;
    var params = req.body;
    conn.query(sql_id, params.id, function(err, result) {
        if(err) {
            console.log(err)
        }
        if(result[0] === undefined) {
            var arr = [params.id, params.name, params.sex, params.age, params.telp, params.education, params.community, params.type, params.isMotion, params.isSmoke, params.isDrink, params.isMemoryDown, params.ill, params.desc]
            conn.query(sql, arr, function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result) {
                    console.log(result);
                    jsonWrite(res, result)
                }
            })
        }else {
            res.send('-1')    //当前注册username与数据库重复时，data返回-1
        }
    })
});

//获取考试信息
router.post('/getMessage', (req, res) => {
    var sql_id = $sql.baseInformation.select_id;
    var params = req.body;
    conn.query(sql_id, params.id, function(err, result) {
        if(err) {
            console.log(err)
            res.send('-1');
        }else {

            jsonWrite(res, result)
        }
    })
});

//获取考试分数信息
router.post('/getCodeMessage', (req, res) => {
    var sql = $sql.submitExam.select_mess;
    var params = req.body;
    conn.query(sql, params, function(err, result) {
        if(err) {
            console.log(err)
            res.send('-1');
        }else {
            // console.log(result);
            jsonWrite(res, result)
        }
    })
});

//获取题库信息
router.post('/questionMessage', (req, res) => {
    var sql = $sql.question.select_question;
    var params = req.body;
    conn.query(sql, params, function(err, result) {
        if(err) {
            console.log(err)
            res.send('-1');
        }else {
            // console.log(result);
            jsonWrite(res, result)
        }
    })
});

//获取用户测试信息
router.post('/getAnalysisMessage', (req, res) => {
    var sql = $sql.personalAnalysis.select_mess;
    var params = req.body;
    conn.query(sql, params, function(err, result) {
        if(err) {
            console.log(err)
            res.send('-1');
        }else {
            // console.log(result);
            jsonWrite(res, result)
        }
    })
});

// 提交个人分析
router.post('/getAnalysisMessage', (req, res) => {
    var sql = $sql.personalAnalysis.add;
    var params = req.body;
    var arr = [params.id, params.name, params.testNum, params.aveIndex, params.wholeTime, params.inclination]
    conn.query(sql, arr, function(err, result) {
        if(err) {
            console.log(err)
            res.send('-1');
        }else {
            jsonWrite(res, result)
        }
    })
});

// 提交考试分数信息
router.post('/submitExam', (req, res) => {
    var sql = $sql.submitExam.add;
    var params = req.body;
    var arr = [params.testName, params.testCode, params.fullMark, params.useTime, params.name]
    conn.query(sql, arr, function(err, result) {
        if(err) {
            console.log(err)
            res.send('-1');
        }else {
            jsonWrite(res, result)
        }
    })
});

// 获取试卷内容
// router.get('/getExamInfo', (req,res) => {
//     let userName = req.session.userName;
//     let id = req.param('id');
//     Student.findOne({"userName":userName},(err,doc)=>{
//       if(err) {
//         res.json({
//           status: '1',
//           msg: err.message
//         })
//         } else {
//           if(doc) {
//             Paper.findOne({'_id':id}).populate({path:'_questions'}).exec((err1,doc1) => {
//               if (err1) {
//                   res.json({
//                       status:'1',
//                       msg: err.message
//                   })
//                 } else {
//                   if (doc1) {
//                       res.json({
//                           status: '0',
//                           msg:'success',
//                           result:doc1
//                       })
//                     } else {
//                       res.json({
//                           status: '2',
//                           msg:'没有该试卷'
//                       })
//                     }
//                 }
//               })
//             }
//         }
//     })
//   }



module.exports = router;