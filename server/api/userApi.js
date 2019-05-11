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
        //res.json(ret);
        res.send('ok')
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
                    jsonWrite(res, result)
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
                        jsonWrite(res, result);
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
                        jsonWrite(res, result);
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
                        jsonWrite(res, result);
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
                        jsonWrite(res, result);
                    }
                })
            }
        })
    } else {
        res.send('-1');
    }
    
});

module.exports = router;