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
}
module.exports = sqlMap;