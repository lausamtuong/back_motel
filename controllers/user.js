const db = require('../db')


module.exports = {
    login:  async (req, res) => {
        try {
            const { username, password } = req.body;
            console.log(req.body)
            console.log(username)
            console.log(password)
            const user = await db.loginUser(username, password)
            if(user){
                console.log(user)
                res.status(200).json(user)
            }
        } catch (err) {
            console.log(err);
            res.status(400).json("Bad Request Error");
        }
    },

    allRoom: async (req, res) => {
        try{        
            const roomData = await db.allRooms()
            if(roomData){
                res.status(200).json(roomData)
            }
        }catch (err) {
            res.status(400).json("Bad Request Error");
        }
    },

    getRoomByID: async (req, res) => {
        try{
            const room = await db.getRoomByID(req.params.id)
            if (room){
                console.log(room)
                res.status(200).json(room)
            }
        }catch(error) {
            res.status(400).json("Bad Request Error")
        }
    }
};