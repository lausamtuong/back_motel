const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST ,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ,
  database: process.env.DATABASE 
});

let db={}

db.loginUser = (username,password) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM user JOIN Room ON user.UserID = Room.UserID WHERE Username = ? AND Password = ?",[username,password], (err, res) => {
      if(err) return reject(err);
      return resolve(res[0]);
    })
  })
}

db.allRooms = () => {
  return new Promise((resolve, reject) => {
    //pool.query("SELECT RoomID, RoomName, FullName, Phone, RoomType FROM Room r INNER JOIN User u ON r.UserID = u.UserID", (err, res) => {
    pool.query("SELECT RoomID, RoomName FROM Room", (err, res) => {
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
