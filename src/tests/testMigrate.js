const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');

const main = async() => {
    try{
        await sequelize.sync({ force: true });

        await User.create({
            firstName: "testuser",
            lastName: "testuser",
            email: "testuser@gmail.com",
            password: "testuser1234",
            phone: "1234567890"
        })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();