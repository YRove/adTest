var sqlMap = {
    user: {
        add: 'insert into ad_user(username, password) values ( ?, ?)',
        select_name: 'SELECT * from ad_user where username = ?',    //查询 username
        select_password: 'SELECT * from ad_user where password = ?',      //查询 password
        select_type: 'SELECT * from ad_user where type = ?'      //查询 type
    },
    manage: {
        add: 'insert into scientist_user(username, password) values ( ?, ?)',
        select_name: 'SELECT * from scientist_user where username = ?',    //查询 username
        select_password: 'SELECT * from scientist_user where password = ?'      //查询 password
    },
    healthCare: {
        add: 'insert into healthCare_user(username, password) values ( ?, ?)',
        select_name: 'SELECT * from healthCare_user where username = ?',    //查询 username
        select_password: 'SELECT * from healthCare_user where password = ?'      //查询 password
    },
    community: {
        add: 'insert into community_user(username, password) values ( ?, ?)',
        select_name: 'SELECT * from community_user where username = ?',    //查询 username
        select_password: 'SELECT * from community_user where password = ?'      //查询 password
    },
    baseInformation: {
        add: 'insert into baseInformation(id, name, sex, age, telp, education, community, type, isMotion, isSmoke, isDrink, isMemoryDown, ill) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        select_id: 'SELECT * from baseInformation where id = ?',    //查询 id
        select_name: 'SELECT * from baseInformation where name = ?'      //查询 name
    },
    submitExam: {
        add: 'insert into examMessage(testName, testCode, fullMark, useTime, name) values (?, ?, ?, ?, ?)',
        select_mess: 'SELECT * from examMessage',    //查询 message
        select_name: 'SELECT * from examMessage where testName = ?'      //查询 name
    },
    question: {
        select_question: 'SELECT * from question',
    },
    personalAnalysis: {
        add: 'insert into personalAnalysis(id, name, testNum, aveIndex, wholeTime, inclination) values (?, ?, ?, ?, ?, ?)',
        select_id: 'SELECT * from personalAnalysis where id = ?',    //查询 id
        select_name: 'SELECT * from personalAnalysis where testName = ?',      //查询 name
        select_mess: 'SELECT * from personalAnalysis',    //查询 message
    },
}
module.exports = sqlMap;