const { User } = require('../database/Models/userModel');
// Constants
const DAILY_LIMIT = 150;
const USER_LIMIT = 2; 
let dailyLimitCount = 0;

const  getUser = async (contact) => {
    let user = await User.findOne({contact}).exec();
    if (!user) return {
        status: false
    }
    return {
        status: true,
        user
    }
}
const  addUsageForUser = async (contact,usage) => {
    let user = await User.findOneAndUpdate({contact},{
        usage
    },{
        new: true
      })
    if (!user) return false
    return true
}
const  createNewUser = async (user) => {
    let newUser = new User(user);
    await newUser.save();
    console.log(newUser)
    return newUser
}



module.exports = {
    DAILY_LIMIT,
    USER_LIMIT,
    dailyLimitCount,
    getUser,
    addUsageForUser,
    createNewUser
}