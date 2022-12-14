
//const { errorMonitor } = require("mysql2/typings/mysql/lib/Connection");
const con=require("./db_connect");                // we need this file because we need connection

async function createTable(){
    let sql=`CREATE TABLE if not exists users(
        userID INT NOT NULL AUTO_INCREMENT,
        userName VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        CONSTRAINT userPK PRIMARY KEY(userID)
        );`
    await con.query(sql);                            // we need await when used async
}

createTable();

// grabbing all users in database
async function getAllUsers() {
    const sql = `SELECT * FROM users;`;
    let users = await con.query(sql);
    console.log(users)
  }

async function register(user){

    let cUser=await getUser(user);


    const sql=`INSERT INTO users(userName,password) VALUES ("${user.userName}","${user.password}");`

    await con.query(sql);

    return await login(user);
}

async function login(user){                
    let cUser=await getUser(user);

    if(!cUser[0]) throw Error("Username not found");
    if(cUser[0].password !== user.password) throw Error("password doesn't match");

    return cUser[0];
}

async function editUser(user){
    let sql=`update users SET userName="${user.userName}" where userID=${user.userID}`;

    await con.query(sql);
    let updatedUser=await getUser(user);

    return updatedUser[0];


}

async function deleteUser(user){
    let sql=`Delete from users where userID=${user.userID}`;

    await con.query(sql);
}

async function getUser(user){
    let sql;

    if(user.userID){
        sql=`select * from users where userID=${user.userID}`;

    }
    else{
        sql=`select * from users where userName="${user.userName}"`;
    }

    return await con.query(sql);
}



module.exports={getAllUsers,login,register,editUser,deleteUser,};