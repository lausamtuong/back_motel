const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  user: "root",
  host: "containers-us-west-207.railway.app",
  password: "QpM2kjzDJrGR03esoFt0",
  database: "railway",
  port : "7552",
  debug: true
});

let db={}

db.loginUser = (username,password) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM User JOIN Room ON User.UserID = Room.UserID WHERE Username = ? AND Password = ?",[username,password], (err, res) => {
      if(err) return reject(err);
      return resolve(res[0]);
    })
  })
}

db.allRooms = () => {
  console.log({
    connectionLimit: 10,
    host: process.env.DB_HOST ,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD ,
    database: process.env.DATABASE ,
    port: process.env.DB_PORT ,
    debug: true
  })
  return new Promise((resolve, reject) => {
    pool.query("SELECT RoomID, RoomName, FullName, Phone, RoomType FROM Room r INNER JOIN User u ON r.UserID = u.UserID", (err, res) => {
   // pool.query("SELECT RoomID, RoomName FROM Room", (err, res) => {
      if(err) return reject(err);
      return resolve(res);
    })
  })
}

db.getRoomByID = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT re.ElectricReading, re.WaterReading, re.ReadingDate, r.roomName, r.roomType, u.Email, u.UserName, u.Phone FROM reading re JOIN room r ON r.RoomID = re.RoomID JOIN user u ON u.UserID = r.UserID WHERE r.RoomID = ?`,[id],(err,res) => {
      if(err) return reject(err);
      return resolve(res)
    })
  })
}

module.exports = db;
