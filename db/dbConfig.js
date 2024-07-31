module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "User_authentication_node",
    dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}