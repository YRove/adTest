var sqlMap = {
    user: {
        add: 'insert into ad_user(username, password) values ( ?, ?)',
        select_name: 'SELECT * from ad_user where username = ?',    //查询 username
        select_password: 'SELECT * from ad_user where password = ?'      //查询 password
    },
}
module.exports = sqlMap;