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
}
module.exports = sqlMap;